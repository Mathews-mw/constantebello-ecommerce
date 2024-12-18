'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { NavIconItem } from './nav-icon-item';
import { useCart } from '@/context/cart-context';

export function NavIconsLink() {
	const { items } = useCart();

	return (
		<nav className="flex gap-2">
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
