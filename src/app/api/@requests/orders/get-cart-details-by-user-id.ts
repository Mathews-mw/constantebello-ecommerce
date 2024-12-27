import { api } from '@/lib/axios';
import { ICartDetails } from '@/@types/order';

interface IRequest {
	userId: string;
}

export async function getCartDetailsByUserId({ userId }: IRequest): Promise<ICartDetails> {
	const { data } = await api.get(`/orders/carts/get-by-user-id/${userId}/details`);

	return data;
}
