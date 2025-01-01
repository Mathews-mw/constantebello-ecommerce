import { prisma } from '@/lib/prisma';
import { Notification, NotificationTag } from '@prisma/client';

interface ICreateNotificationRequest {
	userId: string;
	title: string;
	subtitle: string;
	content: string;
	tag?: NotificationTag;
}

interface IResponse {
	notification: Notification;
}

export async function createNotification({
	userId,
	title,
	subtitle,
	content,
	tag,
}: ICreateNotificationRequest): Promise<IResponse> {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		throw new Error('Recurso não encontrado');
	}

	const notification = await prisma.notification.create({
		data: {
			userId,
			title,
			subtitle,
			content,
			tag,
		},
	});

	return {
		notification,
	};
}
