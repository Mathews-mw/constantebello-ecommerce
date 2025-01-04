'use client';

import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { INotificationsCursorModeResponse } from '@/app/api/@requests/notifications/listing-user-notifications-cursor-mode';
import { Notification } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { NotificationItemCard } from './notification-item-card';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface INotificationsListProps {
	notifications: INotificationsCursorModeResponse[];
	hasNextPage: boolean;
	isFetching: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
}

export function NotificationsList({
	notifications,
	hasNextPage,
	isFetching,
	isFetchingNextPage,
	fetchNextPage,
}: INotificationsListProps) {
	const { ref, inView } = useInView();
	const [parent] = useAutoAnimate();

	const notificationsGroped = useMemo(() => {
		if (notifications) {
			const serviceNotesFlatArray = notifications.map((item) => item.notifications).flat(Infinity) as Notification[];

			return serviceNotesFlatArray;
		}

		return [];
	}, [notifications]);

	console.log('notificationsGroped: ', notificationsGroped);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<div>
			<ul ref={parent} className="space-y-2">
				{notificationsGroped.map((notification) => {
					return (
						<li key={notification.id}>
							<NotificationItemCard notification={notification} />
						</li>
					);
				})}
			</ul>

			{notificationsGroped.length > 0 && (
				<div className="mb-4 mt-2">
					<button
						ref={ref}
						onClick={() => fetchNextPage()}
						disabled={!hasNextPage || isFetchingNextPage}
						className="text-sm text-muted-foreground"
					>
						{isFetchingNextPage || isFetching ? (
							<Loader2 className="animate-spin" />
						) : hasNextPage ? (
							'Carregar mais'
						) : (
							'Nada mais para mostrar'
						)}
					</button>
				</div>
			)}
		</div>
	);
}
