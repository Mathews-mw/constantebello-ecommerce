import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const queryParamsSchema = z.object({
	productSizesIds: z.array(z.string()),
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

	const { productSizesIds } = queryParamsSchema.parse({
		productSizesIds: searchParams.getAll('productSizesIds[]'),
	});

	console.log('productSizesIds: ', productSizesIds);

	try {
		const products = await prisma.productSize.findMany({
			where: {
				id: {
					in: productSizesIds,
				},
			},
			include: {
				product: true,
				productModel: {
					include: {
						productImages: {
							where: {
								mainImage: true,
							},
						},
					},
				},
			},
		});

		const response = products.map((item) => {
			const { product, productModel, ...size } = item;

			return {
				...product,
				model: productModel,
				size,
				mainImageUrl: item.productModel.productImages[0].imageUrl,
			};
		});

		return Response.json(response);
	} catch (error) {
		console.error('Listing products to setup checkout route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
