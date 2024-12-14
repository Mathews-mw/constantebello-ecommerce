import { StoreFooter } from '@/components/footer/store-footer';
import { StoreHeader } from '@/components/header/store-header';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<StoreHeader />

			<main className="flex-grow">{children}</main>

			<StoreFooter />
		</div>
	);
}
