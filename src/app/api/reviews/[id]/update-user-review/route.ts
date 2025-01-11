import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../../lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	score: z.coerce.number(),
	review_title: z.string(),
	review_text: z.string(),
	anonymous: z.optional(z.coerce.boolean()),
});

export async function PUT(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PUT') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { id } = await params;
	const reviewId = z.string().uuid().parse(id);

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

	const { score, review_title, review_text, anonymous } = dataParse.data;

	try {
		const productsToReview = await prisma.productReview.findUnique({
			where: {
				id: reviewId,
			},
		});

		if (!productsToReview) {
			return NextResponse.json({ message: `Recurso não encontrado.` }, { status: 404 });
		}

		await prisma.productReview.update({
			data: {
				score,
				reviewTitle: review_title,
				reviewText: review_text,
				anonymous,
			},
			where: {
				id: reviewId,
			},
		});

		return Response.json(
			{
				message: 'Review atualizado com sucesso',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('update review route error: ', error);
		return NextResponse.json({ message: 'Erro ao tentar atualizar review.' }, { status: 400 });
	}
}
