import { api } from '../../../../lib/axios';
import { IUserDetails } from '../../../../@types/user';

interface IRequest {
	id: string;
}

export async function getUserById({ id }: IRequest): Promise<IUserDetails> {
	const { data } = await api.get(`/users/${id}`);

	return data;
}
