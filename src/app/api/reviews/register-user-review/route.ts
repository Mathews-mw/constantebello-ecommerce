import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	user_id: z.string(),
	product_id: z.string(),
	order_item_id: z.string(),
	score: z.coerce.number(),
	review_title: z.string(),
	review_text: z.string(),
	anonymous: z.optional(z.coerce.boolean()),
});

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
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

	const { user_id, product_id, order_item_id, score, review_title, review_text, anonymous } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
		});

		const product = await prisma.product.findUnique({
			where: {
				id: product_id,
			},
		});

		const orderItem = await prisma.orderItem.findUnique({
			where: {
				id: order_item_id,
			},
		});

		if (!user || !product || !orderItem) {
			return NextResponse.json({ message: `Recurso não encontrado.` }, { status: 404 });
		}

		await prisma.productReview.create({
			data: {
				userId: user_id,
				productId: product_id,
				orderItemId: order_item_id,
				score,
				reviewTitle: review_title,
				reviewText: review_text,
				anonymous,
			},
		});

		return Response.json(
			{
				message: 'Review registrado com sucesso',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('register user review route error: ', error);
		return NextResponse.json({ message: 'Erro ao tentar registrar review.' }, { status: 400 });
	}
}
