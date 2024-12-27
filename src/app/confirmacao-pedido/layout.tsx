import { ReactNode } from 'react';

import { StoreFooter } from '@/components/footer/store-footer';
import { CustomerAccountHeader } from '@/components/header/customer-account-header';
import { OrderConfirmationHeader } from '@/components/header/order-confirmation-header';

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex min-h-screen flex-col bg-secondary font-sans">
			<OrderConfirmationHeader />

			<main className="mx-auto mb-0 mt-8 w-full max-w-screen-2xl flex-grow px-10 py-10">{children}</main>

			{/* <StoreFooter /> */}
		</div>
	);
}
