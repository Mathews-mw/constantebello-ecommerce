import qs from 'qs';
import { Product } from '@prisma/client';

import { api } from '@/lib/axios';

interface IRequest {
	productIds: Array<string>;
}

export async function listingProductsToSetupCheckout({ productIds }: IRequest): Promise<Product[]> {
	const { data: response } = await api.get('/products/listing-to-setup-checkout', {
		params: {
			productIds,
		},
		paramsSerializer: (params) => {
			return qs.stringify(params, { arrayFormat: 'brackets' });
		},
	});

	return response;
}
