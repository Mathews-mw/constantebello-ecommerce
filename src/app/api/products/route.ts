import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const queryParamsSchema = z.object({
	take: z.optional(z.coerce.number()),
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

	const { take } = queryParamsSchema.parse({
		take: searchParams.get('take'),
	});

	try {
		const products = await prisma.product.findMany();

		return Response.json(products);
	} catch (error) {
		console.error('Listing products route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
