import { api } from '@/lib/axios';
import { Order, OrderPaymentType } from '@prisma/client';

interface IRequest {
	userId: string;
	cartId: string;
	deliveryIn: string;
	paymentType: OrderPaymentType;
}

export interface IResponse {
	message: string;
	order: Order;
}

export async function saveOrder({ userId, cartId, deliveryIn, paymentType }: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>('/orders/save', {
		user_id: userId,
		cart_id: cartId,
		delivery_in: deliveryIn,
		payment_type: paymentType,
	});

	return response;
}
