import { api } from '../../../../lib/axios';

interface IRequest {
	notificationId: string;
}

export async function deleteUserNotification({ notificationId }: IRequest): Promise<void> {
	const { data } = await api.delete(`/notifications/${notificationId}/delete`);

	return data;
}
