import { api } from '@/lib/axios';
import { ICustomer } from '@/@types/user';

interface IRequest {
	userId: string;
	productId: string;
}

export async function markProductAsFavorite({ userId, productId }: IRequest): Promise<void> {
	const { data } = await api.patch(`/customers/${userId}/mark-product-as-favorite`, {
		product_id: productId,
	});

	return data;
}
