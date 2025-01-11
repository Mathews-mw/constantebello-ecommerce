import { api } from '../../../../lib/axios';
import { Cart } from '@prisma/client';

interface IRequest {
	userId: string;
}

export async function getCartByUserId({ userId }: IRequest): Promise<Cart> {
	const { data } = await api.get(`/orders/carts/get-by-user-id/${userId}`);

	return data;
}
