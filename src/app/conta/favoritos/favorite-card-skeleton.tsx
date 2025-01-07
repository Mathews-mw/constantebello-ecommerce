import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function FavoriteCardSkeleton() {
	return (
		<div className="flex w-full flex-col justify-between gap-8 rounded-lg border bg-background p-4 shadow-sm lg:flex-row">
			<div className="flex flex-grow gap-8">
				<Skeleton className="h-[100px] w-[100px] rounded-lg md:h-[140px] md:w-[140px]" />

				<div className="space-y-4">
					<Skeleton className="h-5 w-36 lg:w-96" />
					<Skeleton className="h-3 w-36" />
				</div>
			</div>

			<div className="flex flex-col items-center justify-between gap-2">
				<div className="flex w-full items-center justify-between gap-2">
					<span className="text-nowrap text-lg font-black">
						<Skeleton className="h-5 w-36" />
					</span>
				</div>

				<Button className="w-full" disabled>
					Comprar
				</Button>
			</div>
		</div>
	);
}
