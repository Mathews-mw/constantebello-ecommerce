'use client';

import dayjs from 'dayjs';
import { Notification } from '@prisma/client';
import { ElementType, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { readUserNotification } from '@/app/api/@requests/notifications/read-user-notification';
import { deleteUserNotification } from '@/app/api/@requests/notifications/delete-user-notification';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogDescription } from '@radix-ui/react-dialog';
import { errorToasterHandler } from '@/app/utils/error-toaster-handler';
import { useUserNotifications } from '@/context/user-notifications-context';
import { NotificationContentDialogSkeleton } from './notification-content-dialog-skeleton';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Loader2 } from 'lucide-react';

interface IProps {
	icon: ElementType;
	notification: Notification;
	isOpen: boolean;
}

export function NotificationContentDialog({ icon: Icon, notification, isOpen }: IProps) {
	const useQuery = useQueryClient();
	const { loadingAmountUserNotifications, isLoadingUserNotifications } = useUserNotifications();

	const createdAt = dayjs(notification.createdAt).format('DD/MM/YYYY');
	const createDateFromNow = dayjs(notification.createdAt).fromNow();

	const { mutateAsync: readUserNotificationFn, isPending } = useMutation({
		mutationFn: readUserNotification,
		onSuccess: async () => {
			await useQuery.invalidateQueries({ queryKey: ['user-notifications', notification.userId] });
		},
	});

	const { mutateAsync: deleteUserNotificationFn, isPending: isPendingDelete } = useMutation({
		mutationFn: deleteUserNotification,
		onSuccess: async () => {
			await useQuery.invalidateQueries({ queryKey: ['user-notifications', notification.userId] });
			await loadingAmountUserNotifications();
		},
	});

	async function handleReadUserNotification() {
		try {
			await readUserNotificationFn({
				notificationId: notification.id,
			});

			await loadingAmountUserNotifications();
		} catch (error) {
			console.log('handleReadUserNotification error: ', error);
			errorToasterHandler(error);
		}
	}

	useEffect(() => {
		if (isOpen) {
			handleReadUserNotification();
		}
	}, [isOpen]);

	return (
		<>
			{isPending ? (
				<NotificationContentDialogSkeleton />
			) : (
				<DialogContent className="w-full md:min-w-[520px]">
					<ScrollArea className="max-h-[80vh] overflow-y-auto pr-4">
						<DialogHeader className="mb-4 space-y-2 px-1">
							<div className="mb-4 flex w-full items-center justify-between">
								<div className="flex items-center gap-2">
									<Icon className="h-6 w-6 text-primary" />
									<span className="text-xs font-semibold text-primary">{notification.tag}</span>
								</div>
								<time title={createdAt} className="text-xs text-muted-foreground">
									{createDateFromNow}
								</time>
							</div>

							<DialogTitle>{notification.title}</DialogTitle>
							<DialogDescription className="text-sm text-muted-foreground">{notification.subtitle}</DialogDescription>
						</DialogHeader>

						<div>
							<p className="text-justify">{notification.content}</p>
						</div>
					</ScrollArea>

					<DialogFooter>
						<Button
							variant="outline"
							size="sm"
							onClick={() => deleteUserNotificationFn({ notificationId: notification.id })}
							disabled={isPendingDelete}
						>
							{isPendingDelete && <Loader2 className="animate-spin" />}
							Excluir
						</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</>
	);
}
