import { api } from '../../../../lib/axios';

interface IRequest {
	notificationId: string;
}

export async function readUserNotification({ notificationId }: IRequest): Promise<void> {
	const { data } = await api.patch(`/notifications/${notificationId}/read`);

	return data;
}
