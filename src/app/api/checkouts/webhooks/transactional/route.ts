import { NextRequest } from 'next/server';
import { OrderPaymentType, OrderStatus } from '@prisma/client';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import { sendReceiptEmail } from '@/app/utils/mails/send-receipt-email';
import { createNotification } from '@/app/api/@worker/notifications/create-notification';

// Os eventos transacionais são chamados quando uma alteração do status do pagamento ocorre.

export async function POST(request: NextRequest) {
	const data: ITransactionalNotification = await request.json();

	console.log('pagbank transactional webhook notification: ', data);

	try {
		let orderStatus: OrderStatus;
		let paymentMethod: OrderPaymentType;

		switch (data.charges[0].status) {
			case 'CANCELED':
				orderStatus = 'CHARGE_CANCELED';
				break;
			case 'DECLINED':
				orderStatus = 'PAYMENT_DECLINED';
				break;
			case 'IN_ANALYSIS':
				orderStatus = 'PAYMENT_IN_ANALYSIS';
				break;
			case 'PAID':
				orderStatus = 'PAYMENT_CONFIRMED';
				break;
			case 'WAITING':
				orderStatus = 'AWAITING_PAYMENT';
				break;
			default:
				orderStatus = 'PENDING';
		}

		switch (data.charges[0].payment_method.type) {
			case 'CREDIT_CARD':
				paymentMethod = 'CARTAO_CREDITO';
				break;
			case 'DEBIT_CARD':
				paymentMethod = 'DEBITO';
				break;
			case 'BOLETO':
				paymentMethod = 'BOLETO';
				break;
			case 'PIX':
				paymentMethod = 'PIX';
				break;
			default:
				paymentMethod = 'A_DEFINIR';
		}

		await prisma.order.update({
			data: {
				status: orderStatus,
				paymentType: paymentMethod,
				paymentInstitutionOrderId: data.id,
			},
			where: {
				id: data.reference_id,
			},
		});

		const order = await prisma.order.findUnique({
			include: {
				orderItems: {
					include: {
						product: true,
						productModel: true,
						productSize: true,
					},
				},
				userAddress: true,
			},
			where: {
				id: data.reference_id,
			},
		});

		if (order && order.status === 'PAYMENT_DECLINED') {
			await createNotification({
				title: 'Pagamento Recusado',
				subtitle: 'O pagamento do seu pedido foi recusado.',
				content: `Olá, ${data.customer.name}, informamos que infelizmente o pagamento do seu pedido foi recusado. Por favor, verifique as informações bancárias e tente novamente.`,
				userId: order.userId,
				tag: 'REMINDS',
			});
		}

		if (order && order.status === 'AWAITING_PAYMENT') {
			await createNotification({
				title: 'Pedido Recebido',
				subtitle: 'Aguardando o pagamento.',
				content: `Olá, ${data.customer.name}, informamos que recebemos o seu pedido e estamos aguardando o pagamento. Assim que tudo estiver ok, iremos avisar você. Obrigado(a)!`,
				userId: order.userId,
				tag: 'GENERAL',
			});
		}

		if (order && order.status === 'PAYMENT_IN_ANALYSIS') {
			await createNotification({
				title: 'Pagamento em análise',
				subtitle: 'Aguardando a aprovação do pagamento.',
				content: `Olá, ${data.customer.name}, informamos que o pagamento do seu pedido está em análise. Assim que recebemos uma resposta iremos avisar você. Obrigado(a)!`,
				userId: order.userId,
				tag: 'GENERAL',
			});
		}

		if (order && order.status === 'CHARGE_CANCELED') {
			await createNotification({
				title: 'Cobrança cancelada',
				subtitle: 'A cobrança gerada para o seu pedido foi cancelada.',
				content: `Olá, ${data.customer.name}, informamos que a cobrança de valor ${order.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} do seu pedido foi cancelada e não é mais válida. Por favor, caso queira, tente fazer um novo pedido para concluir sua compra. Obrigado(a)!`,
				userId: order.userId,
				tag: 'REMINDS',
			});
		}

		if (order && order.status === 'PAYMENT_CONFIRMED') {
			await createNotification({
				title: 'Pagamento confirmado',
				subtitle: 'O pagamento do seu pedido foi confirmado.',
				content: `Olá, ${data.customer.name}, informamos que o seu pedido teve o pagamento aprovado. Agora o restante é com a gente, pode ficar tranquilo. Iremos processar o seu pedido e fazer a entrega o mais breve possível. Fique de olho na sua caixa de e-mail e/ou telefone pois iremos manter contato para atualizar você do seu pedido. Obrigado(a)!`,
				userId: order.userId,
				tag: 'GENERAL',
			});

			const addressComplement = order.userAddress.addressComplement ? `, ${order.userAddress.addressComplement}` : '';

			const addressReference = order.userAddress.addressReference ? `, ${order?.userAddress.addressReference}` : '';

			const orderAddress = `${order.userAddress.street}, N ${order.userAddress.number}${addressComplement}${addressReference}, ${order.userAddress.neighborhood}. CEP: ${order.userAddress.cep} | ${order.userAddress.city} - ${order.userAddress.state}`;

			const totalOrder = order.subtotal + order.discount + order.deliveryFee;

			const orderProducts = order.orderItems.map((item) => {
				return {
					id: item.productId,
					img: item.product.imageUrl,
					name: item.product.name,
					color: item.productModel.color,
					size: `${item.productSize.width} X ${item.productSize.height} X ${item.productSize.length}`,
					quantity: item.quantity,
					price: item.priceAtPurchase,
				};
			});

			await sendReceiptEmail({
				to: data.customer.email,
				name: data.customer.name,
				orderId: order.id,
				orderLink: `${env.NEXT_PUBLIC_APP_BASE_URL}/conta/meus-pedidos/${order.id}`,
				address: orderAddress,
				total: totalOrder,
				subtotal: order.subtotal,
				discount: order.discount,
				deliveryFee: order.deliveryFee,
				products: orderProducts,
			});
		}

		if (order) {
			await prisma.cart.deleteMany({
				where: {
					userId: order.userId,
				},
			});
		}

		return Response.json(
			{
				message: 'Operação concluída com sucesso.',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('order notification route error: ', error);
		return new Response('Ops! Parece que algo deu errado.', {
			status: 400,
		});
	}
}
