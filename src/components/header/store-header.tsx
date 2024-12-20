import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { NavLink } from '@/components/nav-link/nav-link';
import { NavIconsLink } from '../nav-link/nav-icons-link';
import { HeaderUserAccount } from './components/header-user-account';

export function StoreHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
			<div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-20 py-2.5">
				<Logo />

				<div className="flex items-center gap-4">
					<NavLink />

					<Separator orientation="vertical" className="h-8" />

					<NavIconsLink />

					<Separator orientation="vertical" className="h-8" />

					<HeaderUserAccount />
				</div>
			</div>
		</header>
	);
}
