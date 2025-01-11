import { api } from '@/lib/axios';
import { SaveCartItemsRequestSchema } from '../../orders/carts/[id]/items/save/route';

interface IRequest extends SaveCartItemsRequestSchema {
	cartId: string;
}

export interface IResponse {
	message: string;
}

export async function saveCartItems(data: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>(`/orders/carts/${data.cartId}/items/save`, {
		user_id: data.user_id,
		cart_items: data.cart_items,
	});

	return response;
}
