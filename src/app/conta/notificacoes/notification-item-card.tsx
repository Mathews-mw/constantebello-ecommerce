'use client';

import { Dialog, DialogTrigger } from '../../../components/ui/dialog';
import { Notification, NotificationTag } from '@prisma/client';
import dayjs from 'dayjs';

import { Bell, CircleAlert, Mailbox, Newspaper, TicketPercent } from 'lucide-react';
import { useState } from 'react';
import { NotificationContentDialog } from './notification-content.dialog';

interface IProps {
	notification: Notification;
}

export function NotificationItemCard({ notification }: IProps) {
	const [isOpen, setIsOpen] = useState(false);

	const createdAt = dayjs(notification.createdAt).format('DD/MM/YYYY');
	const createDateFromNow = dayjs(notification.createdAt).fromNow();

	const isRead = !!notification.readAt;

	return (
		<Dialog modal open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div className="flex cursor-pointer gap-4 rounded-md border bg-background p-4 shadow-sm hover:bg-accent">
					<div>
						<NotificationIcon tag={notification.tag} isRead={!!notification.readAt} />
					</div>

					<div className="space-y-2">
						<div className="flex gap-2 text-xs text-muted-foreground">
							<span className={`font-semibold ${isRead ? 'text-muted-foreground' : 'text-primary'}`}>
								{notification.tag}
							</span>
							<span className="font-bold">|</span>
							<time dateTime={createdAt} title={createdAt}>
								publicado {createDateFromNow}
							</time>
						</div>

						<div>
							<p className="line-clamp-1">{notification.subtitle}</p>
						</div>
					</div>
				</div>
			</DialogTrigger>

			<NotificationContentDialog icon={Mailbox} notification={notification} isOpen={isOpen} />
		</Dialog>
	);
}

function NotificationIcon({ tag, isRead }: { tag: NotificationTag; isRead: boolean }) {
	switch (tag) {
		case 'GENERAL':
			return <Mailbox className={`${isRead ? 'text-muted-foreground' : 'text-primary'}`} />;
		case 'NEWS':
			return <Newspaper className={`${isRead ? 'text-muted-foreground' : 'text-primary'}`} />;
		case 'REMINDS':
			return <CircleAlert className={`${isRead ? 'text-muted-foreground' : 'text-primary'}`} />;
		case 'NOTICES':
			return <CircleAlert className={`${isRead ? 'text-muted-foreground' : 'text-primary'}`} />;
		case 'OFFERS':
			return <TicketPercent className={`${isRead ? 'text-muted-foreground' : 'text-primary'}`} />;
		case 'OTHERS':
			return <Bell className={`${isRead ? 'text-muted-foreground' : 'text-primary'}`} />;
		default:
			return <Mailbox className={`${isRead ? 'text-muted-foreground' : 'text-primary'}`} />;
	}
}
