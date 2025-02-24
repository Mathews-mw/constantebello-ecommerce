import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export function BrowseByCategorySection() {
	return (
		<>
			<DesktopContent />

			<MobileContent />
		</>
	);
}

function DesktopContent() {
	return (
		<div className="hidden space-y-4 rounded-lg bg-secondary px-5 lg:block lg:px-0">
			<h1 className="mb-4 text-center text-2xl font-bold">PROCURE POR CATEGORIA</h1>

			<div className="grid grid-cols-3 gap-4">
				<Link
					href="/produtos?orderBy=relevance&departments=QUARTO"
					className={twMerge([
						'relative h-[290px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]",
					])}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Quarto
					</h4>
				</Link>

				<Link
					href="/produtos?orderBy=relevance&departments=SALA"
					className={twMerge([
						'relative col-span-2 h-[290px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://plus.unsplash.com/premium_photo-1661964193692-061c64679d41?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]",
					])}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Sala
					</h4>
				</Link>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<Link
					href="/produtos?orderBy=relevance&departments=COZINHA"
					className={twMerge(
						'relative col-span-2 h-[290px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://img.freepik.com/fotos-gratis/vista-de-uma-cozinha-verde-lindamente-decorada_23-2150165535.jpg?t=st=1734137049~exp=1734140649~hmac=d2e0c953240081cee19ef914c48b5f8e62f3aca7bcdb8b6776e2781d29f0adc8&w=1380')]"
					)}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Cozinha
					</h4>
				</Link>

				<Link
					href="/produtos?orderBy=relevance&departments=ESCRITORIO"
					className={twMerge([
						'relative h-[290px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://img.freepik.com/fotos-gratis/mesa-minimalista-moderna-brilhante_23-2148238601.jpg?t=st=1734137200~exp=1734140800~hmac=6e124114024ce7ab89e8f1d7aae85b8a49c242edfc6da1b0cdc9a8a36c936279&w=740')]",
					])}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Escritório
					</h4>
				</Link>
			</div>
		</div>
	);
}

function MobileContent() {
	return (
		<div className="space-y-4 rounded-lg bg-secondary px-5 lg:hidden lg:px-0">
			<h1 className="mb-4 text-center text-2xl font-bold">PROCURE POR CATEGORIA</h1>

			<div className="flex flex-col gap-2">
				<Link
					href="/produtos?orderBy=relevance&departments=QUARTO"
					className={twMerge([
						'relative h-[120px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]",
					])}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Quarto
					</h4>
				</Link>

				<Link
					href="/produtos?orderBy=relevance&departments=SALA"
					className={twMerge([
						'relative h-[120px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://plus.unsplash.com/premium_photo-1661964193692-061c64679d41?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]",
					])}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Sala
					</h4>
				</Link>

				<Link
					href="/produtos?orderBy=relevance&departments=COZINHA"
					className={twMerge(
						'relative h-[120px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://img.freepik.com/fotos-gratis/vista-de-uma-cozinha-verde-lindamente-decorada_23-2150165535.jpg?t=st=1734137049~exp=1734140649~hmac=d2e0c953240081cee19ef914c48b5f8e62f3aca7bcdb8b6776e2781d29f0adc8&w=1380')]"
					)}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Cozinha
					</h4>
				</Link>

				<Link
					href="/produtos?orderBy=relevance&departments=ESCRITORIO"
					className={twMerge([
						'relative h-[120px] rounded-lg bg-cover bg-center duration-200 ease-in-out hover:scale-[1.02]',
						"bg-[url('https://img.freepik.com/fotos-gratis/mesa-minimalista-moderna-brilhante_23-2148238601.jpg?t=st=1734137200~exp=1734140800~hmac=6e124114024ce7ab89e8f1d7aae85b8a49c242edfc6da1b0cdc9a8a36c936279&w=740')]",
					])}
				>
					<h4 className="absolute left-5 top-5 rounded-lg bg-zinc-900/35 p-2 text-2xl font-semibold text-background">
						Escritório
					</h4>
				</Link>
			</div>
		</div>
	);
}
