import { api } from '@/lib/axios';
import { UserFavoriteProduct } from '@prisma/client';

interface IRequest {
	id: string;
}

export async function listingUserFavoriteProducts({ id }: IRequest): Promise<UserFavoriteProduct[]> {
	const { data } = await api.get(`/users/${id}/favorite-products`);

	return data;
}
