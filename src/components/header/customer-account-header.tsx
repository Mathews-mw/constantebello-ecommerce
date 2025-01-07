import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { NavIconsLink } from '../nav-link/nav-icons-link';
import { HeaderUserAccount } from './components/header-user-account';
import { AppSidebar } from '../sidebar/app-sidebar';

export function CustomerAccountHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
			<div className="mx-auto flex w-full items-center justify-between gap-4 px-2 py-2.5 lg:max-w-screen-2xl lg:gap-0 lg:px-20">
				<div>
					<div className="lg:hidden">
						<AppSidebar />
					</div>
					<div className="hidden lg:block">
						<Logo />
					</div>
				</div>

				<div className="flex items-center gap-4">
					<NavIconsLink showHome />

					<Separator orientation="vertical" className="hidden h-8 lg:block" />

					<div className="hidden lg:block">
						<HeaderUserAccount />
					</div>
				</div>
			</div>
		</header>
	);
}
