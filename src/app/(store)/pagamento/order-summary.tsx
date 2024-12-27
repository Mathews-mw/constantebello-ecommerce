'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { OrderPaymentType } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';

import { createOrder } from '@/app/api/@requests/orders/create-order';
import { errorToasterHandler } from '@/app/utils/error-toaster-handler';
import { getUserAddressById } from '@/app/api/@requests/users/address/get-address-by-id';
import { getCartDetailsByUserId } from '@/app/api/@requests/orders/get-cart-details-by-user-id';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { ArrowRight, FileSearch, Loader2, Truck } from 'lucide-react';
import { deleteCart } from '@/app/api/@requests/orders/delete-cart';
import { useCart } from '@/context/cart-context';

interface IOrderSummaryProps {
	paymentType?: OrderPaymentType;
}

export function OrderSummary({ paymentType }: IOrderSummaryProps) {
	const { data, status } = useSession();
	const { clearCart } = useCart();
	const router = useRouter();

	const {
		data: userCart,
		status: queryStatus,
		isFetching: isFetchingCart,
	} = useQuery({
		queryKey: ['user-cart', data?.user.id],
		queryFn: async () => getCartDetailsByUserId({ userId: data?.user.id ?? '' }),
		enabled: status === 'authenticated' && !!data,
	});

	const { data: address, isFetching: isFetchingAddress } = useQuery({
		queryKey: ['delivery-address', userCart?.deliveryIn],
		queryFn: async () => getUserAddressById({ addressId: userCart?.deliveryIn ?? '' }),
		enabled: !!userCart && queryStatus === 'success',
	});

	const totalProductsPrice = userCart
		? userCart.cartItems.reduce((acc, currentItem) => {
				return (acc += currentItem.price * currentItem.quantity);
			}, 0)
		: 0;

	const totalOrder = totalProductsPrice - 200 + 48;

	const { mutateAsync: generateOrderFn, isPending } = useMutation({
		mutationFn: createOrder,
	});

	async function handleGenerateOrder() {
		if (!paymentType) {
			return toast.error('Por favor, selecione um tipo de pagamento');
		}

		if (!userCart) {
			return toast.error('Carrinho do usuário não definido');
		}

		try {
			const { order } = await generateOrderFn({
				cartId: userCart.id,
				paymentType,
				userId: userCart.userId,
				deliveryIn: userCart.deliveryIn,
			});

			await deleteCart({ cartId: userCart.id });
			clearCart();

			toast.success(`Pagamento concluído. ID do pedido: ${order.id}`);
			router.replace(`/confirmacao-pedido/${order.id}`);
		} catch (error) {
			errorToasterHandler(error);
		}
	}

	return (
		<div className="space-y-8 rounded-lg bg-background p-6 shadow-sm">
			<div className="flex items-center gap-2">
				<FileSearch className="h-6 w-6 text-primary" />
				<h2 className="font-black">RESUMO DO PEDIDO</h2>
			</div>

			{userCart ? (
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

			{address ? (
				<div className="flex flex-col gap-2 rounded border p-2 text-muted-foreground">
					<div className="flex items-center gap-2">
						<Truck className="h-5 w-5 text-primary" />
						<span className="font-bold text-muted-foreground">Endereço de entrega</span>
					</div>
					<div className="flex flex-col gap-1 text-sm">
						<span>
							{address.street}, {address.number}
						</span>
						<div>
							{address.addressComplement && <span>{address.addressComplement} </span>}
							{address.addressReference && <span>- {address.addressReference}</span>}
						</div>
						<span>CEP: {address.cep}</span>
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
				<Button
					onClick={() => handleGenerateOrder()}
					disabled={isFetchingAddress || isFetchingCart || !paymentType || isPending}
				>
					Continuar
					{isPending ? <Loader2 className="animate-spin" /> : <ArrowRight />}
				</Button>
				<Button variant="outline" onClick={() => router.back()} disabled={isPending}>
					Voltar
				</Button>
			</div>
		</div>
	);
}
