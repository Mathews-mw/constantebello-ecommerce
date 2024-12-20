'use client';

import { Skeleton } from './ui/skeleton';
import { StarsRating } from './stars-rating';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

import { ShoppingBag, ShoppingCart } from 'lucide-react';

export function ProductCardSkeleton() {
	return (
		<Card className="relative max-w-[320px] duration-200 ease-in-out hover:scale-[1.02]">
			<CardHeader>
				<div>
					<Skeleton className="h-[300px] w-full" />
				</div>
				<CardDescription className="line-clamp-2 text-lg font-semibold leading-tight text-foreground">
					<Skeleton className="h-6 w-full" />
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-5 w-40" />

					<span className="text-lg font-bold">
						<Skeleton className="h-8 w-32" />
					</span>
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
