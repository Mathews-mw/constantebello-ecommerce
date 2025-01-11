import { api } from '../../../../../lib/axios';

interface IRequest {
	userId: string;
	cep: string;
	street: string;
	number: string;
	neighborhood: string;
	addressComplement?: string;
	addressReference?: string;
	city: string;
	state: string;
}

export interface IResponse {
	message: string;
}

export async function registerUserAddress({
	userId,
	cep,
	street,
	number,
	neighborhood,
	addressComplement,
	addressReference,
	city,
	state,
}: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>(`/users/address/register`, {
		user_id: userId,
		cep,
		street,
		number,
		neighborhood,
		address_complement: addressComplement,
		address_reference: addressReference,
		city,
		state,
	});

	return response;
}
