import { api } from '../../../../../lib/axios';

interface IRequest {
	userId: string;
	productId: string;
}

export async function selectProductAsFavorite({ userId, productId }: IRequest): Promise<void> {
	const { data } = await api.patch(`/users/${userId}/select-product-as-favorite`, {
		product_id: productId,
	});

	return data;
}
