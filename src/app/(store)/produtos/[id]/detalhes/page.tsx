import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Minus, Plus, Star } from 'lucide-react';
import Image from 'next/image';

interface IProductDetailsPageProps {
	params: {
		id: string;
	};
}

export default function ProductDetailsPage({ params }: IProductDetailsPageProps) {
	console.log('product id: ', params.id);

	return (
		<div className="space-y-8">
			<div className="flex items-center text-sm text-muted-foreground">
				<span>Home</span> <ChevronRight className="h-4 w-4" /> <span>Produtos</span>{' '}
				<ChevronRight className="h-4 w-4" />{' '}
				<span className="font-semibold text-primary">Detalhes</span>
			</div>

			<div className="flex gap-8">
				<div className="flex gap-4">
					<div className="flex flex-col justify-between">
						<Image
							src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt=""
							width={320}
							height={300}
							className="h-[167px] rounded-lg object-cover"
						/>
						<Image
							src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt=""
							width={320}
							height={300}
							className="h-[167px] rounded-lg object-cover"
						/>
						<Image
							src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt=""
							width={320}
							height={300}
							className="h-[167px] rounded-lg object-cover"
						/>
					</div>

					<Image
						src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
						width={1020}
						height={1020}
						className="h-[530px] rounded-lg object-cover"
					/>
				</div>

				<div className="space-y-4">
					<div className="flex flex-col gap-2">
						<h2 className="text-2xl font-black">
							MESA DE ESCRITÓRIO / MESA SIMPLES - CADEIRA SIMPLES
						</h2>

						<div className="flex items-center gap-4">
							<div className="flex gap-1">
								<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
								<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
								<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
								<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
								<Star className="h-4 w-4 stroke-amber-300" />
							</div>

							<span className="text-sm text-muted-foreground">(118)</span>
						</div>

						<div className="flex gap-2">
							<span className="text-xl font-bold">R$ 820,00</span>
							<span className="text-xl text-muted-foreground line-through">R$ 989,00</span>

							<div className="rounded-full bg-emerald-200/70 px-3">
								<span className="text-sm text-emerald-500">-18%</span>
							</div>
						</div>

						<p className="font-light text-muted-foreground">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quis architecto eius,
							veniam velit atque tempore mollitia ut quod numquam praesentium, voluptatum saepe
							ipsum illum, consectetur ea nihil expedita voluptate.
						</p>
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
								<Button variant="ghost" size="xs">
									<Minus className="h-5 w-5" />
								</Button>

								<div>
									<span>1</span>
								</div>

								<Button variant="ghost" size="xs">
									<Plus className="h-5 w-5" />
								</Button>
							</div>
						</div>

						<Button className="w-full">Adicionar ao carrinho</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
