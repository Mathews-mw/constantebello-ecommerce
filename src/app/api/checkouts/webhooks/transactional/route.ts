import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { createNotification } from '@/app/api/@worker/notifications/create-notification';
import { sendReceiptEmail } from '@/app/utils/mails/send-receipt-email';
import { env } from '@/env';

// Os eventos transacionais ocorrem quando uma alteração do status do pagamento ocorre.

export async function POST(request: NextRequest) {
	const data: ITransactionalNotification = await request.json();

	console.log('pagbank transactional webhook notification: ', data);

	try {
		let orderStatus: OrderStatus;

		switch (data.charges[0].status) {
			case 'CANCELED':
				orderStatus = 'CANCELED';
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

		await prisma.order.update({
			data: {
				status: orderStatus,
				paymentInstitutionOrderId: data.id,
			},
			where: {
				id: data.reference_id,
			},
		});

		await prisma.cart.deleteMany();

		const order = await prisma.order.findUnique({
			include: {
				orderItems: {
					include: {
						product: true,
					},
				},
				userAddress: true,
			},
			where: {
				id: data.reference_id,
			},
		});

		if (order && order.status === 'PAYMENT_CONFIRMED') {
			await createNotification({
				title: 'Pagamento confirmado',
				subtitle: 'O pagamento do seu pedido foi confirmado.',
				content: `Olá, ${data.customer.name}, informamos que o seu pedido teve o pagamento aprovado. Agora o restante é com a gente, pode ficar tranquilo. Iremos processar o seu pedido e fazer a entrega o mais breve possível. Fique de olho na sua caixa de e-mail e/ou telefone pois iremos manter contato para atualizar você do seu pedido. Obrigado!`,
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
					size: '190x170x90',
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

		if (order && order.status === 'PAYMENT_DECLINED') {
			await createNotification({
				title: 'Pagamento Recusado',
				subtitle: 'O pagamento do seu pedido foi recusado.',
				content: `Olá, ${data.customer.name}, informamos que infelizmente o pagamento do seu pedido foi recusado. Por favor, verifique as informações bancárias e tente novamente.`,
				userId: order.userId,
				tag: 'REMINDS',
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
