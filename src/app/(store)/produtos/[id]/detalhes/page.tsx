'use client';

import Image from 'next/image';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useCart } from '@/context/cart-context';
import { getProductDetails } from '@/app/api/@requests/products/get-product-details';

import { ProductTabs } from './product-tabs';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StarsRating } from '@/components/stars-rating';

import { ChevronRight, Minus, Plus } from 'lucide-react';

interface IProductDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function ProductDetailsPage({ params }: IProductDetailsPageProps) {
	const { id } = use(params);

	const [quantity, setQuantity] = useState(1);

	const { addToCart } = useCart();
	const router = useRouter();

	const { data: product } = useQuery({
		queryKey: ['product-details', id],
		queryFn: async () => getProductDetails({ id }),
	});

	function handleAddToCart() {
		if (product) {
			addToCart(product.id, quantity);

			router.push('/carrinho');
		}
	}

	if (!product) {
		return <div>Carregando...</div>;
	}

	return (
		<div className="space-y-8">
			<div className="flex items-center text-sm text-muted-foreground">
				<span>Home</span> <ChevronRight className="h-4 w-4" /> <span>Produtos</span>{' '}
				<ChevronRight className="h-4 w-4" /> <span className="font-semibold text-primary">Detalhes</span>
			</div>

			<div className="flex gap-8">
				<div className="flex gap-4">
					<div className="flex flex-col justify-between">
						<Image
							priority
							src={product.imageUrl}
							alt=""
							width={320}
							height={300}
							className="h-[167px] rounded-lg object-cover"
						/>
						<Image
							priority
							src={product.imageUrl}
							alt=""
							width={320}
							height={300}
							className="h-[167px] rounded-lg object-cover"
						/>
						<Image
							priority
							src={product.imageUrl}
							alt=""
							width={320}
							height={300}
							className="h-[167px] rounded-lg object-cover"
						/>
					</div>

					<Image
						priority
						quality={100}
						src={product.imageUrl}
						alt=""
						width={1020}
						height={1020}
						className="h-[530px] rounded-lg object-cover"
					/>
				</div>

				<div className="space-y-4">
					<div className="flex flex-col gap-2">
						<h2 className="text-2xl font-black">{product.name}</h2>

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

						<p className="font-light text-muted-foreground">{product.description}</p>
					</div>

					<Separator />

					<div className="space-y-4">
						<h4 className="text-muted-foreground">Escolha a cor</h4>

						<div className="space-x-2">
							<button className="h-6 w-6 rounded-full bg-amber-800">
								<span aria-readonly className="sr-only">
									Zinc
								</span>
							</button>
							<button className="h-6 w-6 rounded-full bg-stone-800">
								<span aria-readonly className="sr-only">
									Stone
								</span>
							</button>
							<button className="h-6 w-6 rounded-full bg-slate-800">
								<span aria-readonly className="sr-only">
									Slate
								</span>
							</button>
						</div>
					</div>

					<Separator />

					<div className="space-y-4">
						<h4 className="text-muted-foreground">Escolha o tamanho</h4>

						<div className="space-x-2">
							<button className="rounded-lg border border-secondary bg-secondary px-4 py-1 hover:border-primary/50">
								165L X 90C
							</button>
							<button className="rounded-lg border border-secondary bg-secondary px-4 py-1 hover:border-primary/50">
								190L X 90C
							</button>
							<button className="rounded-lg border border-secondary bg-secondary px-4 py-1 hover:border-primary/50">
								175L X 90C
							</button>
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

			<ProductTabs />
		</div>
	);
}
