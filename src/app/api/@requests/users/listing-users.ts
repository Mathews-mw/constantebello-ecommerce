import { api } from '@/lib/axios';
import { User } from '@prisma/client';

interface IResponse {
	users: User[];
	count: number;
}

export async function listingUsers(): Promise<IResponse> {
	const { data } = await api.get('/users');

	return data;
}
