import { api } from '@/lib/axios';

interface IRequest {
	cartId: string;
}

export interface IResponse {
	message: string;
}

export async function deleteCart({ cartId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.delete<IResponse>(`/orders/carts/${cartId}/delete`);

	return response;
}
