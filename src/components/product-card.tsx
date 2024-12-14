'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

import { Heart, ShoppingBag, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function ProductCard() {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<Card className="max-w-[320px] duration-200 ease-in-out hover:scale-[1.02]">
			<CardHeader>
				<div className="relative">
					<Button
						size="icon"
						variant="ghost"
						onClick={() => setIsFavorite(!isFavorite)}
						className="absolute right-2 top-2"
					>
						<Heart
							strokeWidth={3}
							className={twMerge([
								'h-6 w-6 text-primary/70',
								`${isFavorite ? 'fill-primary/70' : 'fill-none'}`,
							])}
						/>
					</Button>

					<Image
						src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
						width={320}
						height={300}
						className="h-[250px] rounded-lg object-cover"
					/>
				</div>
				<CardDescription
					className="line-clamp-2 text-lg font-semibold leading-tight text-foreground"
					title="Guarda-Roupa 6 Portas 4 Gavetas Demóbile Giardino Amendola E Nude Prime"
				>
					Mesa de escritório / Mesa simples - Cadeira simples
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4">
						<div className="flex gap-1">
							<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
							<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
							<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
							<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
							<Star className="h-4 w-4 stroke-amber-300" />
						</div>

						<span className="text-sm text-muted-foreground">(118)</span>
					</div>

					<span className="text-lg font-bold">R$ 820,00</span>
				</div>
			</CardContent>

			<CardFooter className="flex w-full flex-col gap-2">
				<Button className="w-full">
					<ShoppingCart />
					Comprar
				</Button>

				<Button variant="secondary" className="w-full">
					<ShoppingBag />
					Adicionar à sacola
				</Button>
			</CardFooter>
		</Card>
	);
}

<div className="max-w-[320px] space-y-4 rounded-lg border">
	<div>
		<h4 className="font-semibold">
			Guarda-Roupa 6 Portas 4 Gavetas Demóbile Giardino Amendola E Nude Prime
		</h4>
	</div>
</div>;
