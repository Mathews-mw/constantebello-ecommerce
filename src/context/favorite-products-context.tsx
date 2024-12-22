'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { listingCustomerFavoriteProducts } from '@/app/api/@requests/customers/listing-customer-favorite-products';

interface IFavoriteProductsContextType {
	favoriteProducts: Array<string>;
	isLoadingFavoriteProducts: boolean;
}

export const FavoriteProductsContext = createContext({} as IFavoriteProductsContextType);

export function FavoriteProductsContextProvider({ children }: { children: React.ReactNode }) {
	const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
	const [isLoadingFavoriteProducts, setIsLoadingFavoriteProducts] = useState(false);

	const { data, status } = useSession();

	console.log('favorite products: ', favoriteProducts);

	useEffect(() => {
		async function loadingFavoriteProducts() {
			setIsLoadingFavoriteProducts(true);

			if (status === 'authenticated') {
				console.log('user session status: ', status);
				if (data && data.user) {
					const response = await listingCustomerFavoriteProducts({
						id: data.user.id,
					});

					setFavoriteProducts(response.map((item) => item.productId));
				}
			}

			if (status !== 'loading') {
				setIsLoadingFavoriteProducts(false);
			}
		}

		loadingFavoriteProducts();
	}, [status]);

	return (
		<FavoriteProductsContext.Provider value={{ favoriteProducts, isLoadingFavoriteProducts }}>
			{children}
		</FavoriteProductsContext.Provider>
	);
}

export const useFavoriteProducts = () => useContext(FavoriteProductsContext);
