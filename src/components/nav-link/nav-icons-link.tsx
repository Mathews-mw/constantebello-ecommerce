'use client';

import { NavIconItem } from './nav-icon-item';
import { useCart } from '@/context/cart-context';

import { Heart, Home, ShoppingCart } from 'lucide-react';

interface INavIconsLink {
	showHome?: boolean;
}

export function NavIconsLink({ showHome }: INavIconsLink) {
	const { items } = useCart();

	return (
		<nav className="flex gap-2">
			{showHome && <NavIconItem icon={Home} href="/" />}

			<div className="relative flex">
				{items.length > 0 && (
					<div className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
						<span className="text-xs text-white">{items.length}</span>
					</div>
				)}
				<NavIconItem icon={ShoppingCart} href="/carrinho" />
			</div>

			<NavIconItem icon={Heart} href="/favoritos" />
		</nav>
	);
}
