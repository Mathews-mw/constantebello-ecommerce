import { api } from '@/lib/axios';
import { CustomerFavoriteProduct } from '@prisma/client';

interface IRequest {
	id: string;
}

export async function listingUserFavoriteProducts({ id }: IRequest): Promise<CustomerFavoriteProduct[]> {
	const { data } = await api.get(`/users/${id}/favorite-products`);

	return data;
}
