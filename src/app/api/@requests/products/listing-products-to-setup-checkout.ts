import qs from 'qs';
import { api } from '@/lib/axios';
import { IProductToSetupCheckout } from '@/@types/product';

interface IRequest {
	productSizesIds: Array<string>;
}

export async function listingProductsToSetupCheckout({
	productSizesIds,
}: IRequest): Promise<IProductToSetupCheckout[]> {
	const { data: response } = await api.get('/products/listing-to-setup-checkout', {
		params: {
			productSizesIds,
		},
		paramsSerializer: (params) => {
			return qs.stringify(params, { arrayFormat: 'brackets' });
		},
	});

	return response;
}
