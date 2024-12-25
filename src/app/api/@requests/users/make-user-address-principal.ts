import { api } from '@/lib/axios';

interface IRequest {
	addressId: string;
}

export interface IResponse {
	message: string;
}

export async function makeUserAddressPrincipal({ addressId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.patch<IResponse>(`/users/address/${addressId}/make-principal`);

	return response;
}
