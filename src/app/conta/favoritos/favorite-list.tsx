'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FavoriteCard } from './favorite-card';
import { useQuery } from '@tanstack/react-query';
import { listingCustomerFavoriteProductsDetails } from '@/app/api/@requests/customers/listing-customer-favorite-produts-details';
import { useSession } from 'next-auth/react';

export function FavoriteList() {
	const { status, data } = useSession();
	const [parent] = useAutoAnimate();

	const { data: favoriteProducts } = useQuery({
		queryKey: ['favorite-products', 'details', data?.user.id],
		queryFn: async () => listingCustomerFavoriteProductsDetails({ id: data ? data.user.id : '' }),
		enabled: status === 'authenticated',
	});

	return (
		<div ref={parent} className="space-y-2.5">
			{favoriteProducts?.map((product) => {
				return <FavoriteCard key={product.id} product={product} />;
			})}
		</div>
	);
}
