import dayjs from 'dayjs';

import { ProductReview } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { StarsRatingView } from '@/components/rating/stars-rating-view';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Eye } from 'lucide-react';

interface IProps {
	review: ProductReview;
}

export function ViewReviewDialog({ review }: IProps) {
	const createdDateFormatted = dayjs(review.createdAt).format('DD/MM/YYYY');
	const publishedAt = dayjs(review.createdAt).fromNow();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					<Eye />
					Visualizar
				</Button>
			</DialogTrigger>
			<DialogContent className="md:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{review.reviewTitle}</DialogTitle>
					<StarsRatingView score={review.score} iconsSize={15} showAverage />
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<p>{review.reviewText}</p>
				</div>

				<DialogFooter>
					<time title={createdDateFormatted} className="text-sm text-muted-foreground">
						Publicado {publishedAt}
					</time>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
