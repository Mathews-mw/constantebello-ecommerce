import { api } from '@/lib/axios';
import { Product } from '@prisma/client';

export async function listingNewArrivalsProducts(): Promise<Product[]> {
	const { data: response } = await api.get('/products/new-arrivals');

	return response;
}
