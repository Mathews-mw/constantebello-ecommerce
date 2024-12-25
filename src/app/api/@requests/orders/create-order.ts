import { api } from '@/lib/axios';
import { Order } from '@prisma/client';

interface IRequest {
	userId: string;
	cartId: string;
}

export interface IResponse {
	message: string;
	order: Order;
}

export async function createOrder({ userId, cartId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>('/orders/create', {
		user_id: userId,
		cart_id: cartId,
	});

	return response;
}
