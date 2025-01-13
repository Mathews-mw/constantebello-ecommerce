'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCart } from '@/context/cart-context';
import { createCart } from '@/app/api/@requests/orders/create-cart';
import { errorToasterHandler } from '../../utils/error-toaster-handler';
import { saveCartItems } from '@/app/api/@requests/orders/save-cart-items';
import { getCartByUserId } from '@/app/api/@requests/orders/get-cart-by-user-id';
import { listingProductsToSetupCheckout } from '@/app/api/@requests/products/listing-products-to-setup-checkout';

import { CartItem } from './cart-item';
import { LoginAlert } from './login-alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/page-title';
import { Separator } from '@/components/ui/separator';
import { GeneratingOrderAlert } from './generating-order-alert';
import { editCart } from '@/app/api/@requests/orders/edit-cart';
import { CompleteRegisterAlert } from './complete-register-alert';
import { getUserById } from '@/app/api/@requests/users/get-user-by-id';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AddNewAddressDialog } from '@/components/add-new-address-dialog';

import {
	ArrowRight,
	ChevronRight,
	CircleCheckBig,
	FileSearch,
	Loader2,
	ShoppingBasket,
	ShoppingCart,
	Tag,
	Trash2,
	Truck,
} from 'lucide-react';
import { validateCoupon } from '@/app/api/@requests/coupons/validate-coupon';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { SigInDialogContent } from '@/components/sigin/sigin-dialog-content';

