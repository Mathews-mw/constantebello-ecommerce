import { api } from '@/lib/axios';
import { Coupon } from '@prisma/client';

interface IRequest {
	slug: string;
	userId?: string;
}

interface IResponse {
	is_valid: boolean;
	message: string;
	coupon: Coupon;
}

export async function validateCoupon({ slug, userId }: IRequest): Promise<IResponse> {
	const { data } = await api.get(`/coupons/${slug}/validate`, {
		params: {
			userId,
		},
	});

	return data;
}
