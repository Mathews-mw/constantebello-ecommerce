import { api } from '../../../../../lib/axios';
import { Product } from '@prisma/client';

interface IRequest {
	id: string;
}

export async function listingUserFavoriteProductsDetails({ id }: IRequest): Promise<Product[]> {
	const { data } = await api.get(`/users/${id}/favorite-products-details`);

	return data;
}
