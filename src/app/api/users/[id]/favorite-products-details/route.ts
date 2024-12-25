import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	const { id } = await params;
	const userId = z.string().uuid().parse(id);

	try {
		const favoriteProducts = await prisma.product.findMany({
			where: {
				userFavoriteProducts: {
					some: {
						userId,
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
