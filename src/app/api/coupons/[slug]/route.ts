import { z } from 'zod';
import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		slug: string;
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

	const { slug } = await params;
	const couponSlug = z.string().parse(slug);

	try {
		const coupon = await prisma.coupon.findUnique({
			where: {
				slug: couponSlug,
			},
		});

		return Response.json(coupon);
	} catch (error) {
		console.log('get coupon by slug route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
