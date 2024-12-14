import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { AccountMenu } from '@/components/account-menu';
import { NavLink } from '@/components/nav-link/nav-link';

import { Heart, ShoppingCart } from 'lucide-react';

export function StoreHeader() {
	return (
		<header className="border shadow-sm">
			<div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-20 py-4">
				<Logo />

				<div className="flex items-center gap-4">
					<NavLink />

					<Separator orientation="vertical" className="h-8" />

					<nav className="flex gap-4">
						<ShoppingCart className="h-5 w-5" />
						<Heart className="h-5 w-5" />
					</nav>

					<Separator orientation="vertical" className="h-8" />

					<AccountMenu />
				</div>
			</div>
		</header>
	);
}
