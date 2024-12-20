import { api } from '@/lib/axios';

interface IRequest {
	id: string;
}

export interface IResponse {
	message: string;
}

export async function deleteUser({ id }: IRequest): Promise<IResponse> {
	const { data } = await api.delete<IResponse>(`/users/${id}/delete`);

	return data;
}
