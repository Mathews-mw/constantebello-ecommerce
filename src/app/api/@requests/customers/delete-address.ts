import { api } from '@/lib/axios';

interface IRequest {
	addressId: string;
}

export interface IResponse {
	message: string;
}

export async function deleteAddress({ addressId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.delete<IResponse>(
		`/customers/address/${addressId}/delete`
	);

	return response;
}
