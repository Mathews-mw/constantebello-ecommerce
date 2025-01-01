'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { ReviewItemCard } from './review-item-card';
import { listingProductsToUserReview } from '@/app/api/@requests/reviews/listing-products-to-user-review';

import { ThumbsUp } from '@phosphor-icons/react/dist/ssr';

export default function ReviewPage() {
	const { data, status } = useSession();

	const { data: userOrders } = useQuery({
		queryKey: ['user-products-review', data?.user.id],
		queryFn: async () => listingProductsToUserReview({ userId: data?.user.id ?? '' }),
		enabled: status === 'authenticated' && !!data,
	});

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
				{userOrders &&
					data &&
					userOrders.map((item) => {
						return <ReviewItemCard key={item.id} productToReview={item} userId={data.user.id} />;
					})}
			</div>
		</div>
	);
}
