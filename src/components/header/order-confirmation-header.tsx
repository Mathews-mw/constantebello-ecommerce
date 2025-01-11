import { Logo } from '../logo';
import { HeaderUserAccount } from './components/header-user-account';

export function OrderConfirmationHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
			<div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-20 py-2.5">
				<Logo />

				<div className="flex items-center gap-4">
					<HeaderUserAccount />
				</div>
			</div>
		</header>
	);
}
