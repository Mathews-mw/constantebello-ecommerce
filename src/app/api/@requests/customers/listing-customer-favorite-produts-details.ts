import { api } from '@/lib/axios';
import { Product } from '@prisma/client';

interface IRequest {
	id: string;
}

export async function listingCustomerFavoriteProductsDetails({ id }: IRequest): Promise<Product[]> {
	const { data } = await api.get(`/customers/${id}/favorite-products-details`);

	return data;
}
