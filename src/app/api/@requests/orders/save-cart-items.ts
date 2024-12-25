import { api } from '@/lib/axios';

interface IRequest {
	userId: string;
	cartId: string;
	cartItems: Array<{
		productId: string;
		price: number;
		quantity: number;
	}>;
}

export interface IResponse {
	message: string;
}

export async function saveCartItems({ userId, cartId, cartItems }: IRequest): Promise<IResponse> {
	console.log('on @requests: ', userId);
	console.log('on @requests: ', cartId);
	console.log('on @requests: ', cartItems);
	const { data: response } = await api.post<IResponse>(`/orders/carts/${cartId}/items/save`, {
		user_id: userId,
		cart_items: cartItems.map((item) => {
			return {
				product_id: item.productId,
				price: item.price,
				quantity: item.quantity,
			};
		}),
	});

	return response;
}
