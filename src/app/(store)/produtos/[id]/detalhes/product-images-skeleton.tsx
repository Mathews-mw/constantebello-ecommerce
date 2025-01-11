import { twMerge } from 'tailwind-merge';

import { Button } from '../../../../../components/ui/button';
import { Skeleton } from '../../../../../components/ui/skeleton';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductImagesSkeleton() {
	return (
		<div className="space-y-2.5">
			<Skeleton className="h-[290px] w-full rounded-lg sm:h-[530px]" />

			<div className="flex w-full items-center justify-between">
				<div className="flex gap-4">
					<Button variant="outline" disabled className="h-8 w-8 rounded-full">
						<ChevronLeft />
					</Button>
					<Button variant="outline" disabled className="h-8 w-8 rounded-full">
						<ChevronRight />
					</Button>
				</div>

				<div className="space-x-2">
					{Array.from([1, 2, 3, 4]).map((_, index) => {
						return (
							<button
								key={index}
								className={twMerge([
									'm-0 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-muted-foreground/50 bg-transparent p-0',
								])}
							></button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
