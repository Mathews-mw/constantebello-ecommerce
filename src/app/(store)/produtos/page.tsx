'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useFavoriteProducts } from '@/context/favorite-products-context';
import { listingProducts } from '@/app/api/@requests/products/listing-products';

import { OrderByFilter } from './order-by-filter';
import { ProductsFilters } from './products-filters';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '../../../components/product-card/product-card';

import { ChevronRight } from 'lucide-react';

export default function ProductsPage() {
	const searchParams = useSearchParams();
	const { favoriteProducts } = useFavoriteProducts();

	const searchProductsParams = searchParams.get('search') ?? undefined;
	const orderByParams = searchParams.get('orderBy') ?? undefined;
	const minPriceParams = searchParams.get('minPrice') ?? undefined;
	const maxPriceParams = searchParams.get('maxPrice') ?? undefined;
	const departmentsParams = searchParams.get('departments') ?? undefined;

	const { data: productsResponse } = useQuery({
		queryKey: ['products', searchProductsParams, minPriceParams, maxPriceParams, orderByParams, departmentsParams],
		queryFn: async () =>
			listingProducts({
				search: searchProductsParams,
				orderBy: orderByParams,
				minPrice: minPriceParams,
				maxPrice: maxPriceParams,
				departments: departmentsParams ? departmentsParams.split(',') : undefined,
			}),
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center text-sm text-muted-foreground">
				<span>Home</span> <ChevronRight className="h-4 w-4" />{' '}
				<span className="font-semibold text-primary">Produtos</span>
			</div>

			<div className="grid grid-cols-4 gap-8">
				<ProductsFilters />

				<div className="col-span-3 space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">Todos os móveis</h2>

						<OrderByFilter />
					</div>

					<Separator />

					<div
						style={{
							display: 'grid',
							columnGap: '18px',
							rowGap: '18px',
							gridTemplateColumns: 'repeat(auto-fit, minmax(325px, 1fr))',
						}}
					>
						{productsResponse?.products?.map((product) => {
							return (
								<ProductCard key={product.id} product={product} isFavorite={favoriteProducts.includes(product.id)} />
							);
						})}
					</div>

					<div className="flex w-full justify-end">
						<span className="text-sm text-muted-foreground">Qtd. Produtos: {productsResponse?.amount}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
