'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { generateUserBadge } from '@/app/utils/generate-user-badge';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
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

import { Bell, Heart, LogOut, MessagesSquare, Package, ThumbsUp, User } from 'lucide-react';

export function AccountMenu() {
	const { data, status } = useSession();
	const router = useRouter();

	const userName = data?.user?.name ?? 'Nao informado';

	const { initials } = generateUserBadge(userName);

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="hover:cursor-pointer">
						{data && data.user && data.user.image && <AvatarImage src={data.user.image} />}
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuLabel className="flex flex-col">
						{status === 'loading' ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span className="text-xs text-muted-foreground">{data?.user?.name}</span>
								<span className="text-xs text-muted-foreground">{data?.user?.email}</span>
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<button className="w-full" onClick={() => router.push('/conta/meus-dados')}>
								<User className="mr-2 h-4 w-4" />
								<span>Meus dados</span>
							</button>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<button className="w-full" onClick={() => router.push('/conta/meus-pedidos')}>
								<Package className="mr-2 h-4 w-4" />
								<span>Meus pedidos</span>
							</button>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<button className="w-full">
								<ThumbsUp className="mr-2 h-4 w-4" />
								<span>Avaliações</span>
							</button>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<button className="w-full" onClick={() => router.push('/conta/favoritos')}>
								<Heart className="mr-2 h-4 w-4" />
								<span>Favoritos</span>
							</button>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<button className="w-full">
								<Bell className="mr-2 h-4 w-4" />
								<span>Notificações</span>
							</button>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<button className="w-full">
								<MessagesSquare className="mr-2 h-4 w-4" />
								<span>Protocolos de atendimentos</span>
							</button>
						</DropdownMenuItem>
					</DropdownMenuGroup>

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
						<DialogClose>Não</DialogClose>
						<Button onClick={() => signOut({ callbackUrl: '/' })}>Sair</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
