import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { updateCartItemsHandler } from '@/app/api/@handlers/update-cart-items-handler';
import { OrderStatus } from '@prisma/client';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	status: z.nativeEnum(OrderStatus),
});

export async function PATCH(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PATCH') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { id } = await params;
	const orderId = z.string().uuid().parse(id);

	const data = await request.json();

	const dataParse = bodySchema.safeParse(data);

	if (!dataParse.success) {
		return NextResponse.json(
			{
				message: 'Erro na validação de dados. Por favor, verifique-os e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { status } = dataParse.data;

	try {
		await prisma.order.update({
			data: {
				status,
			},
			where: {
				id: orderId,
			},
		});

		return Response.json(
			{
				message: `Status da ordem atualizado para ${status} com sucesso`,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('update order status route error: ', error);
		return NextResponse.json({ message: `Erro ao tentar atualizar o status da ordem ${orderId}` }, { status: 400 });
	}
}
