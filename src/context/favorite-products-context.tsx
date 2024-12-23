'use client';

import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { markProductAsFavorite } from '@/app/api/@requests/customers/mark-product-as-favorite';
import { unmarkProductAsFavorite } from '@/app/api/@requests/customers/unmark-customer-favorite-product';
import { listingCustomerFavoriteProducts } from '@/app/api/@requests/customers/listing-customer-favorite-products';

interface IFavoriteProductsContextType {
	favoriteProducts: Array<string>;
	isLoadingFavoriteProducts: boolean;
	toggleFavoriteProduct: (productId: string) => Promise<void>;
}

export const FavoriteProductsContext = createContext({} as IFavoriteProductsContextType);

export function FavoriteProductsContextProvider({ children }: { children: React.ReactNode }) {
	const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
	const [isLoadingFavoriteProducts, setIsLoadingFavoriteProducts] = useState(false);

	const queryClient = useQueryClient();

	const { data, status } = useSession();

	async function loadingFavoriteProducts() {
		setIsLoadingFavoriteProducts(true);

		if (status === 'authenticated') {
			if (data && data.user) {
				console.log('fetching customer favorite products...');
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

	async function toggleFavoriteProduct(productId: string) {
		setIsLoadingFavoriteProducts(true);

		if (!data) {
			setIsLoadingFavoriteProducts(false);
			return;
		}

		const isFavorite = favoriteProducts.includes(productId);

		if (isFavorite) {
			await unmarkProductAsFavorite({ userId: data.user.id, productId });
		} else {
			await markProductAsFavorite({ userId: data.user.id, productId });
		}

		await loadingFavoriteProducts();
		await queryClient.invalidateQueries({ queryKey: ['favorite-products'] });
		setIsLoadingFavoriteProducts(false);
	}

	useEffect(() => {
		loadingFavoriteProducts();
	}, [status]);

	return (
		<FavoriteProductsContext.Provider value={{ favoriteProducts, isLoadingFavoriteProducts, toggleFavoriteProduct }}>
			{children}
		</FavoriteProductsContext.Provider>
	);
}

export const useFavoriteProducts = () => useContext(FavoriteProductsContext);
