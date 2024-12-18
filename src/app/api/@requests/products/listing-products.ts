import { api } from '@/lib/axios';
import { Product } from '@prisma/client';

interface IRequest {
	cursor?: string;
	skip?: number;
}

export async function listingProducts(): Promise<Product[]> {
	const { data: response } = await api.get('/products');

	return response;
}
