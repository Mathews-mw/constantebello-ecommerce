import { api } from '@/lib/axios';
import { CustomerFavoriteProduct } from '@prisma/client';

interface IRequest {
	id: string;
}

export async function listingCustomerFavoriteProducts({ id }: IRequest): Promise<CustomerFavoriteProduct[]> {
	const { data } = await api.get(`/customers/${id}/favorite-products`);

	return data;
}
