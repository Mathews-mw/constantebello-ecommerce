import { api } from '@/lib/axios';
import { Notification } from '@prisma/client';

interface IRequest {
	userId: string;
	unreadOnly?: boolean;
}

interface IResponse {
	notifications: Notification[];
	amount: number;
}

export async function listingUserNotifications({ userId, unreadOnly }: IRequest): Promise<IResponse> {
	const { data } = await api.get(`/notifications/user/${userId}/listing-user-notifications`, {
		params: {
			unreadOnly,
		},
	});

	return data;
}
