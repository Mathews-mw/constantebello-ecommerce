import { ICustomer } from '@/@types/user';
import { api } from '@/lib/axios';
import { User } from '@prisma/client';

interface IRequest {
	id: string;
}

export async function getCustomerById({ id }: IRequest): Promise<ICustomer> {
	const { data } = await api.get(`/customers/${id}`);

	return data;
}
