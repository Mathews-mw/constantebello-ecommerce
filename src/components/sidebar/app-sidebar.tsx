'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Logo } from '../logo';
import { Label } from '../ui/label';
import { NavItem } from './nav-item';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UserAccount } from './user-account';
import { ScrollArea } from '../ui/scroll-area';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

import { ChevronDown, PanelLeft } from 'lucide-react';
import { useUserNotifications } from '../../context/user-notifications-context';
import { useFavoriteProducts } from '../../context/favorite-products-context';

export function AppSidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isCollapsible, setIsCollapsible] = useState(true);

	const { status } = useSession();
	const { favoriteProducts } = useFavoriteProducts();
	const { amountUserNotifications } = useUserNotifications();

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost">
					<PanelLeft className="h-6 w-6 text-primary" />
				</Button>
			</SheetTrigger>

			<SheetContent side="left" className="max-h-screen w-[300px] lg:w-[500px]">
				<div className="relative flex h-full flex-col">
					<SheetHeader>
						<div className="flex flex-col items-start justify-start gap-2">
							<VisuallyHidden>
								<SheetTitle>Costante Bello</SheetTitle>
							</VisuallyHidden>

							<Logo />

							{status === 'unauthenticated' && (
								<Link href="/login" className="font-semibold text-primary hover:underline">
									Olá, acesse sua conta
								</Link>
							)}
						</div>
					</SheetHeader>

					<div className="my-4">
						<Separator />
					</div>

					<ScrollArea className="h-sidebarContent">
						<div className="space-y-4">
							<nav className="flex flex-col gap-1">
								<Label className="mb-2 text-xs font-semibold text-muted-foreground">Loja</Label>
								<NavItem title="Home" href="/" onSelectItem={() => setIsOpen(!isOpen)} />
								<NavItem title="Produtos" href="/produtos" onSelectItem={() => setIsOpen(!isOpen)} />
								<NavItem title="Carrinho" href="/carrinho" onSelectItem={() => setIsOpen(!isOpen)} />
							</nav>

							{status === 'authenticated' && (
								<div className="group/collapsible" data-state={isCollapsible ? 'open' : 'close'}>
									<div className="flex w-full items-center justify-between">
										<Label className="mb-2 text-xs font-semibold text-muted-foreground">Sua Conta</Label>
										<Button variant="ghost" size="xs" onClick={() => setIsCollapsible(!isCollapsible)}>
											<ChevronDown className="ml-auto h-6 w-6 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
										</Button>
									</div>

									<div
										className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
											isCollapsible ? 'max-h-screen animate-in fade-in-0' : 'max-h-0 animate-out fade-out-0'
										}`}
									>
										<nav className="flex flex-col gap-1">
											<NavItem title="Meus dados" href="/conta/meus-dados" onSelectItem={() => setIsOpen(!isOpen)} />
											<NavItem
												title="Meus Pedidos"
												href="/conta/meus-pedidos"
												onSelectItem={() => setIsOpen(!isOpen)}
											/>
											<NavItem title="Avaliações" href="/conta/avaliacoes" onSelectItem={() => setIsOpen(!isOpen)} />
											<NavItem
												title="Favoritos"
												href="/conta/favoritos"
												badge={favoriteProducts.length > 0 ? favoriteProducts.length : undefined}
												onSelectItem={() => setIsOpen(!isOpen)}
											/>
											<NavItem
												title="Notificações"
												href="/conta/notificacoes"
												badge={amountUserNotifications > 0 ? amountUserNotifications : undefined}
												onSelectItem={() => setIsOpen(!isOpen)}
											/>
											<NavItem title="Protocolos de atendimento" href="/#" onSelectItem={() => setIsOpen(!isOpen)} />
										</nav>
									</div>
								</div>
							)}
						</div>
					</ScrollArea>

					{status === 'authenticated' && <UserAccount />}
				</div>
			</SheetContent>
		</Sheet>
	);
}
