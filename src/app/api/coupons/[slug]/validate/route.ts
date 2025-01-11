import { z } from 'zod';
import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

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

	console.log('couponSlug: ', couponSlug);

	try {
		const coupon = await prisma.coupon.findUnique({
			where: {
				slug: couponSlug,
			},
		});

		if (!coupon) {
			return Response.json({ message: 'Cupom não encontrado!' }, { status: 404 });
		}

		if (coupon.expiresIn) {
			const couponAlreadyExpired = dayjs(coupon.expiresIn).isBefore(new Date());

			if (couponAlreadyExpired) {
				return Response.json({ is_valid: false, message: 'Esse cupom já expirou!', coupon });
			}
		}

		if (coupon.available === false) {
			return Response.json({ is_valid: false, message: 'Cupom não está mais ativo!', coupon });
		}

		return Response.json({ is_valid: true, message: 'Cupom está ativo!', coupon });
	} catch (error) {
		console.log('get coupon by slug route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
