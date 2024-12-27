import { api } from '@/lib/axios';
import { Cart } from '@prisma/client';

interface IRequest {
	cartId: string;
	deliveryIn: string;
}

export interface IResponse {
	message: string;
	cart: Cart;
}

export async function editCart({ cartId, deliveryIn }: IRequest): Promise<IResponse> {
	const { data: response } = await api.put<IResponse>(`/orders/carts/${cartId}/edit`, {
		delivery_in: deliveryIn,
	});

	return response;
}
