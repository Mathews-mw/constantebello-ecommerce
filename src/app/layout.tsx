import './globals.css';

import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { twMerge } from 'tailwind-merge';
import { CartContextProvider } from '@/context/cart-context';
import { NextAuthSessionProvider } from '@/providers/SessionProvider';
import { TanstackQueryClientProvider } from '@/providers/tanstack-query-client-provider';
import { FavoriteProductsContextProvider } from '@/context/favorite-products-context';
import { UserNotificationsContextProvider } from '@/context/user-notifications-context';

const satoshiFont = localFont({
	src: [
		{
			path: '../fonts/Satoshi-Variable.woff2',
			weight: '300 900',
			style: 'normal',
		},
	],
	variable: '--font-satoshi',
	display: 'swap',
});

export const metadata: Metadata = {
	title: {
		template: '%s | Costante Bello',
		default: 'Costante Bello',
	},
	description: 'E-commerce Constante Bello',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
			</head>

			<body className={twMerge('min-h-screen bg-background antialiased', satoshiFont.variable)}>
				<TanstackQueryClientProvider>
					<NextAuthSessionProvider>
						<FavoriteProductsContextProvider>
							<UserNotificationsContextProvider>
								<CartContextProvider>{children}</CartContextProvider>
							</UserNotificationsContextProvider>
						</FavoriteProductsContextProvider>
					</NextAuthSessionProvider>
				</TanstackQueryClientProvider>

				<Toaster richColors closeButton />
			</body>
		</html>
	);
}
