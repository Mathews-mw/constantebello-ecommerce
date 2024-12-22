import { ReactNode } from 'react';

import { StoreFooter } from '@/components/footer/store-footer';
import { StoreHeader } from '@/components/header/store-header';
import { FavoriteProductsContextProvider } from '@/context/favorite-products-context';

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-secondary font-sans">
			<StoreHeader />

			<main className="flex-grow">
				<FavoriteProductsContextProvider>{children}</FavoriteProductsContextProvider>
			</main>

			<StoreFooter />
		</div>
	);
}
