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
		const orders = await prisma.order.findMany({
			where: {
				userId,
			},
			include: {
				orderItems: true,
			},
		});

		return Response.json(orders);
	} catch (error) {
		console.log('get user route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
