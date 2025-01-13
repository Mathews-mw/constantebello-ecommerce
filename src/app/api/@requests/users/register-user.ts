import { api } from '@/lib/axios';
import { ICreateUserBodyRequest } from '../../users/create/route';

export interface IResponse {
	message: string;
	user: {
		id: string;
		name: string;
		email: string;
	};
}

export async function registerUser({
	email,
	name,
	password,
	cpf,
	phone,
	birthday,
	policy_consent,
	advertising_consent,
}: ICreateUserBodyRequest): Promise<IResponse> {
	const { data } = await api.post<IResponse>(`/users/create`, {
		email,
		name,
		password,
		cpf,
		phone,
		birthday,
		policy_consent,
		advertising_consent,
	});

	return data;
}
