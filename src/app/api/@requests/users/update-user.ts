import { api } from '../../../../lib/axios';

interface IRequest {
	id: string;
	name?: string;
	email?: string;
	phone?: string;
	cpf?: string;
	birthday?: string;
	policyConsent?: boolean;
	advertisingConsent?: boolean;
	role?: 'ADMIN' | 'MODERADOR';
}

export interface IResponse {
	message: string;
}

export async function updateUser({
	id,
	email,
	name,
	phone,
	birthday,
	cpf,
	policyConsent,
	advertisingConsent,
	role,
}: IRequest): Promise<IResponse> {
	const { data } = await api.put<IResponse>(`/users/${id}/update`, {
		email,
		name,
		phone,
		cpf,
		birthday,
		policy_consent: policyConsent,
		advertising_consent: advertisingConsent,
		role,
	});

	return data;
}
