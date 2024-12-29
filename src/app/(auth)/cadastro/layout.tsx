import { ReactNode } from 'react';

import { Logo } from '@/components/logo';
import { SigInDialog } from '@/components/sigin-dialog';
import { StoreFooter } from '@/components/footer/store-footer';

export default function SignUpLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col font-sans">
			<header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
				<div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-20 py-2.5">
					<Logo />
				</div>
			</header>

			<main className="mx-auto mb-0 mt-8 w-full max-w-screen-lg flex-grow px-20 py-0">{children}</main>

			<StoreFooter />
		</div>
	);
}
