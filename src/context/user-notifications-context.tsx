'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { listingUserNotifications } from '@/app/api/@requests/notifications/listing-user-notifications';

interface IUserNotificationsContextType {
	amountUserNotifications: number;
	isLoadingUserNotifications: boolean;
	loadingAmountUserNotifications: () => Promise<void>;
}

export const UserNotificationsContext = createContext({} as IUserNotificationsContextType);

export function UserNotificationsContextProvider({ children }: { children: React.ReactNode }) {
	const [amountUserNotifications, setAmountUserNotifications] = useState<number>(0);
	const [isLoadingUserNotifications, setIsLoadingUserNotifications] = useState(false);

	const { data, status } = useSession();

	async function loadingAmountUserNotifications() {
		setIsLoadingUserNotifications(true);

		if (status === 'authenticated') {
			if (data && data.user) {
				const { amount } = await listingUserNotifications({
					userId: data.user.id,
					unreadOnly: true,
				});

				setAmountUserNotifications(amount);
			}
		}

		if (status !== 'loading') {
			setIsLoadingUserNotifications(false);
		}
	}

	useEffect(() => {
		loadingAmountUserNotifications();
	}, [status]);

	return (
		<UserNotificationsContext.Provider
			value={{ amountUserNotifications, isLoadingUserNotifications, loadingAmountUserNotifications }}
		>
			{children}
		</UserNotificationsContext.Provider>
	);
}

export const useUserNotifications = () => useContext(UserNotificationsContext);
