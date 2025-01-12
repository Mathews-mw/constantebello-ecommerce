import { api } from '@/lib/axios';
import { Order } from '@prisma/client';
import { SaveOrderRequestBodySchema } from '../../orders/save/route';

export interface IResponse {
	message: string;
	order: Order;
}

export async function saveOrder(data: SaveOrderRequestBodySchema): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>('/orders/save', data);

	return response;
}
