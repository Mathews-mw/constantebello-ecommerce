import { api } from '../../../../lib/axios';
import { IProductToUserReview } from '../../../../@types/review';

interface IRequest {
	userId: string;
}

export async function listingProductsToUserReview({ userId }: IRequest): Promise<IProductToUserReview[]> {
	const { data } = await api.get(`/reviews/user/${userId}/listing-products-to-user-review`);

	return data;
}
