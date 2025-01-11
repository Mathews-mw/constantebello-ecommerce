import { api } from '../../../../lib/axios';
import { IOrderDetails } from '../../../../@types/order';

interface IRequest {
	userId: string;
}

export async function listingOrdersByUserId({ userId }: IRequest): Promise<IOrderDetails[]> {
	const { data } = await api.get(`/orders/listing-by-user-id/${userId}`);

	return data;
}
