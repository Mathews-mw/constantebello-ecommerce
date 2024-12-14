import './globals.css';

import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

const baloo = Baloo_2({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Constante Bello ',
	description: 'E-commerce Constante Bello',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={twMerge('min-h-screen bg-background antialiased', baloo.className)}>
				{children}
			</body>
		</html>
	);
}
