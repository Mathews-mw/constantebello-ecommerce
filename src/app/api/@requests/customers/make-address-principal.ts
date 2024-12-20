import { api } from '@/lib/axios';

interface IRequest {
	addressId: string;
}

export interface IResponse {
	message: string;
}

export async function makeAddressPrincipal({ addressId }: IRequest): Promise<IResponse> {
	const { data: response } = await api.patch<IResponse>(
		`/customers/address/${addressId}/make-principal`
	);

	return response;
}
