import { Separator } from '../ui/separator';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function FooterMobileContent() {
	return (
		<div className="mx-auto w-full space-y-4 px-20 py-4 lg:hidden">
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="space-x-3">
					<button className="rounded-full border bg-background p-2 shadow-sm hover:bg-secondary">
						<Twitter className="h-4 w-4" />
					</button>

					<button className="rounded-full border bg-background p-2 shadow-sm hover:bg-secondary">
						<Facebook className="h-4 w-4" />
					</button>

					<button className="rounded-full border bg-background p-2 shadow-sm hover:bg-secondary">
						<Instagram className="h-4 w-4" />
					</button>
				</div>

				<Separator />

				<div>
					<p className="text-center text-sm text-muted-foreground">
						Costante Bello © {new Date().getFullYear()}. Todos os direitos reservados
					</p>
				</div>
			</div>
		</div>
	);
}
