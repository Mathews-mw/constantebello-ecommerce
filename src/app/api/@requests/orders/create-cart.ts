import { api } from '@/lib/axios';
import { Cart } from '@prisma/client';

interface IRequest {
	userId: string;
	deliveryIn: string;
	discount?: number;
	couponId?: string;
}

export interface IResponse {
	message: string;
	cart: Cart;
}

export async function createCart({ userId, deliveryIn, discount, couponId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>('/orders/carts/create', {
		user_id: userId,
		delivery_in: deliveryIn,
		discount,
		coupon_id: couponId,
	});

	return response;
}
