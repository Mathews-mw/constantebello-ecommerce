import { ThumbsUp } from '@phosphor-icons/react/dist/ssr';

export default function ReviewPage() {
	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2">
				<ThumbsUp className="fill-primary text-black" weight="fill" size={24} />
				<h1 className="text-xl font-black">Avaliações</h1>
			</div>
		</div>
	);
}
