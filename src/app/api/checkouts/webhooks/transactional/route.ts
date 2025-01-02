import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { createNotification } from '@/app/api/@worker/notifications/create-notification';

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

		const order = await prisma.order.update({
			data: {
				status: orderStatus,
				paymentInstitutionOrderId: data.id,
			},
			where: {
				id: data.reference_id,
			},
		});

		await prisma.cart.deleteMany();

		if (order.status === 'PAYMENT_CONFIRMED') {
			await createNotification({
				title: 'Pagamento confirmado',
				subtitle: 'O pagamento do seu pedido foi confirmado.',
				content:
					'Olá, informamos que o seu pedido teve o pagamento aprovado. Agora o restante é com a gente, pode ficar tranquilo. Iremos processar o seu pedido e fazer a entrega o mais breve possível. Fique de olho na sua caixa de e-mail e/ou telefone pois iremos manter contato para atualizar você do seu pedido. Obrigado!',
				userId: order.userId,
				tag: 'GENERAL',
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
