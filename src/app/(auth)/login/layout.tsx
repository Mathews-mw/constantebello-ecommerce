import Image from 'next/image';
import { ReactNode } from 'react';

export default async function SessionLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-screen grid-cols-2 text-slate-600 antialiased">
			<div className="relative flex h-full flex-col justify-between border-r border-foreground/5 p-10">
				<div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-rose-400 opacity-15" />
				<Image
					src="https://images.unsplash.com/photo-1627226325480-f46163bc38c2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					width={3020}
					height={3020}
					className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
				/>
				<div className="flex items-center gap-3 text-lg text-foreground">
					<div className="flex items-baseline gap-0.5">
						<span className="text-lg font-bold text-white">COSTANTE</span>
						<span className="text-lg font-bold text-primary">BELLO</span>
					</div>
				</div>

				<footer className="text-sm text-muted">&copy; Costate Bello - {new Date().getFullYear()}</footer>
			</div>

			<div className="relative flex flex-col items-center justify-center">{children}</div>
		</div>
	);
}
