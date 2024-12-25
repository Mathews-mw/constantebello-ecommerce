'use client';

import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { selectProductAsFavorite } from '@/app/api/@requests/users/select-product-as-favorite';
import { uncheckProductAsFavorite } from '@/app/api/@requests/users/uncheck-product-as-favorite';
import { listingUserFavoriteProducts } from '@/app/api/@requests/users/listing-user-favorite-products';

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
				console.log('fetching user favorite products...');
				const response = await listingUserFavoriteProducts({
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
			await uncheckProductAsFavorite({ userId: data.user.id, productId });
		} else {
			await selectProductAsFavorite({ userId: data.user.id, productId });
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
