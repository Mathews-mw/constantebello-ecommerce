import { api } from '../../../../../lib/axios';

interface IRequest {
	addressId: string;
}

export interface IResponse {
	message: string;
}

export async function deleteUserAddress({ addressId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.delete<IResponse>(`/users/address/${addressId}/delete`);

	return response;
}
