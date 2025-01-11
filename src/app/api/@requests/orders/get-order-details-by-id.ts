import { api } from '@/lib/axios';
import { IOrderDetails } from '@/@types/order';

interface IRequest {
	orderId: string;
}

export async function getOrderDetailsById({ orderId }: IRequest): Promise<IOrderDetails> {
	const { data: response } = await api.get(`/orders/${orderId}/details`);

	return response;
}
