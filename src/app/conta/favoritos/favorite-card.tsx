'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';

import { useFavoriteProducts } from '../../../context/favorite-products-context';

import { Button } from '../../../components/ui/button';
import { StarsRating } from '../../../components/stars-rating';

import { Heart, Loader2 } from 'lucide-react';

interface IFavoriteCardProps {
	product: Product;
	userId: string;
}

export function FavoriteCard({ product, userId }: IFavoriteCardProps) {
	const { toggleFavoriteProduct, isLoadingFavoriteProducts } = useFavoriteProducts();
	const queryClient = useQueryClient();

	async function handleRemoveFavorite() {
		await toggleFavoriteProduct(product.id);

		await queryClient.invalidateQueries({
			queryKey: ['favorite-products', 'details', userId],
		});
	}

	return (
		<div className="flex w-full flex-col justify-between gap-8 rounded-lg border bg-background p-4 shadow-sm lg:flex-row">
			<div className="flex flex-grow gap-8">
				<Image
					src={product.imageUrl}
					alt=""
					width={1020}
					height={1020}
					className="h-[100px] w-[100px] rounded-lg object-cover md:h-[140px] md:w-[140px]"
				/>

				<div className="space-y-4">
					<h4 className="line-clamp-3 text-sm font-bold md:text-base">{product.name}</h4>
					<StarsRating />
				</div>
			</div>

			<div className="flex flex-col items-center justify-between gap-2 md:gap-0">
				<div className="flex w-full items-center justify-between gap-2">
					<span className="text-nowrap text-lg font-black">
						{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
					</span>
					<Button variant="ghost" size="xs" onClick={() => handleRemoveFavorite()}>
						{isLoadingFavoriteProducts ? (
							<Loader2 className="animate-spin text-primary" />
						) : (
							<Heart className="h-6 w-6 fill-primary text-primary" />
						)}
					</Button>
				</div>

				<Button asChild className="w-full">
					<Link href={`/produtos/${product.id}/detalhes`}>Comprar</Link>
				</Button>
			</div>
		</div>
	);
}
