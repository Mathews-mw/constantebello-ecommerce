'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { FavoriteCard } from './favorite-card';
import { FavoriteCardSkeleton } from './favorite-card-skeleton';
import { listingUserFavoriteProductsDetails } from '../../api/@requests/users/favorites/listing-user-favorite-products-details';

export function FavoriteList() {
	const { status, data } = useSession();
	const [parent] = useAutoAnimate();

	const { data: favoriteProducts } = useQuery({
		queryKey: ['favorite-products', 'details', data?.user.id],
		queryFn: async () => listingUserFavoriteProductsDetails({ id: data ? data.user.id : '' }),
		enabled: status === 'authenticated',
	});

	return (
		<>
			{favoriteProducts ? (
				<div ref={parent} className="space-y-2.5">
					{favoriteProducts?.map((product) => {
						return <FavoriteCard key={product.id} product={product} userId={data ? data.user.id : ''} />;
					})}
				</div>
			) : (
				<div className="space-y-2.5">
					{Array.from([1, 2, 3]).map((_, i) => {
						return <FavoriteCardSkeleton key={i} />;
					})}
				</div>
			)}
		</>
	);
}
