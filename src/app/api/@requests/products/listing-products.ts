import qs from 'qs';
import { api } from '../../../../lib/axios';
import { Product } from '@prisma/client';

interface IRequest {
	search?: string;
	orderBy?: string;
	minPrice?: string;
	maxPrice?: string;
	departments?: Array<string>;
}

interface IResponse {
	products: Array<Product>;
	amount: number;
}

export async function listingProducts(query: IRequest): Promise<IResponse> {
	const { data: response } = await api.get('/products', {
		params: {
			search: query.search,
			orderBy: query.orderBy,
			minPrice: query.minPrice,
			maxPrice: query.maxPrice,
			departments: query.departments,
		},
		paramsSerializer: (params) => {
			return qs.stringify(params, { arrayFormat: 'brackets' });
		},
	});

	return response;
}
