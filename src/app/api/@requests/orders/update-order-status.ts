import { api } from '@/lib/axios';
import { Order, OrderStatus } from '@prisma/client';

interface IRequest {
	orderId: string;
	orderStatus: OrderStatus;
}

export interface IResponse {
	message: string;
	order: Order;
}

export async function updateOrderStatus({ orderId, orderStatus }: IRequest): Promise<IResponse> {
	const { data: response } = await api.patch<IResponse>(`/orders/${orderId}/update-status`, {
		status: orderStatus,
	});

	return response;
}
