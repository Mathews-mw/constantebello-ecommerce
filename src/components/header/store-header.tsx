import { Logo } from '../logo';
import { Separator } from '../ui/separator';
import { NavLink } from '../nav-link/nav-link';
import { NavIconsLink } from '../nav-link/nav-icons-link';
import { HeaderUserAccount } from './components/header-user-account';
import { SearchProductFilter } from './components/search-products-filter';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { AppSidebar } from '../sidebar/app-sidebar';

export function StoreHeader() {
	return (
		<header className="fixed top-0 z-50 w-full border-b bg-background shadow-sm lg:sticky">
			<div className="mx-auto flex w-full items-center justify-between gap-4 px-2 py-2.5 lg:max-w-screen-2xl lg:gap-0 lg:px-20">
				<div>
					<div className="lg:hidden">
						<AppSidebar />
					</div>
					<div className="hidden lg:block">
						<Logo />
					</div>
				</div>

				<Suspense fallback={<Loader2 className="animate-spin" />}>
					<SearchProductFilter />
				</Suspense>

				<div className="flex items-center gap-4">
					<NavLink />

					<Separator orientation="vertical" className="hidden h-8 lg:block" />

					<NavIconsLink />

					<Separator orientation="vertical" className="hidden h-8 lg:block" />

					<div className="hidden lg:block">
						<HeaderUserAccount />
					</div>
				</div>
			</div>
		</header>
	);
}
