import { ProductSize } from '@prisma/client';
import { IProductInfos } from '@/@types/product';
import { Drill, MoveDiagonal, MoveHorizontal, MoveVertical, Weight } from 'lucide-react';

interface IProps {
	details: IProductInfos;
	size: ProductSize;
}

export function ProductDetailsTab({ details, size }: IProps) {
	return (
		<div className="space-y-8">
			<h4 className="text-xl font-bold">Características do Produto</h4>

			<div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<MoveHorizontal className="h-5 w-5 text-muted-foreground" />

					<span>Largura: </span>
					<strong>{size.width} cm</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<MoveVertical className="h-5 w-5 text-muted-foreground" />

					<span>Altura: </span>
					<strong>{size.height} cm</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<MoveDiagonal className="h-5 w-5 text-muted-foreground" />

					<span>Comprimento: </span>
					<strong>{size.length} cm</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<Weight className="h-5 w-5 text-muted-foreground" />

					<span>Peso do produto: </span>
					<strong>{size.weight} kg</strong>
				</div>

				<div className="flex w-fit items-center gap-2 rounded-lg bg-secondary p-2">
					<Drill className="h-5 w-5 text-muted-foreground" />

					<span>Requer montagem: </span>
					<strong>{details.requiresAssembly ? 'Sim' : 'Não'}</strong>
				</div>
			</div>

			<div className="space-y-4">
				{details.details && (
					<div className="space-y-1">
						<span className="font-semibold">Detalhes</span>
						<p className="text-justify">{details.details}</p>
					</div>
				)}

				{details.specifications && (
					<div className="space-y-1">
						<span className="font-semibold">Especificações</span>
						<p className="text-justify">{details.specifications}</p>
					</div>
				)}
			</div>
		</div>
	);
}
