'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function NotificationContentDialogSkeleton() {
	return (
		<DialogContent className="w-full min-w-[520px]">
			<div className="pr-4">
				<DialogHeader className="mb-4 flex flex-col space-y-2 px-1">
					<div className="mb-4 flex w-full items-center justify-between">
						<div className="flex items-center gap-2">
							<Skeleton className="h-3 w-36" />
						</div>
						<Skeleton className="h-2.5 w-24" />
					</div>

					<DialogTitle>
						<Skeleton className="h-4 w-72" />
					</DialogTitle>
					<Skeleton className="h-3 w-52" />
				</DialogHeader>

				<div className="space-y-2">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-full" />
				</div>
			</div>
		</DialogContent>
	);
}
