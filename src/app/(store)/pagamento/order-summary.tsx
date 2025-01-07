'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useCart } from '@/context/cart-context';
import { saveOrder } from '@/app/api/@requests/orders/save-order';
import { errorToasterHandler } from '@/app/utils/error-toaster-handler';
import { createCheckout } from '@/app/api/@requests/checkouts/create-checkout';
import { getUserAddressById } from '@/app/api/@requests/users/address/get-address-by-id';
import { getCartDetailsByUserId } from '@/app/api/@requests/orders/get-cart-details-by-user-id';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { ArrowRight, FileSearch, Loader2, Truck } from 'lucide-react';

export function OrderSummary() {
	const [isLoading, setIsLoading] = useState(false);

	const { data, status } = useSession();
	const { clearCart } = useCart();
	const router = useRouter();

	const { data: userCartResponse, isFetching: isFetchingCart } = useQuery({
		queryKey: ['user-cart', data?.user.id],
		queryFn: async () => {
			const userCart = await getCartDetailsByUserId({ userId: data?.user.id ?? '' });

			const address = await getUserAddressById({ addressId: userCart.deliveryIn });

			return {
				userCart,
				address,
			};
		},
		enabled: status === 'authenticated' && !!data,
		staleTime: 0,
	});

	const totalProductsPrice = userCartResponse
		? userCartResponse.userCart.cartItems.reduce((acc, currentItem) => {
				return (acc += currentItem.price * currentItem.quantity);
			}, 0)
		: 0;

	const totalOrder = totalProductsPrice - 200 + 48;

	const { mutateAsync: createCheckoutFn, isPending } = useMutation({
		mutationFn: createCheckout,
	});

	async function handleGenerateOrder() {
		setIsLoading(true);

		if (!userCartResponse?.userCart) {
			setIsLoading(false);
			return toast.error('Carrinho do usuário não definido');
		}

		try {
			const { payment_link } = await createCheckoutFn({
				cartId: userCartResponse.userCart.id,
				userId: userCartResponse.userCart.userId,
				deliveryIn: userCartResponse.userCart.deliveryIn,
			});

			await saveOrder({
				userId: userCartResponse.userCart.userId,
				cartId: userCartResponse.userCart.id,
				deliveryIn: userCartResponse.userCart.deliveryIn,
			});

			clearCart();

			router.push(payment_link);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			errorToasterHandler(error);
		}
	}

	return (
		<div className="w-full max-w-[620px] space-y-8 rounded-lg bg-background p-6 shadow-sm">
			<div className="flex items-center gap-2">
				<FileSearch className="h-6 w-6 text-primary" />
				<h2 className="font-black">RESUMO DO PEDIDO</h2>
			</div>

			{userCartResponse ? (
				<div className="divide-y">
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm text-muted-foreground">Valor dos produtos:</span>
						<span className="font-bold">
							{totalProductsPrice.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })}
						</span>
					</div>
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm text-muted-foreground">Descontos:</span>
						<span className="font-bold">- R$ 200,00</span>
					</div>
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm text-muted-foreground">Entrega:</span>
						<span className="font-bold">R$ 48,00</span>
					</div>
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm font-bold text-muted-foreground">Total:</span>
						<span className="font-bold">
							{totalOrder.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })}
						</span>
					</div>
				</div>
			) : (
				<div className="divide-y">
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm text-muted-foreground">Valor dos produtos:</span>
						<Skeleton className="h-4 w-[80px]" />
					</div>
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm text-muted-foreground">Descontos:</span>
						<Skeleton className="h-4 w-[80px]" />
					</div>
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm text-muted-foreground">Entrega:</span>
						<Skeleton className="h-4 w-[80px]" />
					</div>
					<div className="flex w-full items-center justify-between py-4 first:pt-0 last:pb-0">
						<span className="text-sm font-bold text-muted-foreground">Total:</span>
						<Skeleton className="h-5 w-[100px]" />
					</div>
				</div>
			)}

			{userCartResponse && userCartResponse.address ? (
				<div className="flex flex-col gap-2 rounded border p-2 text-muted-foreground">
					<div className="flex items-center gap-2">
						<Truck className="h-5 w-5 text-primary" />
						<span className="font-bold text-muted-foreground">Endereço de entrega</span>
					</div>
					<div className="flex flex-col gap-1 text-sm">
						<span>
							{userCartResponse.address.street}, {userCartResponse.address.number}
						</span>
						<div>
							{userCartResponse.address.addressComplement && <span>{userCartResponse.address.addressComplement} </span>}
							{userCartResponse.address.addressReference && <span>- {userCartResponse.address.addressReference}</span>}
						</div>
						<span>CEP: {userCartResponse.address.cep}</span>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2 rounded border p-2 text-muted-foreground">
					<div className="flex items-center gap-2">
						<Truck className="h-5 w-5 text-primary" />
						<span className="font-bold text-muted-foreground">Endereço de entrega</span>
					</div>
					<div className="flex flex-col gap-1 text-sm">
						<Skeleton className="h-3 w-3/4" />
						<Skeleton className="h-3 w-4/5" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			)}

			<div className="flex flex-col gap-4">
				<Button onClick={() => handleGenerateOrder()} disabled={isFetchingCart || isPending || isLoading}>
					Ir para o pagamento
					{isPending || isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
				</Button>
				<Button variant="outline" onClick={() => router.back()} disabled={isFetchingCart || isPending || isLoading}>
					Voltar
				</Button>
			</div>
		</div>
	);
}
