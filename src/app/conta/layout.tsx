import { ReactNode } from 'react';

import { StoreFooter } from '@/components/footer/store-footer';
import { CustomerAccountHeader } from '@/components/header/customer-account-header';

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex min-h-screen flex-col bg-secondary font-sans">
			<CustomerAccountHeader />

			<main className="mx-auto mb-0 mt-8 w-full max-w-screen-2xl flex-grow px-20 py-0">{children}</main>

			<StoreFooter />
		</div>
	);
}
