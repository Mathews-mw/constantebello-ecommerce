import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { NextApiResponse } from 'next';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	delivery_in: z.string(),
});

export async function POST(request: NextRequest, response: NextApiResponse) {
	if (request.method !== 'POST') {
		return response.status(405).json({ message: 'Método não permitido' });
	}

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

	const { user_id, delivery_in } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
		});

		if (!user) {
			return NextResponse.json({ message: `Usuário não encontrado.` }, { status: 404 });
		}

		const cart = await prisma.cart.create({
			data: {
				userId: user_id,
				deliveryIn: delivery_in,
			},
		});

		return Response.json(
			{
				message: 'Carrinho criado com sucesso',
				cart,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create cart route error: ', error);
		return NextResponse.json({ message: 'Erro durante a criação do carrinho.' }, { status: 400 });
	}
}
