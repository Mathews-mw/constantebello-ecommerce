'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useQuery } from '@tanstack/react-query';

import { useFavoriteProducts } from '@/context/favorite-products-context';
import { listingNewArrivalsProducts } from '../api/@requests/products/listing-new-arrivals-products';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card/product-card';
import { ProductCardSkeleton } from '@/components/product-card/product-card-skeleton';

export function NewArrivalsSection() {
	const { favoriteProducts } = useFavoriteProducts();

	const { data: products, isFetching } = useQuery({
		queryKey: ['products', 'new-arrivals'],
		queryFn: listingNewArrivalsProducts,
	});

	return (
		<div>
			<h1 className="text-center text-2xl font-bold">NOVIDADES</h1>

			<div
				className={twMerge([
					'flex flex-col items-center gap-4 p-6',
					'sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
				])}
			>
				{products ? (
					<>
						{products.map((product) => {
							return (
								<ProductCard key={product.id} product={product} isFavorite={favoriteProducts.includes(product.id)} />
							);
						})}
					</>
				) : (
					<>
						{Array.from([1, 2, 3, 4]).map((i, _) => {
							return <ProductCardSkeleton key={i} />;
						})}
					</>
				)}
			</div>

			<div className="flex w-full justify-center">
				<Button asChild variant="outline">
					<Link href="/produtos">Ver todos</Link>
				</Button>
			</div>
		</div>
	);
}
