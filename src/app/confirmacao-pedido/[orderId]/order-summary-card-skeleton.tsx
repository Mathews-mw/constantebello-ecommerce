import { Skeleton } from '../../../components/ui/skeleton';
import { Separator } from '../../../components/ui/separator';

import { FileSearch } from 'lucide-react';

export function OrderSummaryCardSkeleton() {
	return (
		<div className="space-y-4 rounded-lg border bg-background p-6">
			<div className="flex items-center gap-2">
				<FileSearch className="text-primary" />
				<h4 className="font-black">Resumo do seu pedido</h4>
			</div>

			<Separator />

			<div className="flex w-full justify-between">
				<div className="flex flex-col gap-1">
					<span className="text-xs text-muted-foreground">Data</span>
					<Skeleton className="h-3 w-28" />
				</div>

				<Separator orientation="vertical" className="h-8" />

				<div className="flex flex-col gap-1">
					<span className="text-xs text-muted-foreground">ID do Pedido</span>
					<Skeleton className="h-3 w-56" />
				</div>

				<Separator orientation="vertical" className="h-8" />
				<div className="flex flex-col gap-1">
					<span className="text-xs text-muted-foreground">Método de pagamento</span>
					<Skeleton className="h-3 w-36" />
				</div>
			</div>

			<Separator />

			<ul className="space-y-4">
				{Array.from([1, 2, 3]).map((_, i) => {
					return (
						<li className="flex w-full justify-between gap-2" key={i}>
							<div className="flex gap-4">
								<Skeleton className="h-[80px] w-[80px]" />

								<div className="flex flex-col gap-1">
									<Skeleton className="h-3 w-56" />
									<Skeleton className="h-2 w-20" />
									<Skeleton className="h-2 w-24" />
									<Skeleton className="h-2 w-28" />
								</div>
							</div>

							<div>
								<span className="text-nowrap text-sm font-bold">
									<Skeleton className="h-4 w-32" />
								</span>
							</div>
						</li>
					);
				})}
			</ul>

			<Separator />

			<div className="space-y-2 text-xs">
				<div className="flex w-full justify-between font-bold text-muted-foreground">
					<span>Subtotal</span>
					<Skeleton className="h-3 w-32" />
				</div>
				<div className="flex w-full justify-between font-bold text-muted-foreground">
					<span>Descontos</span>
					<Skeleton className="h-3 w-32" />
				</div>
				<div className="flex w-full justify-between font-bold text-muted-foreground">
					<span>Entrega</span>
					<Skeleton className="h-3 w-32" />
				</div>
			</div>

			<Separator />

			<div className="flex w-full justify-between font-bold">
				<span>Total do pedido</span>
				<Skeleton className="h-5 w-44" />
			</div>
		</div>
	);
}
