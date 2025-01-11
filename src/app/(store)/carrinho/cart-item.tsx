'use client';

import Image from 'next/image';

import { IProductToSetupCheckout } from '@/@types/product';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';

import { Minus, Plus, Trash2 } from 'lucide-react';

interface ICartItemProps {
	product: IProductToSetupCheckout;
	quantity: number;
}

export function CartItem({ product, quantity }: ICartItemProps) {
	const { removeFromCart, addToCart, decrementProductFromCart, items } = useCart();

	const productCart = items.find((item) => item.productSizeId === product.size.id);

	return (
		<div className="flex gap-4">
			<Image
				src={product.mainImageUrl}
				alt=""
				width={1020}
				height={1020}
				className="h-24 w-24 rounded-lg object-cover lg:h-[124px] lg:w-[124px]"
			/>

			<div className="flex w-full flex-col justify-between lg:flex-row">
				<div className="flex w-full flex-col justify-between">
					<div className="space-y-0.5">
						<h4 title={product.name} className="line-clamp-1 font-semibold lg:text-lg">
							{product.name}
						</h4>

						<div className="text-sm">
							<span>Tamanho: </span>
							<span className="text-muted-foreground">
								{product.size.width}L X {product.size.height}H X {product.size.length}C
							</span>
						</div>

						<div className="text-sm">
							<span>Cor: </span>
							<span className="text-muted-foreground">{product.model.color}</span>
						</div>
					</div>

					<span className="text-sm font-semibold lg:text-base lg:font-black">
						{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
					</span>
				</div>

				<div className="flex flex-col items-end justify-between">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => removeFromCart({ productModelId: product.model.id, productSizeId: product.size.id })}
					>
						<Trash2 className="h-5 w-5 text-rose-500" />
					</Button>

					<div className="flex items-center gap-2 rounded-lg border px-2 py-1">
						<Button
							variant="ghost"
							size="xs"
							onClick={() =>
								decrementProductFromCart({ productModelId: product.model.id, productSizeId: product.size.id })
							}
							disabled={!productCart || productCart.quantity <= 1}
						>
							<Minus className="h-5 w-5" />
						</Button>

						<div>
							<span className="font-mono text-sm">{quantity}</span>
						</div>

						<Button
							variant="ghost"
							size="xs"
							onClick={() =>
								addToCart({
									productId: product.id,
									productModelId: product.model.id,
									productSizeId: product.size.id,
									price: product.price,
								})
							}
						>
							<Plus className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
