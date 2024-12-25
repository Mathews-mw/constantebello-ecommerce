import { api } from '@/lib/axios';
import { Cart } from '@prisma/client';

interface IRequest {
	userId: string;
}

export interface IResponse {
	message: string;
	cart: Cart;
}

export async function createCart({ userId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>('/orders/carts/create', {
		user_id: userId,
	});

	return response;
}
