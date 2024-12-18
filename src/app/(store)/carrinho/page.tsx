'use client';

import { useQuery } from '@tanstack/react-query';

import { CartItem } from './cart-item';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { listingToSetupCheckout } from '@/app/api/@requests/products/listing-to-setup-checkout';

import { ArrowRight, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
	const { items } = useCart();

	const [productsId, setProductsId] = useState<string[]>([]);

	const { data: products } = useQuery({
		queryKey: ['products', 'to-checkout', productsId],
		queryFn: async () =>
			listingToSetupCheckout({
				productIds: productsId,
			}),
		enabled: productsId.length > 0,
	});

	const subtotal = products
		? products.reduce((acc, product) => {
				const quantity = items.find((item) => item.productId === product.id)?.quantity ?? 1;

				return (acc += product.price * quantity);
			}, 0)
		: 0;

	useEffect(() => {
		const productsId = items.map((item) => item.productId);

		setProductsId(productsId);
	}, [items]);

	return (
		<div className="space-y-8">
			<div className="flex items-center text-sm text-muted-foreground">
				<span>Home</span> <ChevronRight className="h-4 w-4" />{' '}
				<span className="font-semibold text-primary">Carrinho</span>
			</div>

			<div className="space-y-4">
				<h1 className="text-2xl font-black">SEU CARRINHO</h1>

				<div className="grid grid-cols-3 gap-6">
					{items.length > 0 ? (
						<ul
							role="list"
							className="col-span-2 h-min divide-y rounded-xl border p-4 shadow-sm"
						>
							{products?.map((product) => {
								return (
									<li key={product.id} className="py-4 first:pt-0 last:pb-0">
										<CartItem
											product={product}
											quantity={
												items.find((item) => item.productId === product.id)?.quantity ?? 1
											}
										/>
									</li>
								);
							})}
						</ul>
					) : (
						<div className="col-span-2 flex flex-col items-center justify-center rounded-xl border p-4 shadow-sm">
							<div className="flex w-full flex-col items-center">
								<span className="text-xl font-bold">Seu carrinho está vazio...</span>
								<span className="text-sm">Que tal adicionar alguns produtos?</span>
							</div>
							<Image
								src="/empty-cart.png"
								width={1020}
								height={1020}
								alt="Carrinho vazio ilustração"
								className="h-60 w-60"
							/>

							<Button asChild>
								<Link href="/produtos">
									<ShoppingCart />
									Continuar comprando
								</Link>
							</Button>
						</div>
					)}

					<div className="h-min space-y-8 rounded-xl border p-4 shadow-sm">
						<h3 className="text-lg font-bold">Resumo do pedido</h3>

						<div className="space-y-4">
							<div className="flex w-full justify-between">
								<span className="text-muted-foreground">Subtotal</span>
								<span className="font-bold">
									{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
								</span>
							</div>
							<div className="flex w-full justify-between">
								<span className="text-muted-foreground">Descontos</span>
								<span className="font-bold">0,00</span>
							</div>
							<div className="flex w-full justify-between">
								<span className="text-muted-foreground">Entrega</span>
								<span className="font-bold">0,00</span>
							</div>

							<Separator />

							<div className="flex w-full justify-between">
								<span className="text-muted-foreground">Total</span>
								<span className="font-bold">
									{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
								</span>
							</div>
						</div>

						<div className="flex gap-4">
							<Input placeholder="Código promocional" disabled={items.length <= 0} />
							<Button variant="outline" disabled={items.length <= 0}>
								Aplicar
							</Button>
						</div>

						<div className="w-full">
							<Button className="w-full" disabled={items.length <= 0}>
								Ir para o Checkout
								<ArrowRight className="h-6 w-6" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
