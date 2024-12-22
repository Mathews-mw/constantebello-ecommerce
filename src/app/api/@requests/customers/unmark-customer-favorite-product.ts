import { api } from '@/lib/axios';
import { ICustomer } from '@/@types/user';

interface IRequest {
	userId: string;
	productId: string;
}

export async function unmarkProductAsFavorite({ userId, productId }: IRequest): Promise<void> {
	const { data } = await api.patch(`/customers/${userId}/unmark-product-as-favorite`, {
		product_id: productId,
	});

	return data;
}
