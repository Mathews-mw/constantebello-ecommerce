import { z } from 'zod';
import { NextApiResponse } from 'next';
import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	delivery_in: z.string(),
	discount: z.coerce.number().optional().default(0),
	coupon_id: z.optional(z.string()),
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

	const { user_id, delivery_in, discount, coupon_id } = dataParse.data;

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
				preOrderId: randomUUID(),
				deliveryIn: delivery_in,
				discount,
				couponId: coupon_id,
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
