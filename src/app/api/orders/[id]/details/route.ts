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
						productModel: {
							include: {
								productImages: true,
							},
						},
						productSize: true,
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

		const response = { ...order, statusText, paymentTypeText };

		return Response.json(response);
	} catch (error) {
		console.log('get order by id route error: ', error);
		return NextResponse.json({ message: `Erro ao tentar buscar pela ordem ${orderId}` }, { status: 400 });
	}
}
