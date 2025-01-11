import { useSession } from 'next-auth/react';

import { generateUserBadge } from '../../app/utils/generate-user-badge';

import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { LogoutAlertDialog } from '../logout-alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Loader2 } from 'lucide-react';

export function UserAccount() {
	const { data, status } = useSession();

	const userName = data?.user?.name ?? 'Nao informado';

	const { initials } = generateUserBadge(userName);

	return (
		<div className="absolute bottom-0 left-0 w-full">
			<div className="my-2">
				<Separator />
			</div>

			<LogoutAlertDialog />

			<div className="my-2">
				<Separator />
			</div>

			<div className="flex w-full items-center gap-2 py-2">
				<Avatar className="hover:cursor-pointer">
					{data && data.user && data.user.image && <AvatarImage src={data.user.image} />}
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>

				{status === 'loading' ? (
					<div className="space-y-1.5">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-3 w-24" />
					</div>
				) : (
					<div className="flex flex-col">
						<span className="text-xs text-muted-foreground">{data?.user?.name}</span>
						<span className="text-xs text-muted-foreground">{data?.user?.email}</span>
					</div>
				)}
			</div>
		</div>
	);
}
