import { ThumbsUp } from '@phosphor-icons/react/dist/ssr';
import { ReviewItemCard } from './review-item-card';

export default function ReviewPage() {
	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<ThumbsUp className="fill-primary text-black" weight="fill" size={24} />
					<h1 className="text-xl font-black">Avaliações</h1>
				</div>

				<p className="text-muted-foreground">
					Você pode avaliar e opinar sobre os produtos que comprou. Isso vai ajudar muito a outras pessoas que tiverem
					interesse nos mesmo produtos que você já comprou.
				</p>
			</div>

			<div className="space-y-4">
				<ReviewItemCard />
				<ReviewItemCard />
				<ReviewItemCard />
			</div>
		</div>
	);
}
