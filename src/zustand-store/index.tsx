import { create } from 'zustand';
import { useSession } from 'next-auth/react';

import { markProductAsFavorite } from '@/app/api/@requests/customers/mark-product-as-favorite';
import { unmarkProductAsFavorite } from '@/app/api/@requests/customers/unmark-customer-favorite-product';
import { listingCustomerFavoriteProducts } from '@/app/api/@requests/customers/listing-customer-favorite-products';

export interface IStoreState {
	favoriteProducts: Array<string>;
	isLoadingFavoriteProducts: boolean;
	loadingFavoriteProducts: () => Promise<void>;
	toggleFavorite: (userId: string, productId: string) => Promise<void>;
}

export const useStore = create<IStoreState>((set, get) => {
	const { data, status } = useSession();

	return {
		favoriteProducts: [],
		isLoadingFavoriteProducts: false,

		loadingFavoriteProducts: async () => {
			set({ isLoadingFavoriteProducts: true });
			if (status === 'authenticated' && data.user) {
				const response = await listingCustomerFavoriteProducts({
					id: data.user.id,
				});

				set({
					favoriteProducts: response.map((item) => item.productId),
				});
			}
			set({ isLoadingFavoriteProducts: false });
		},

		toggleFavorite: async (userId, productId) => {
			const { favoriteProducts } = get();

			const isFavorite = favoriteProducts.includes(productId);

			if (isFavorite) {
				await markProductAsFavorite({ userId, productId });
			} else {
				await unmarkProductAsFavorite({ userId, productId });
			}
		},
	};
});
