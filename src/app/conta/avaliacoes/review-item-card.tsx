'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ReviewProductDialog } from './review-product-dialog';

export function ReviewItemCard() {
	return (
		<div className="flex w-full justify-between rounded-lg border bg-background p-3 shadow-sm">
			<div className="flex gap-2">
				<Image
					src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					width={1020}
					height={1020}
					className="h-[100px] w-[100px] rounded-lg object-cover"
				/>

				<div>
					<span className="line-clamp-1 font-bold">
						MESA DE ESCRITÓRIO / MESA SIMPLES - CADEIRA SIMPLES R$ 820,00 165L X 90C
					</span>
					<span className="font-semibold">Data da compra: 24/12/2024</span>
				</div>
			</div>

			<div>
				<ReviewProductDialog />
			</div>
		</div>
	);
}
