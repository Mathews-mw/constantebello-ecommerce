import { Logo } from '../logo';
import { Separator } from '../ui/separator';
import { AtSign, Facebook, Instagram, Phone, Twitter } from 'lucide-react';

export function FooterDesktopContent() {
	return (
		<div className="mx-auto hidden w-full max-w-screen-2xl space-y-4 px-20 py-4 lg:block">
			<div className="flex justify-between">
				<div className="max-w-[248px] space-y-4">
					<Logo />

					<p className="text-sm text-muted-foreground">
						Nós Temos os móveis ideais para o seu ambiente e teremos orgulho de produzi-lo para você.
					</p>

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
				</div>

				<div className="space-y-4">
					<span className="font-semibold">Empresa</span>

					<ul className="space-y-2 text-sm text-muted-foreground">
						<li>Sobre</li>
						<li>A Costante Bello</li>
						<li>Trabalhos</li>
					</ul>
				</div>

				<div className="space-y-4">
					<span className="font-semibold">Ajuda</span>

					<ul className="space-y-2 text-sm text-muted-foreground">
						<li>Suporte ao cliente</li>
						<li>Detalhes de entrega</li>
						<li>Termos e condições</li>
						<li>Políticas de privacidade</li>
					</ul>
				</div>

				<div className="space-y-4">
					<span className="font-semibold">FAQ</span>

					<ul className="space-y-2 text-sm text-muted-foreground">
						<li>Conta</li>
						<li>Pedidos</li>
						<li>Entregas</li>
						<li>Pagamentos</li>
					</ul>
				</div>

				<div className="space-y-4">
					<span className="font-semibold">Contato</span>

					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Phone className="h-4 w-4" />
						<span>(92) 9 8888-7777</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<AtSign className="h-4 w-4" />
						<span>costante@bello.com.br</span>
					</div>
				</div>
			</div>

			<Separator />

			<div>
				<p className="text-center text-sm text-muted-foreground">
					Costante Bello © {new Date().getFullYear()}. Todos os direitos reservados
				</p>
			</div>
		</div>
	);
}
