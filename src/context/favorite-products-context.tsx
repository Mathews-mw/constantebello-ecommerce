'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

import { listingCustomerFavoriteProducts } from '@/app/api/@requests/customers/listing-customer-favorite-products';

interface IFavoriteProductsContextType {
	favoriteProducts: Array<string>;
}

export const FavoriteProductsContext = createContext({} as IFavoriteProductsContextType);

export function FavoriteProductsContextProvider({ children }: { children: React.ReactNode }) {
	const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);

	const { data, status } = useSession();

	const { data: favoriteProductsResponse, isFetching } = useQuery({
		queryKey: ['favorite-products', data?.user.id],
		queryFn: async () => {
			const response = await listingCustomerFavoriteProducts({ id: data ? data.user.id : '' });

			setFavoriteProducts(response.map((item) => item.productId));
			return response;
		},
		enabled: status === 'authenticated',
	});

	return <FavoriteProductsContext.Provider value={{ favoriteProducts }}>{children}</FavoriteProductsContext.Provider>;
}

export const useFavoriteProducts = () => useContext(FavoriteProductsContext);
