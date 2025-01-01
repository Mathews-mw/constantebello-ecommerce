'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import { IProductToUserReview } from '@/@types/review';

import { ReviewProductDialog } from './review-product-dialog';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewReviewDialog } from './view-review-dialog';
import { EditReviewDialog } from './edit-review-dialiog';

interface IProps {
	userId: string;
	productToReview: IProductToUserReview;
}

export function ReviewItemCard({ userId, productToReview }: IProps) {
	return (
		<div className="flex w-full justify-between rounded-lg border bg-background p-3 shadow-sm">
			<div className="flex gap-2">
				<Image
					src={productToReview.product.imageUrl}
					alt=""
					width={1020}
					height={1020}
					className="h-[100px] w-[100px] rounded-lg object-cover"
				/>

				<div>
					<span className="line-clamp-1 font-bold">{productToReview.product.name}</span>
					<span className="text-sm font-semibold">
						Data da compra: {dayjs(productToReview.purchaseAt).format('DD/MM/YYYY')}
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-1">
				{!productToReview.productReview ? (
					<ReviewProductDialog
						userId={userId}
						productId={productToReview.productId}
						orderItemId={productToReview.id}
						productName={productToReview.product.name}
					/>
				) : (
					<Badge variant="outline">
						<Check className="h-4 w-4 text-emerald-500" />
						Avaliado
					</Badge>
				)}

				{productToReview.productReview && <ViewReviewDialog review={productToReview.productReview} />}
				{productToReview.productReview && <EditReviewDialog review={productToReview.productReview} />}
			</div>
		</div>
	);
}
