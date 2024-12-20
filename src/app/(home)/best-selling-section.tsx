'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { listingNewArrivalsProducts } from '../api/@requests/products/listing-new-arrivals-products';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ProductCardSkeleton } from '@/components/product-card-skeleton';

export function BestSellingSection() {
	const { data: products, isFetching } = useQuery({
		queryKey: ['products', 'best-selling'],
		queryFn: listingNewArrivalsProducts,
	});

	return (
		<div>
			<h1 className="text-center text-2xl font-bold">MAIS VENDIDOS</h1>

			<div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{products ? (
					<>
						{products.map((product) => {
							return <ProductCard key={product.id} product={product} />;
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