import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		user_id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	const { user_id } = await params;
	const userId = z.string().uuid().parse(user_id);

	try {
		const orders = await prisma.order.findMany({
			where: {
				userId,
			},
			include: {
				orderItems: {
					include: {
						product: true,
					},
				},
			},
		});

		const response = orders.map((order) => {
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
				case 'CANCELED':
					statusText = 'Pedido cancelado';
					break;
				case 'CHARGE_CANCELED':
					statusText = 'Cobrança cancelada';
					break;
				case 'PAYMENT_DECLINED':
					statusText = 'Pagamento recusado';
					break;
				case 'PAYMENT_IN_ANALYSIS':
					statusText = 'Pagamento em análise';
					break;
			}

			let paymentTypeText = '';

			switch (order?.paymentType) {
				case 'A_DEFINIR':
					paymentTypeText = 'A definir';
					break;
				case 'PIX':
					paymentTypeText = 'Pix';
					break;
				case 'BOLETO':
					paymentTypeText = 'Boleto bancário';
					break;
				case 'CARTAO_CREDITO':
					paymentTypeText = 'Cartão de crédito';
					break;
				case 'DEBITO':
					paymentTypeText = 'Cartão de débito';
					break;
				default:
					paymentTypeText = 'A definir';
			}

			return { ...order, statusText, paymentTypeText };
		});

		return Response.json(response);
	} catch (error) {
		console.log('get user route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
