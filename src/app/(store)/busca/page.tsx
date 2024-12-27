'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { useFavoriteProducts } from '@/context/favorite-products-context';
import { listingProducts } from '@/app/api/@requests/products/listing-products';

import { ProductCard } from '@/components/product-card/product-card';
import { ProductCardSkeleton } from '@/components/product-card/product-card-skeleton';

export default function SearchPage() {
	const searchParams = useSearchParams();
	const { favoriteProducts } = useFavoriteProducts();

	const searchProductsParams = searchParams.get('search') ?? undefined;

	const { data: productsResponse } = useQuery({
		queryKey: ['products', searchProductsParams],
		queryFn: async () =>
			listingProducts({
				search: searchProductsParams,
			}),
	});

	return (
		<div className="space-y-8">
			<p>
				Resultados para: <span className="font-semibold">{searchProductsParams}</span>
			</p>

			<div className="flex flex-wrap gap-6">
				{productsResponse ? (
					<>
						{productsResponse.products.length > 0 ? (
							productsResponse.products?.map((product) => {
								return (
									<ProductCard key={product.id} product={product} isFavorite={favoriteProducts.includes(product.id)} />
								);
							})
						) : (
							<div className="justify-center44 flex w-full flex-col items-center">
								<p className="text-center font-bold">
									Desculpe, não foi possível encontrar algum produto para sua pesquisa.
								</p>
								<p className="text-center">Tente novamente com outro termo para busca...</p>
							</div>
						)}
					</>
				) : (
					<>
						<ProductCardSkeleton />
						<ProductCardSkeleton />
					</>
				)}
			</div>
		</div>
	);
}
