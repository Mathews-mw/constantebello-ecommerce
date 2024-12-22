'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { twMerge } from 'tailwind-merge';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markProductAsFavorite } from '@/app/api/@requests/customers/mark-product-as-favorite';
import { unmarkProductAsFavorite } from '@/app/api/@requests/customers/unmark-customer-favorite-product';

import { LoginAlert } from './login-alert';
import { StarsRating } from '../stars-rating';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

import { Heart, Loader2, ShoppingCart } from 'lucide-react';

interface IProductCardProps {
	product: Product;
	isFavorite?: boolean;
}

export function ProductCard({ product, isFavorite = false }: IProductCardProps) {
	const { status, data } = useSession();
	const queryClient = useQueryClient();

	const { mutateAsync: markProductAsFavoriteFn, isPending } = useMutation({
		mutationFn: async () =>
			markProductAsFavorite({ userId: data ? data.user.id : '', productId: product.id }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['favorite-products'],
			});
		},
	});

	const { mutateAsync: unmarkProductAsFavoriteFn, isPending: unMarkPending } = useMutation({
		mutationFn: async () =>
			unmarkProductAsFavorite({ userId: data ? data.user.id : '', productId: product.id }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['favorite-products'],
			});
		},
	});

	async function handleToggleFavorite() {
		if (isFavorite) {
			return unmarkProductAsFavoriteFn();
		} else {
			return await markProductAsFavoriteFn();
		}
	}

	return (
		<Card className="relative max-w-[320px] duration-200 ease-in-out hover:scale-[1.02]">
			{status === 'authenticated' ? (
				<Button
					size="icon"
					variant="ghost"
					disabled={isPending || unMarkPending}
					onClick={() => handleToggleFavorite()}
					className="absolute right-2 top-2 z-10"
				>
					{isPending || unMarkPending ? (
						<Loader2 className="animate-spin text-primary" />
					) : (
						<Heart
							strokeWidth={3}
							className={twMerge([
								'h-6 w-6 text-primary/70',
								`${isFavorite ? 'fill-primary/70' : 'fill-none'}`,
							])}
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
				<Button className="w-full">
					<ShoppingCart />
					Escolher
				</Button>
			</CardFooter>
		</Card>
	);
}
