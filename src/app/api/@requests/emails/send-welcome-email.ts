import { api } from '@/lib/axios';
import { Cart } from '@prisma/client';

interface IRequest {
	to: string;
	name: string;
	siteLink: string;
}

export interface IResponse {
	message: string;
	cart: Cart;
}

export async function sendWelcomeEmail({ to, name, siteLink }: IRequest): Promise<IResponse> {
	const { data: response } = await api.post<IResponse>('/mails/welcome', {
		to,
		name,
		site_link: siteLink,
	});

	return response;
}
