import { ReactNode } from 'react';

import { StoreFooter } from '@/components/footer/store-footer';
import { StoreHeader } from '@/components/header/store-header';
import { FavoriteProductsContextProvider } from '@/context/favorite-products-context';

export default function StoreLayout({ children }: { children: ReactNode }) {
	return (
			<div className="relative flex min-h-screen flex-col bg-secondary font-sans">
				<StoreHeader />

				<main className="mx-auto mb-0 mt-8 w-full max-w-screen-2xl flex-grow px-20 py-0">
					{children}
				</main>

				<StoreFooter />
			</div>
	);
}
