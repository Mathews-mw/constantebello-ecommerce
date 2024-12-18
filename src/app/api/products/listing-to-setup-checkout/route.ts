import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const queryParamsSchema = z.object({
	productIds: z.array(z.string()),
});

export async function GET(request: NextRequest) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { searchParams } = request.nextUrl;

	const { productIds } = queryParamsSchema.parse({
		productIds: searchParams.getAll('productIds[]'),
	});

	try {
		const products = await prisma.product.findMany({
			where: {
				id: {
					in: productIds,
				},
			},
		});

		return Response.json(products);
	} catch (error) {
		console.error('Listing products route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
