'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { useCart } from '@/context/cart-context';
import { listingProductsToSetupCheckout } from '@/app/api/@requests/products/listing-products-to-setup-checkout';

import { CartItem } from './cart-item';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/page-title';
import { Separator } from '@/components/ui/separator';

import { ArrowRight, ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';
import { LoginAlert } from './login-alert';

export default function CartPage() {
	const { status } = useSession();
	const { items, clearCart } = useCart();

	const [productsId, setProductsId] = useState<string[]>([]);

	const { data: products } = useQuery({
		queryKey: ['products', 'to-checkout', productsId],
		queryFn: async () =>
			listingProductsToSetupCheckout({
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
				<div className="grid grid-cols-3 items-center justify-between">
					<div className="col-span-2 flex w-full items-center justify-between">
						<PageTitle title="SEU CARRINHO" />
						<Button
							variant="outline"
							onClick={clearCart}
							disabled={items.length <= 0}
							className="border-destructive text-destructive hover:text-rose-600"
						>
							<Trash2 /> Remover todos os produtos
						</Button>
					</div>
				</div>

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
							{status === 'authenticated' ? (
								<Button asChild className="w-full" disabled={items.length <= 0}>
									<Link href="/checkout">
										Ir para o Checkout
										<ArrowRight className="h-6 w-6" />
									</Link>
								</Button>
							) : (
								<LoginAlert disabled={items.length <= 0} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
