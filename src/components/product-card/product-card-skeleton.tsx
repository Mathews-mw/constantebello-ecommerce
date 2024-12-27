'use client';

import { Skeleton } from '../ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

import { ShoppingBasket } from 'lucide-react';

export function ProductCardSkeleton() {
	return (
		<Card className="relative w-full max-w-[320px] duration-200 ease-in-out hover:scale-[1.02]">
			<CardHeader>
				<div>
					<Skeleton className="h-[260px] w-full" />
				</div>
				<CardDescription className="line-clamp-2 text-lg font-semibold leading-tight text-foreground">
					<Skeleton className="h-5 w-full" />
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-40" />

					<span className="text-lg font-bold">
						<Skeleton className="h-6 w-32" />
					</span>
				</div>
			</CardContent>

			<CardFooter className="flex w-full flex-col gap-2">
				<Button className="w-full" disabled>
					<ShoppingBasket />
					Escolher
				</Button>
			</CardFooter>
		</Card>
	);
}
