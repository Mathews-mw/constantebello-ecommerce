'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ReviewCard } from './review-card';
import { PaymentSummary } from './payment-summary';
import { ProductSummary } from './product-summary';
import { PaymentSummarySkeleton } from './payment-summary-skeleton';
import { ProductSummarySkeleton } from './product-summary-skeleton';
import { getOrderDetailsById } from '../../../api/@requests/orders/get-order-details-by-id';

import { PackageSearch } from 'lucide-react';

interface IOrderDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function OrderDetailsPage({ params }: IOrderDetailsPageProps) {
	const { id } = use(params);

	const { data: order, isFetching } = useQuery({
		queryKey: ['order-details', id],
		queryFn: async () => getOrderDetailsById({ orderId: id }),
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2">
				<PackageSearch className="text-primary" />
				<h1 className="text-xl font-black">Detalhes do pedido</h1>
			</div>

			<div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
				{order ? <ProductSummary order={order} /> : <ProductSummarySkeleton />}

				{order ? (
					<div className="space-y-4">
						<PaymentSummary order={order} />
						<ReviewCard disabled={order.status !== 'COMPLETED'} />
					</div>
				) : (
					<div className="space-y-4">
						<PaymentSummarySkeleton />
						<ReviewCard isLoading={isFetching} />
					</div>
				)}
			</div>
		</div>
	);
}
