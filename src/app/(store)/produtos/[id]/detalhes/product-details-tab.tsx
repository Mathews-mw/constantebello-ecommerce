import { Drill, MoveDiagonal, Weight } from 'lucide-react';

export function ProductDetailsTab() {
	return (
		<div className="space-y-8">
			<h4 className="text-xl font-bold">Características do Produto</h4>

			<div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<MoveDiagonal className="h-5 w-5 text-muted-foreground" />

					<span>Largura: </span>
					<strong>180 cm</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<MoveDiagonal className="h-5 w-5 text-muted-foreground" />

					<span>Comprimento: </span>
					<strong>70 cm</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<MoveDiagonal className="h-5 w-5 text-muted-foreground" />

					<span>Profundidade: </span>
					<strong>70 cm</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<MoveDiagonal className="h-5 w-5 text-muted-foreground" />

					<span>Altura: </span>
					<strong>75 cm</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<Weight className="h-5 w-5 text-muted-foreground" />

					<span>Capacidade em peso: </span>
					<strong>200 kg</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<Drill className="h-5 w-5 text-muted-foreground" />

					<span>Requer montagem: </span>
					<strong>Não</strong>
				</div>
			</div>

			<div>
				<p className="text-justify">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia numquam minima neque dolorem rerum laudantium
					libero autem distinctio, eveniet tempore in, et corrupti eos possimus magnam laborum quae vel voluptas! Lorem
					ipsum dolor sit amet consectetur adipisicing elit. Distinctio, commodi eum sapiente doloremque voluptate
					laudantium non quae? Fugiat, mollitia molestias incidunt velit beatae totam aut eos. Quas voluptas quasi unde.
				</p>
			</div>
		</div>
	);
}
