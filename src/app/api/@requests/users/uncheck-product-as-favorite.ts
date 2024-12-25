import { api } from '@/lib/axios';

interface IRequest {
	userId: string;
	productId: string;
}

export async function uncheckProductAsFavorite({ userId, productId }: IRequest): Promise<void> {
	const { data } = await api.patch(`/user/${userId}/uncheck-product-as-favorite`, {
		product_id: productId,
	});

	return data;
}
