import { z } from 'zod';
import { NextRequest } from 'next/server';
import { Prisma, ProductDepartment } from '@prisma/client';

import { prisma } from '@/lib/prisma';

const queryParamsSchema = z.object({
	search: z.string().optional().nullish(),
	orderBy: z
		.optional(z.enum(['relevance', 'lowestPrice', 'highPrice', 'az', 'za']))
		.nullish()
		.default('relevance'),
	minPrice: z.optional(z.coerce.number()),
	maxPrice: z.optional(z.coerce.number()),
	departments: z.optional(z.array(z.nativeEnum(ProductDepartment))).nullish(),
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

	const { search, orderBy, minPrice, maxPrice, departments } = queryParamsSchema.parse({
		search: searchParams.get('search'),
		orderBy: searchParams.get('orderBy'),
		minPrice: searchParams.get('minPrice'),
		maxPrice: searchParams.get('maxPrice'),
		departments: searchParams.getAll('departments[]'),
	});

	console.log('search: ', search);

	try {
		let orderByQuery: Prisma.ProductOrderByWithAggregationInput | undefined = { name: 'desc' };

		switch (orderBy) {
			case 'az':
				orderByQuery = { name: 'asc' };
				break;
			case 'za':
				orderByQuery = { name: 'desc' };
				break;
			case 'lowestPrice':
				orderByQuery = { price: 'asc' };
				break;
			case 'highPrice':
				orderByQuery = { price: 'desc' };
				break;
			case 'relevance':
				orderByQuery = undefined;
				break;
			default:
				orderByQuery = undefined;
		}

		const query: Prisma.ProductFindManyArgs = {
			where: {
				name: search
					? {
							contains: search,
							mode: 'insensitive',
						}
					: undefined,
				price:
					minPrice && maxPrice
						? {
								gte: minPrice,
								lte: maxPrice,
							}
						: undefined,
				department:
					departments && departments.length >= 1
						? {
								in: departments,
							}
						: undefined,
			},
		};

		const [products, amount] = await prisma.$transaction([
			prisma.product.findMany({
				where: query.where,
				orderBy: orderByQuery,
			}),
			prisma.product.count({ where: query.where }),
		]);

		return Response.json({
			products,
			amount,
		});
	} catch (error) {
		console.error('Listing products route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
