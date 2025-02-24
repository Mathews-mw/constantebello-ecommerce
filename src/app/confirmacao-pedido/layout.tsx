import { ReactNode } from 'react';

import { OrderConfirmationHeader } from '@/components/header/order-confirmation-header';

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex min-h-screen flex-col bg-secondary font-sans">
			<OrderConfirmationHeader />

			<main className="mx-auto mb-4 mt-4 w-full max-w-screen-2xl flex-grow px-4 lg:mb-0 lg:mt-8 lg:px-10 lg:py-10">
				{children}
			</main>
		</div>
	);
}
