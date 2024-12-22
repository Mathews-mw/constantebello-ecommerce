import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	const id = z.string().parse(params.id);

	try {
		const favoriteProducts = await prisma.product.findMany({
			where: {
				customerFavoriteProducts: {
					some: {
						userId: id,
					},
				},
			},
		});

		return Response.json(favoriteProducts);
	} catch (error) {
		console.log('listing customer favorite products error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
