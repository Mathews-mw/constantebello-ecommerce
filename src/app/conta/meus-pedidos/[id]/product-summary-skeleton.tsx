import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { OrderProgressSkeleton } from './order-progress.skeleton';

export function ProductSummarySkeleton() {
	return (
		<div className="col-span-2 space-y-8 rounded-lg border bg-background p-6 shadow-sm">
			<div className="flex w-full items-center justify-between">
				<div className="text-sm font-semibold">
					<div className="flex items-center gap-1">
						<h4>Pedido:</h4>
						<Skeleton className="h-3 w-[220px]" />
					</div>
					<div className="flex items-center gap-1">
						<span>Data: </span>
						<Skeleton className="h-3 w-24" />
					</div>
				</div>

				<Skeleton className="h-4 w-28" />
			</div>

			<Separator />

			{Array.from([1, 2]).map((_, i) => {
				return (
					<div key={i} className="flex w-full justify-between">
						<div className="flex gap-3">
							<Skeleton className="h-[65px] w-[65px]" />

							<div className="flex flex-col gap-2">
								<Skeleton className="h-3 w-96" />
								<Skeleton className="h-3 w-32" />
							</div>
						</div>

						<Skeleton className="h-4 w-28" />
					</div>
				);
			})}

			<Separator />

			<div className="flex w-full justify-end gap-4">
				<Button variant="secondary" disabled>
					Ajuda com o pedido
				</Button>
				<Button variant="outline" disabled>
					Rastreio detalhado
				</Button>
			</div>

			<OrderProgressSkeleton />
		</div>
	);
}
