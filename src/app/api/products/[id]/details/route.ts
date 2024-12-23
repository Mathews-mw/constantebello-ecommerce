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

	z.string().parse(id);

	try {
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				productDetails: true,
			},
		});

		if (!product) {
			return NextResponse.json({ message: `Produto não encontrado` }, { status: 404 });
		}

		return Response.json(product);
	} catch (error) {
		console.log('get product details route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
