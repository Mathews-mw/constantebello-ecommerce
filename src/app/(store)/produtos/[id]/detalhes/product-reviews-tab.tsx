import { ReviewCard } from '@/components/review-card';
import { Button } from '@/components/ui/button';

export function ProductReviewsTab() {
	return (
		<div className="space-y-8">
			<h4 className="text-xl font-bold">Avaliações e reviews</h4>

			<div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
			</div>

			<div className="flex w-full items-center justify-center">
				<Button variant="outline">Carregar mais reviews</Button>
			</div>
		</div>
	);
}
