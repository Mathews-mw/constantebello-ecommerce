import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	try {
		const products = await prisma.product.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			take: 4,
		});

		return Response.json(products);
	} catch (error) {
		console.error('Listing products route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
