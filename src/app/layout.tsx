import './globals.css';

import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import localFont from 'next/font/local';
import { TanstackQueryClientProvider } from '@/providers/tanstack-query-client-provider';
import { CartContextProvider } from '@/context/cart-context';

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
	title: 'Costante Bello ',
	description: 'E-commerce Constante Bello',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={twMerge('min-h-screen bg-background antialiased', satoshiFont.variable)}>
				<TanstackQueryClientProvider>
					<CartContextProvider>{children}</CartContextProvider>
				</TanstackQueryClientProvider>
			</body>
		</html>
	);
}
