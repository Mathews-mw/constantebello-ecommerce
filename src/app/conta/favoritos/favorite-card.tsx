'use client';

import Image from 'next/image';
import { Product } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { unmarkProductAsFavorite } from '@/app/api/@requests/customers/unmark-customer-favorite-product';

import { Button } from '@/components/ui/button';
import { StarsRating } from '@/components/stars-rating';

import { Heart, Loader2 } from 'lucide-react';

interface IFavoriteCardProps {
	product: Product;
	userId: string;
}

export function FavoriteCard({ product, userId }: IFavoriteCardProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: unmarkProductAsFavoriteFn, isPending } = useMutation({
		mutationFn: async () => unmarkProductAsFavorite({ userId, productId: product.id }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['products', 'favorite-products'],
			});
		},
	});

	return (
		<div className="flex w-full justify-between gap-8 rounded-lg border bg-background p-4 shadow-sm">
			<div className="flex flex-grow gap-8">
				<Image
					src={product.imageUrl}
					alt=""
					width={1020}
					height={1020}
					className="h-[140px] w-[140px] rounded-lg object-cover"
				/>

				<div className="space-y-4">
					<h4 className="line-clamp-3 font-bold">{product.name}</h4>
					<StarsRating />
				</div>
			</div>

			<div className="flex flex-col items-center justify-between border-l-2 pl-8">
				<div className="flex w-full items-center justify-between gap-2">
					<span className="text-nowrap text-lg font-black">
						{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
					</span>
					<Button variant="ghost" size="xs" onClick={() => unmarkProductAsFavoriteFn()}>
						{isPending ? (
							<Loader2 className="animate-spin text-primary" />
						) : (
							<Heart className="h-6 w-6 fill-primary text-primary" />
						)}
					</Button>
				</div>

				<Button className="w-full">Comprar</Button>
			</div>
		</div>
	);
}
