import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { NextApiResponse } from 'next';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	delivery_in: z.string(),
});

export async function PUT(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PUT') {
		return Response.json({ message: 'Método não permitido' }, { status: 405 });
	}

	const { id } = await params;
	const cartId = z.string().uuid().parse(id);

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

	const { delivery_in } = dataParse.data;

	try {
		const cart = await prisma.cart.update({
			data: {
				deliveryIn: delivery_in,
			},
			where: {
				id: cartId,
			},
		});

		return Response.json(
			{
				message: 'Carrinho atualizado com sucesso',
				cart,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('update cart route error: ', error);
		return NextResponse.json({ message: 'Erro durante a atualização do carrinho.' }, { status: 400 });
	}
}
