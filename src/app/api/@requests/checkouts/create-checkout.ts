import { api } from '../../../../lib/axios';
import { Checkout, Order, OrderPaymentType } from '@prisma/client';

interface IRequest {
	userId: string;
	cartId: string;
	deliveryIn: string;
	discount?: number;
	delivery_fee?: number;
}

export interface IResponse {
	payment_link: string;
	inactive_link: string;
	self_link: string;
	checkout: Checkout;
}

export async function createCheckout({
	userId,
	cartId,
	deliveryIn,
	discount,
	delivery_fee,
}: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>('/checkouts/create', {
		user_id: userId,
		cart_id: cartId,
		delivery_in: deliveryIn,
		discount,
		delivery_fee,
	});

	return response;
}
