'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Product } from '@prisma/client';

import { StarsRating } from './stars-rating';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

import { Heart, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';

interface IProductCardProps {
	product: Product;
}

export function ProductCard({ product }: IProductCardProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	const { addToCart } = useCart();

	return (
		<Card className="relative max-w-[320px] duration-200 ease-in-out hover:scale-[1.02]">
			<Button
				size="icon"
				variant="ghost"
				onClick={() => setIsFavorite(!isFavorite)}
				className="absolute right-2 top-2 z-10"
			>
				<Heart
					strokeWidth={3}
					className={twMerge([
						'h-6 w-6 text-primary/70',
						`${isFavorite ? 'fill-primary/70' : 'fill-none'}`,
					])}
				/>
			</Button>

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
				<Button className="w-full">
					<ShoppingCart />
					Comprar
				</Button>

				<Button variant="secondary" className="w-full" onClick={() => addToCart(product.id)}>
					<ShoppingBag />
					Adicionar à sacola
				</Button>
			</CardFooter>
		</Card>
	);
}
