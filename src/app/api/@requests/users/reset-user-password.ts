import { api } from '@/lib/axios';

interface IRequest {
	id: string;
}

export interface IResponse {
	message: string;
}

export async function resetUserPassword({ id }: IRequest): Promise<IResponse> {
	const { data } = await api.patch<IResponse>(`/users/${id}/reset-user-password`);

	return data;
}
