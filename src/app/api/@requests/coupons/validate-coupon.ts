import { api } from '@/lib/axios';
import { Coupon } from '@prisma/client';

interface IRequest {
	slug: string;
}

interface IResponse {
	is_valid: boolean;
	message: string;
	coupon: Coupon;
}

export async function validateCoupon({ slug }: IRequest): Promise<IResponse> {
	const { data } = await api.get(`/coupons/${slug}/validate`);

	return data;
}
