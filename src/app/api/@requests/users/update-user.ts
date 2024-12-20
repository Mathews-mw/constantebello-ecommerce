import { api } from '@/lib/axios';

interface IRequest {
	id: string;
	name?: string;
	email?: string;
	role?: 'ADMIN' | 'MODERADOR';
}

export interface IResponse {
	message: string;
}

export async function updateUser({ id, email, name, role }: IRequest): Promise<IResponse> {
	const { data } = await api.put<IResponse>(`/users/${id}/update`, {
		email,
		name,
		role,
	});

	return data;
}
