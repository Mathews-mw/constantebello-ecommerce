import { ReactNode } from 'react';

import { StoreFooter } from '../../components/footer/store-footer';
import { StoreHeader } from '../../components/header/store-header';

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-secondary font-sans">
			<StoreHeader />

			<main className="flex-grow">{children}</main>

			<StoreFooter />
		</div>
	);
}
