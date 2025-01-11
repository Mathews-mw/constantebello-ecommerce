'use client';

import { useSession } from 'next-auth/react';

import { NavIconItem } from './nav-icon-item';
import { useCart } from '../../context/cart-context';
import { useFavoriteProducts } from '../../context/favorite-products-context';

import { Bell, Heart, Home, ShoppingCart } from 'lucide-react';
import { useUserNotifications } from '../../context/user-notifications-context';

interface INavIconsLink {
	showHome?: boolean;
}

export function NavIconsLink({ showHome }: INavIconsLink) {
	const { items } = useCart();
	const { status } = useSession();
	const { favoriteProducts } = useFavoriteProducts();
	const { amountUserNotifications } = useUserNotifications();

	return (
		<nav className="flex gap-2">
			{showHome && (
				<div>
					<NavIconItem icon={Home} href="/" />
				</div>
			)}

			<div className="relative">
				{items.length > 0 && (
					<div className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
						<span className="text-xs text-white">{items.length}</span>
					</div>
				)}
				<NavIconItem icon={ShoppingCart} href="/carrinho" />
			</div>

			{status === 'authenticated' && (
				<div className="relative hidden lg:block">
					{favoriteProducts.length > 0 && (
						<div className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
							<span className="text-xs text-white">{favoriteProducts.length}</span>
						</div>
					)}
					<NavIconItem icon={Heart} href="/conta/favoritos" />
				</div>
			)}

			{status === 'authenticated' && (
				<div className="relative hidden lg:block">
					{amountUserNotifications > 0 && (
						<div className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
							<span className="text-xs text-white">{amountUserNotifications}</span>
						</div>
					)}
					<NavIconItem icon={Bell} href="/conta/notificacoes" />
				</div>
			)}
		</nav>
	);
}