export default function CartPage() {
	const { status, data } = useSession();
	const { items: cartItems, clearCart } = useCart();

	const router = useRouter();
	const queryClient = useQueryClient();

	const [isOpen, setIsOpen] = useState(false);
	const [isOpenLogin, setIsOpenLogin] = useState(false);
	const [completeRegisterIsOpen, setCompleteRegisterIsOpen] = useState(false);
	const [productSizesIds, setProductSizesIds] = useState<string[]>([]);
	const [selectedAddress, setSelectedAddress] = useState('');
	const [couponSlugValue, setCouponSlugValue] = useState('');
	const [discount, setDiscount] = useState(0);
	const [validCouponId, setValidCouponID] = useState<string | undefined>(undefined);

	const { data: products } = useQuery({
		queryKey: ['products', 'to-checkout', productSizesIds],
		queryFn: async () =>
			listingProductsToSetupCheckout({
				productSizesIds,
			}),
		enabled: productSizesIds.length > 0,
	});

	const { data: user } = useQuery({
		queryKey: ['user', data?.user.id],
		queryFn: async () => getUserById({ id: data ? data.user.id : '' }),
		enabled: !!data && status === 'authenticated',
	});

	const subtotal = products
		? products.reduce((acc, product) => {
				const quantity = cartItems.find((item) => item.productId === product.id)?.quantity ?? 1;

				return (acc += product.price * quantity);
			}, 0)
		: 0;

	const { mutateAsync: validateCouponFn, isPending: validateCouponIsPending } = useMutation({
		mutationFn: validateCoupon,
	});

	const { mutateAsync: generatingOrderFn, isPending } = useMutation({
		mutationFn: async () => {
			if (data && products) {
				const currentCart = await getCartByUserId({ userId: data.user.id });

				const itemsToBePurchased = cartItems.map((item) => {
					return {
						product_id: item.productId,
						product_model_id: item.productModelId,
						product_size_id: item.productSizeId,
						price: item.price,
						quantity: item.quantity,
					};
				});

				if (currentCart) {
					// Case exista algum carrinho já criado (currentCart) para o usuário, apenas atualiza os itens desse carrinho
					await editCart({ cartId: currentCart.id, deliveryIn: selectedAddress, discount, couponId: validCouponId });
					await saveCartItems({ user_id: data.user.id, cartId: currentCart.id, cart_items: itemsToBePurchased });
				} else {
					// Se não, cria um novo carrinho e adiciona os itens nele
					const { cart } = await createCart({
						userId: data.user.id,
						deliveryIn: selectedAddress,
						discount,
						couponId: validCouponId,
					});
					await saveCartItems({ user_id: data.user.id, cartId: cart.id, cart_items: itemsToBePurchased });
				}
			}
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['user-cart', 'delivery-address'] });
		},
	});

	async function handleValidateCoupon() {
		if (status !== 'authenticated') {
			return toast.warning('Por favor, faça o login para aplicar cupons!', { duration: 1000 * 10 });
		}

		try {
			const { is_valid, message, coupon } = await validateCouponFn({
				slug: couponSlugValue.trim(),
				userId: data.user.id,
			});

			if (!is_valid) {
				setValidCouponID(undefined);
				return toast.warning(message);
			}

			if (is_valid) {
				if (coupon.discountType === 'PERCENTAGE') {
					const discount = subtotal * (coupon.discount / 100);

					setDiscount(discount);
				} else {
					setDiscount(coupon.discount);
				}

				setValidCouponID(coupon.id);
				return toast.success(`O desconto do cupom "${coupon.slug}" foi aplicado com sucesso`);
			}
		} catch (error) {
			setValidCouponID(undefined);
			errorToasterHandler(error);
		}
	}

	async function handleGenerateOrder() {
		if (!user?.userInfos) {
			return setCompleteRegisterIsOpen(true);
		}

		if (!selectedAddress) {
			return toast.warning('Por favor, selecione o endereço de entrega');
		}

		setIsOpen(true);

		try {
			await generatingOrderFn();

			setIsOpen(false);
			router.push('/pagamento');
		} catch (error) {
			setIsOpen(false);
			errorToasterHandler(error);
		}
	}

	useEffect(() => {
		const productsSizesId = cartItems.map((item) => item.productSizeId);

		setProductSizesIds(productsSizesId);
	}, [cartItems]);

	useEffect(() => {
		if (user) {
			const mainAddress = user.userInfos?.userAddress.find((address) => address.isMainAddress);
			setSelectedAddress(mainAddress?.id ?? '');
		}
	}, [user]);

	return (
		<>
			<div className="space-y-8">
				<div className="flex items-center text-sm text-muted-foreground">
					<span>Home</span> <ChevronRight className="h-4 w-4" />{' '}
					<span className="font-semibold text-primary">Carrinho</span>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-3 items-center justify-between">
						<div className="col-span-2 flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
							<PageTitle title="SEU CARRINHO" />

							<div className="">
								<Button
									variant="ghost"
									onClick={clearCart}
									disabled={cartItems.length <= 0}
									className="border-destructive text-destructive hover:text-rose-600"
								>
									<Trash2 /> Remover todos os produtos
								</Button>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
						<div className="col-span-2 h-min space-y-4 rounded-xl border bg-background p-4 shadow-sm">
							<div className="flex items-center gap-2">
								<ShoppingBasket className="text-primary" />
								<h3 className="text-lg font-bold">Produtos</h3>
							</div>

							{cartItems.length > 0 ? (
								<ul role="list" className="divide-y">
									{products?.map((product) => {
										return (
											<li key={product.size.id} className="py-4 first:pt-0 last:pb-0">
												<CartItem
													product={product}
													quantity={
														cartItems.find(
															(item) =>
																item.productModelId === product.model.id && item.productSizeId === product.size.id
														)?.quantity ?? 1
													}
												/>
											</li>
										);
									})}
								</ul>
							) : (
								<div className="flex flex-col items-center justify-center">
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
						</div>

						<div className="space-y-4">
							<div className="h-min space-y-8 rounded-xl border bg-background p-4 shadow-sm">
								<div className="flex items-center gap-2">
									<FileSearch className="text-primary" />
									<h3 className="text-lg font-bold">Resumo do pedido</h3>
								</div>

								<div className="space-y-4">
									<div className="flex w-full justify-between">
										<span className="text-muted-foreground">Subtotal</span>
										<span className="font-bold">
											{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
										</span>
									</div>
									<div className="flex w-full justify-between">
										<span className="text-muted-foreground">Descontos</span>
										<span className="font-bold">
											{(discount * -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
										</span>
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

								<div className="flex items-center gap-4">
									<div className="flex h-10 w-full max-w-[420px] items-center gap-2 rounded-lg border bg-secondary px-2 has-[:focus]:ring-1 has-[:focus]:ring-primary">
										<input
											placeholder="Cupom promocional"
											disabled={cartItems.length <= 0}
											value={couponSlugValue}
											onChange={(e) => setCouponSlugValue(e.target.value)}
											className="w-full bg-transparent text-sm outline-none ring-0"
										/>
										<Tag className="h-5 w-5 text-muted-foreground" />
									</div>

									{validCouponId ? (
										<div className="flex h-9 w-[78px] items-center justify-center">
											<CircleCheckBig className="h-6 w-6 text-emerald-500" />
										</div>
									) : (
										<Button
											variant="outline"
											disabled={cartItems.length <= 0 || validateCouponIsPending}
											onClick={handleValidateCoupon}
										>
											Aplicar
											{validateCouponIsPending && <Loader2 className="animate-spin" />}
										</Button>
									)}
								</div>
							</div>

							<div className="h-min space-y-4 rounded-xl border bg-background p-4 shadow-sm">
								<div className="flex w-full items-center justify-between">
									<div className="flex items-center gap-2">
										<Truck className="text-primary" />
										<h3 className="text-lg font-bold">Entrega</h3>
									</div>

									{!!user && <AddNewAddressDialog userId={user.id} />}
								</div>

								{user?.userInfos?.userAddress.length === 0 ? (
									<p className="text-muted-foreground">
										Você ainda não tem nenhum endereço cadastrado. Por favor, cadastre um endereço para entregar o seu
										pedido.
									</p>
								) : (
									<p className="text-muted-foreground">Selecione o endereço que será feito a entrega do produto</p>
								)}

								{user && (
									<div>
										<RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
											{user?.userInfos?.userAddress.map((address) => {
												return (
													<div className="flex items-center space-x-2" key={address.id}>
														<RadioGroupItem value={address.id} id={address.id} className="hidden" />
														<label
															htmlFor={address.id}
															data-selected={selectedAddress === address.id}
															className={twMerge([
																'w-full cursor-pointer rounded border border-l-4 p-2 text-muted-foreground',
																'data-[selected=true]:border-emerald-500 data-[selected=true]:bg-emerald-50 data-[selected=true]:text-foreground',
															])}
														>
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
														</label>
													</div>
												);
											})}
										</RadioGroup>
									</div>
								)}
							</div>

							<div className="space-y-4 rounded-xl border bg-background p-4 shadow-sm">
								{status === 'authenticated' ? (
									<Button className="w-full" disabled={cartItems.length <= 0} onClick={handleGenerateOrder}>
										Continuar
										<ArrowRight className="h-6 w-6" />
									</Button>
								) : (
									<Dialog modal open={isOpenLogin} onOpenChange={setIsOpenLogin}>
										<DialogTrigger asChild>
											<Button variant="secondary" className="w-full" disabled={cartItems.length <= 0}>
												Continuar
												<ArrowRight className="h-6 w-6" />
											</Button>
										</DialogTrigger>

										<SigInDialogContent onOpen={setIsOpen} />
									</Dialog>
								)}

								<Button variant="outline" className="w-full" onClick={() => router.push('/produtos')}>
									Continuar comprando
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<GeneratingOrderAlert isOpen={isOpen} />
			<CompleteRegisterAlert isOpen={completeRegisterIsOpen} onOpen={setCompleteRegisterIsOpen} />
		</>
	);
}
