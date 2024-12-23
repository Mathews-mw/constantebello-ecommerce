import { api } from '@/lib/axios';
import { IProductDetails } from '@/@types/product';

interface IRequest {
	id: string;
}

export async function getProductDetails({ id }: IRequest): Promise<IProductDetails> {
	const { data } = await api.get(`/products/${id}/details`);

	return data;
}
