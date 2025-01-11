'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { use, useEffect, useMemo, useState } from 'react';

import { useCart } from '@/context/cart-context';
import { getProductDetails } from '@/app/api/@requests/products/get-product-details';

import { ProductTabs } from './product-tabs';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProductImages } from './product-images';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { StarsRating } from '@/components/stars-rating';
import { ProductImagesSkeleton } from './product-images-skeleton';

import { ChevronRight, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface IProductDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function ProductDetailsPage({ params }: IProductDetailsPageProps) {
	const { id } = use(params);

	const [quantity, setQuantity] = useState(1);
	const [selectedSizeId, setSelectedSizeId] = useState<string | undefined>();
	const [selectedProductModelId, setSelectedProductModelId] = useState<string | undefined>();

	const { addToCart } = useCart();
	const router = useRouter();

	const { data: product } = useQuery({
		queryKey: ['product-details', id],
		queryFn: async () => getProductDetails({ id }),
	});

	function handleAddToCart() {
		if (!selectedProductModelId) {
			return toast.warning('Por favor, selecione a cor do produto.');
		}

		if (!selectedSizeId) {
			return toast.warning('Por favor, selecione o tamanho do produto');
		}

		if (product && selectedProductModelId && selectedSizeId) {
			addToCart({
				productId: product.id,
				productModelId: selectedProductModelId,
				productSizeId: selectedSizeId,
				price: product.price,
				quantity,
			});

			router.push('/carrinho');
		}
	}

	function handleSelectProductModel(productModelId: string) {
		const productModel = product?.productModels.find((item) => item.id === productModelId);

		return productModel;
	}

	const productModel = useMemo(() => {
		if (selectedProductModelId) {
			return handleSelectProductModel(selectedProductModelId);
		}
	}, [selectedProductModelId]);

	useEffect(() => {
		if (product) {
			setSelectedProductModelId(product.productModels[0]?.id);
		}
	}, [product]);

	if (!product) {
		return <div>Carregando...</div>;
	}

	return (
		<div className="space-y-8">
			<div className="flex items-center text-sm text-muted-foreground">
				<span>Home</span> <ChevronRight className="h-4 w-4" /> <span>Produtos</span>{' '}
				<ChevronRight className="h-4 w-4" /> <span className="font-semibold text-primary">Detalhes</span>
			</div>

			<div className="flex flex-col gap-8 sm:grid sm:grid-cols-2">
				{productModel ? <ProductImages productImages={productModel.productImages} /> : <ProductImagesSkeleton />}

				<div className="space-y-4">
					<div className="flex flex-col gap-2">
						<h2 className="text-xl font-black">{product.name}</h2>

						<StarsRating />

						<div className="flex gap-2">
							<span className="text-xl font-bold">
								{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
							</span>
							<span className="text-xl text-muted-foreground line-through">R$ 989,00</span>

							<div className="rounded-full bg-emerald-200/70 px-3">
								<span className="text-sm text-emerald-500">-18%</span>
							</div>
						</div>

						<div>
							<small className="text-muted-foreground">Cod.: {productModel?.cod}</small>
						</div>

						<p className="font-light text-muted-foreground">{product.description}</p>
					</div>

					<Separator />

					<div className="space-y-4">
						<h4 className="text-muted-foreground">Escolha a cor</h4>

						<div className="space-x-2">
							{product.productModels.map((item) => {
								return (
									<button
										key={item.id}
										title={item.color}
										onClick={() => setSelectedProductModelId(item.id)}
										data-selected={item.id === selectedProductModelId}
										style={{ backgroundColor: item.hexColor }}
										className="h-6 w-6 rounded-full border data-[selected=true]:border-2 data-[selected=true]:border-primary"
									>
										<span aria-readonly className="sr-only">
											{item.color}
										</span>
									</button>
								);
							})}
						</div>
					</div>

					<Separator />

					<div className="space-y-4">
						<h4 className="text-muted-foreground">Escolha o tamanho</h4>

						<div className="flex flex-wrap gap-2">
							{productModel ? (
								productModel.productSizes.map((size) => {
									return (
										<Button
											variant="outline"
											size="sm"
											key={size.id}
											onClick={() => setSelectedSizeId(size.id)}
											data-selected={size.id === selectedSizeId}
											className="data-[selected=true]:border-primary data-[selected=true]:bg-secondary"
										>
											{size.width}L x {size.height}H x {size.length}C
										</Button>
									);
								})
							) : (
								<div className="flex gap-2">
									<Skeleton className="h-5 w-20" />
									<Skeleton className="h-5 w-20" />
									<Skeleton className="h-5 w-20" />
								</div>
							)}
						</div>

						<div className="flex flex-col">
							<small className="text-muted-foreground">*Medidas em Centímetros</small>
							<small className="text-muted-foreground">*L: Largura; H: Altura; C: Comprimento</small>
						</div>
					</div>

					<Separator />

					<div className="flex w-full items-end gap-4">
						<div className="space-y-1">
							<Label className="text-sm text-muted-foreground">Quantidade</Label>

							<div className="flex items-center gap-2 rounded-lg border bg-secondary px-4 py-1">
								<Button
									variant="ghost"
									size="xs"
									disabled={quantity <= 1}
									onClick={() => setQuantity((prev) => prev - 1)}
								>
									<Minus className="h-5 w-5" />
								</Button>

								<div>
									<span>{quantity}</span>
								</div>

								<Button variant="ghost" size="xs" onClick={() => setQuantity((prev) => prev + 1)}>
									<Plus className="h-5 w-5" />
								</Button>
							</div>
						</div>

						<Button className="w-full" onClick={handleAddToCart}>
							Adicionar ao carrinho
						</Button>
					</div>
				</div>
			</div>

			<Separator />

			{productModel ? (
				<ProductTabs
					model={productModel}
					size={productModel.productSizes.find((item) => item.id === selectedSizeId) ?? productModel.productSizes[0]}
				/>
			) : (
				<div>Carregando informações...</div>
			)}
		</div>
	);
}
