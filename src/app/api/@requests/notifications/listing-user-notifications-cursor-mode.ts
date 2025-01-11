import { api } from '../../../../lib/axios';
import { Notification } from '@prisma/client';

interface IRequest {
	userId: string;
	cursor?: string;
	limit: number;
	skip?: number;
}

export interface INotificationsCursorModeResponse {
	nextCursor?: string;
	previousCursor?: string;
	notifications: Notification[];
}

export async function listingUserNotificationsCursorMode({
	userId,
	cursor,
	limit,
	skip,
}: IRequest): Promise<INotificationsCursorModeResponse> {
	const { data } = await api.get(`/notifications/user/${userId}/listing-user-notifications-cursor-mode`, {
		params: {
			limit,
			cursor,
			skip,
		},
	});

	return data;
}
