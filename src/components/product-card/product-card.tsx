'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { twMerge } from 'tailwind-merge';
import { useSession } from 'next-auth/react';

import { useFavoriteProducts } from '../../context/favorite-products-context';

import { LoginAlert } from './login-alert';
import { StarsRating } from '../stars-rating';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card';

import { Heart, Loader2, ShoppingBasket } from 'lucide-react';

interface IProductCardProps {
	product: Product;
	isFavorite?: boolean;
}

export function ProductCard({ product, isFavorite = false }: IProductCardProps) {
	const { status } = useSession();
	const { isLoadingFavoriteProducts, toggleFavoriteProduct } = useFavoriteProducts();

	return (
		<Card className="relative max-w-[320px] duration-200 ease-in-out hover:scale-[1.02]">
			{status === 'authenticated' ? (
				<Button
					size="icon"
					variant="ghost"
					disabled={isLoadingFavoriteProducts}
					onClick={() => toggleFavoriteProduct(product.id)}
					className="absolute right-2 top-2 z-10"
				>
					{isLoadingFavoriteProducts ? (
						<Loader2 className="animate-spin text-primary" />
					) : (
						<Heart
							strokeWidth={3}
							className={twMerge(['h-6 w-6 text-primary/70', `${isFavorite ? 'fill-primary/70' : 'fill-none'}`])}
						/>
					)}
				</Button>
			) : (
				<LoginAlert />
			)}

			<Link href={`/produtos/${product.id}/detalhes`}>
				<CardHeader>
					<div>
						<Image
							src={product.imageUrl}
							alt=""
							width={320}
							height={300}
							className="h-[250px] rounded-lg object-cover"
						/>
					</div>
					<CardDescription
						className="line-clamp-2 text-lg font-semibold leading-tight text-foreground"
						title={product.name}
					>
						{product.name}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="flex flex-col gap-2">
						<StarsRating />

						<span className="text-lg font-bold">
							{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
						</span>
					</div>
				</CardContent>
			</Link>

			<CardFooter className="flex w-full flex-col gap-2">
				<Button asChild className="w-full">
					<Link href={`/produtos/${product.id}/detalhes`}>
						<ShoppingBasket />
						Escolher
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
