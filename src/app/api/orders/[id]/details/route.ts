import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { id } = await params;
	const orderId = z.string().uuid().parse(id);

	try {
		const order = await prisma.order.findUnique({
			where: {
				id: orderId,
			},
			include: {
				orderItems: {
					include: {
						product: true,
					},
				},
				user: {
					include: {
						userInfos: true,
					},
				},
				userAddress: true,
			},
		});

		let statusText = '';

		switch (order?.status) {
			case 'COMPLETED':
				statusText = 'Pedido concluído';
				break;
			case 'PENDING':
				statusText = 'Pedido pendente';
				break;
			case 'AWAITING_PAYMENT':
				statusText = 'Aguardando pagamento';
				break;
			case 'PAYMENT_CONFIRMED':
				statusText = 'Pagamento confirmado';
				break;
			case 'CANCELLED':
				statusText = 'Pedido cancelado';
				break;
		}

		let paymentTypeText = '';

		switch (order?.paymentType) {
			case 'PIX':
				paymentTypeText = 'Pix';
				break;
			case 'BOLETO':
				paymentTypeText = 'Boleto bancário';
				break;
			case 'CARTAO_CREDITO':
				paymentTypeText = 'Cartão de crédito';
				break;
		}

		const response = { ...order, statusText, paymentTypeText };

		return Response.json(response);
	} catch (error) {
		console.log('get order by id route error: ', error);
		return NextResponse.json({ message: `Erro ao tentar buscar pela ordem ${orderId}` }, { status: 400 });
	}
}
