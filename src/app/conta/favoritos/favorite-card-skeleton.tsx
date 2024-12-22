import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function FavoriteCardSkeleton() {
	return (
		<div className="flex w-full justify-between gap-8 rounded-lg border bg-background p-4 shadow-sm">
			<div className="flex flex-grow gap-8">
				<Skeleton className="h-[140px] w-[140px] rounded-lg" />

				<div className="space-y-4">
					<Skeleton className="h-8 w-96" />
					<Skeleton className="h-6 w-36" />
				</div>
			</div>

			<div className="flex flex-col items-center justify-between border-l-2 pl-8">
				<div className="flex w-full items-center justify-between gap-2">
					<span className="text-nowrap text-lg font-black">
						<Skeleton className="h-6 w-36" />
					</span>
				</div>

				<Button className="w-full" disabled>
					Comprar
				</Button>
			</div>
		</div>
	);
}
