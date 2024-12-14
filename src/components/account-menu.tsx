import { twMerge } from 'tailwind-merge';

import { LogOut } from 'lucide-react';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from './ui/dialog';
import { generateUserBadge } from '@/app/utils/generate-user-badge';
import { Avatar, AvatarFallback } from './ui/avatar';

export function AccountMenu() {
	const isFetchingEmployeeData = false;

	const userName = 'Mathews Araújo';

	const { initials, color } = generateUserBadge(userName);
	console.log('color: ', color);

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="hover:cursor-pointer">
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isFetchingEmployeeData ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span className="text-xs text-muted-foreground">Mathews</span>
								<span className="text-xs text-muted-foreground">mathews.mw@gmail.com</span>
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
							<button className="w-full">
								<LogOut className="mr-2 h-4 w-4" />
								<span>Sair</span>
							</button>
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Deseja sair?</DialogTitle>
					<DialogDescription>Você deseja realmente sair da aplicação?</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<div className="flex items-center justify-end gap-4">
						<DialogClose>Cancel</DialogClose>
						<Button onClick={() => {}}>Continue</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
