import { StoreFooter } from '@/components/footer/store-footer';
import { SigInDialog } from '@/components/header/sigin-dialog';
import { Logo } from '@/components/logo';
import { ReactNode } from 'react';

export default function SignUpLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col font-sans">
			<header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
				<div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-20 py-2.5">
					<Logo />

					<div className="flex items-center gap-4">
						<SigInDialog />
					</div>
				</div>
			</header>

			<main className="mx-auto mb-0 mt-8 w-full max-w-screen-lg flex-grow px-20 py-0">
				{children}
			</main>

			<StoreFooter />
		</div>
	);
}
