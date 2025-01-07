'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { useFavoriteProducts } from '@/context/favorite-products-context';
import { listingProducts } from '@/app/api/@requests/products/listing-products';

import { OrderByFilter } from './order-by-filter';
import { ProductsFilters } from './products-filters';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '../../../components/product-card/product-card';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import useMediaQuery from '@/app/utils/hooks/use-media-query';

export default function PageContent() {
	const searchParams = useSearchParams();
	const { favoriteProducts } = useFavoriteProducts();

	const { width } = useMediaQuery();
	const isDesktop = width ? width > 768 : true;

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

			<div className={twMerge(['flex flex-col gap-4 lg:gap-8', 'lg:grid lg:grid-cols-4'])}>
				<div className="hidden lg:block">
					<ProductsFilters />
				</div>

				<div className="col-span-3 space-y-4">
					{isDesktop ? (
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Todos os móveis</h2>

							<OrderByFilter />
						</div>
					) : (
						<div className="flex w-full items-center justify-between">
							<Drawer modal>
								<DrawerTrigger asChild>
									<Button variant="outline">
										<SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
										Filtros
									</Button>
								</DrawerTrigger>
								<DrawerContent>
									<DrawerHeader>
										<VisuallyHidden>
											<DrawerTitle>Are you absolutely sure?</DrawerTitle>
										</VisuallyHidden>
									</DrawerHeader>

									<ProductsFilters />
								</DrawerContent>
							</Drawer>

							<OrderByFilter />
						</div>
					)}

					<Separator />

					<div
						className={twMerge([
							'flex flex-col items-center gap-4',
							'sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
						])}
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
