import { api } from '@/lib/axios';

interface IRequest {
	addressId: string;
	cep?: string;
	street?: string;
	number?: string;
	neighborhood?: string;
	addressComplement?: string;
	addressReference?: string;
	city?: string;
	state?: string;
	isPrincipal?: boolean;
}

export interface IResponse {
	message: string;
}

export async function updateUserAddress({
	addressId,
	cep,
	street,
	number,
	neighborhood,
	addressComplement,
	addressReference,
	city,
	state,
	isPrincipal,
}: IRequest): Promise<IResponse> {
	const { data: response } = await api.put<IResponse>(`/users/address/${addressId}/edit`, {
		address_id: addressId,
		cep,
		street,
		number,
		neighborhood,
		address_complement: addressComplement,
		address_reference: addressReference,
		city,
		state,
		is_principal: isPrincipal,
	});

	return response;
}
