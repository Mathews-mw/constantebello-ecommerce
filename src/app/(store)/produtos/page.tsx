'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductsFilters } from './products-filters';
import { ProductCard } from '../../../components/product-card';
import { listingProducts } from '@/app/api/@requests/products/listing-products';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { ChevronRight, ListFilter } from 'lucide-react';

export default function ProductsPage() {
	const { data: products, isFetching } = useQuery({
		queryKey: ['products'],
		queryFn: listingProducts,
	});

	console.log('products: ', products);

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

						<Button
							variant="outline"
							className="flex items-center gap-2 text-sm text-muted-foreground"
						>
							<ListFilter className="h-4 w-4" />
							<span>Ordenar: Relevância</span>
						</Button>
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
						{products?.map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
