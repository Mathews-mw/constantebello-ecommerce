import { api } from '../../../../../lib/axios';
import { UserAddress } from '@prisma/client';

interface IRequest {
	addressId: string;
}

export async function getUserAddressById({ addressId }: IRequest): Promise<UserAddress | null> {
	const { data } = await api.get(`/users/address/${addressId}`);

	return data;
}
