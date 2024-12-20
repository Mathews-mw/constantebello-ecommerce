import { api } from '@/lib/axios';

interface IRequest {
	userId: string;
	cpf: string;
	phone: string;
	birthday: string;
	policyConsent: boolean;
	advertisingConsent?: boolean;
}

export interface IResponse {
	message: string;
}

export async function insertCustomerInfos({
	userId,
	phone,
	cpf,
	birthday,
	policyConsent,
	advertisingConsent,
}: IRequest): Promise<IResponse> {
	const { data } = await api.post<IResponse>(`/customers/insert-infos`, {
		user_id: userId,
		phone,
		cpf,
		birthday,
		policy_consent: policyConsent,
		advertising_consent: advertisingConsent,
	});

	return data;
}
