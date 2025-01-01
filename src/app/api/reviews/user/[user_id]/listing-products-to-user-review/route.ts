import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		user_id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	const { user_id } = await params;
	const userId = z.string().uuid().parse(user_id);

	try {
		const productsToReview = await prisma.orderItem.findMany({
			where: {
				order: {
					userId,
				},
			},
			include: {
				product: true,
				order: {
					select: {
						createdAt: true,
					},
				},
				productReview: true,
			},
		});

		const response = productsToReview.map((item) => {
			const { order, ...rest } = item;

			return {
				...rest,
				purchaseAt: order.createdAt,
			};
		});

		return Response.json(response);
	} catch (error) {
		console.log('get products to user review route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
