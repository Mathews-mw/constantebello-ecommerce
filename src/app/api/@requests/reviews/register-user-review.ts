import { api } from '@/lib/axios';

interface IRequest {
	userId: string;
	productId: string;
	orderItemId: string;
	score: number;
	reviewTitle: string;
	reviewText: string;
	anonymous?: boolean;
}

export interface IResponse {
	message: string;
}

export async function registerUserReview({
	userId,
	productId,
	orderItemId,
	score,
	reviewTitle,
	reviewText,
	anonymous,
}: IRequest): Promise<IResponse> {
	const { data } = await api.post(`/reviews/register-user-review`, {
		user_id: userId,
		product_id: productId,
		order_item_id: orderItemId,
		score,
		review_title: reviewTitle,
		review_text: reviewText,
		anonymous,
	});

	return data;
}
