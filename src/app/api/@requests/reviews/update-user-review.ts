import { api } from '../../../../lib/axios';

interface IRequest {
	reviewId: string;
	score: number;
	reviewTitle: string;
	reviewText: string;
	anonymous?: boolean;
}

export interface IResponse {
	message: string;
}

export async function updateUserReview({
	reviewId,
	score,
	reviewTitle,
	reviewText,
	anonymous,
}: IRequest): Promise<IResponse> {
	const { data } = await api.put(`/reviews/${reviewId}/update-user-review`, {
		score,
		review_title: reviewTitle,
		review_text: reviewText,
		anonymous,
	});

	return data;
}
