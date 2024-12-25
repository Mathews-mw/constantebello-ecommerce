import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	product_id: z.string().uuid(),
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
	const userId = z.string().uuid().parse(id);

	const data = await request.json();

	const dataParse = bodySchema.safeParse(data);

	if (!dataParse.success) {
		return NextResponse.json(
			{
				message: 'Erro ao preencher formulário. Por favor, verifique os dados e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { product_id } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		const product = await prisma.product.findUnique({
			where: {
				id: product_id,
			},
		});

		if (!user || !product) {
			return NextResponse.json({ message: `Recurso não encontrado.` }, { status: 404 });
		}

		await prisma.customerFavoriteProduct.delete({
			where: {
				userId_productId: {
					userId,
					productId: product_id,
				},
			},
		});

		return Response.json({ status: 201 });
	} catch (error) {
		console.log('unmark product as favorite route error: ', error);
		return NextResponse.json({ message: 'Erro ao tentar desmarcar o produto como favorito.' }, { status: 400 });
	}
}
