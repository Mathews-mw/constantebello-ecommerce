'use client';

import { useSession } from 'next-auth/react';
import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import {
	INotificationsCursorModeResponse,
	listingUserNotificationsCursorMode,
} from '@/app/api/@requests/notifications/listing-user-notifications-cursor-mode';

import { NotificationsList } from './notifications-list';
import { EmptyNotifications } from './empty-notifications';

import { Bell } from '@phosphor-icons/react/dist/ssr';

export default function NotificationsPage() {
	const { data, status } = useSession();

	const {
		data: notificationsResponse,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery<
		INotificationsCursorModeResponse,
		Error,
		InfiniteData<INotificationsCursorModeResponse>,
		QueryKey,
		string | undefined
	>({
		queryKey: ['user-notifications', data?.user.id],
		queryFn: async ({ pageParam }) =>
			await listingUserNotificationsCursorMode({
				userId: data?.user.id ?? '',
				limit: 8,
				cursor: pageParam,
			}),
		initialPageParam: undefined,
		getPreviousPageParam: (firstPage) => firstPage.previousCursor,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: !!data && status === 'authenticated',
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2">
				<Bell className="fill-primary" weight="fill" size={24} />
				<h1 className="text-xl font-black">Notificações</h1>
			</div>

			{notificationsResponse?.pages.length === 0 && <EmptyNotifications />}

			{notificationsResponse && (
				<NotificationsList
					notifications={notificationsResponse.pages}
					isFetching={isFetching}
					isFetchingNextPage={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
				/>
			)}
		</div>
	);
}
