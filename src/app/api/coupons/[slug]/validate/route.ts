import { z } from 'zod';
import dayjs from 'dayjs';
import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		slug: string;
	};
}

const queryParamsSchema = z.object({
	userId: z.optional(z.string()).nullish(),
});

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
	const { searchParams } = request.nextUrl;

	console.log('userId: ', searchParams.get('userId'));

	const couponSlug = z.string().parse(slug);

	const { userId } = queryParamsSchema.parse({
		userId: searchParams.get('userId'),
	});

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

		if (userId && coupon.singleUse) {
			const isSingleUse = await prisma.userCoupon.findMany({
				where: {
					userId,
					couponId: coupon.id,
				},
			});

			if (isSingleUse.length > 0) {
				return Response.json({ is_valid: false, message: 'Você já usou este cupom!', coupon });
			}
		}

		return Response.json({ is_valid: true, message: 'Cupom está ativo!', coupon });
	} catch (error) {
		console.log('validate coupon route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
