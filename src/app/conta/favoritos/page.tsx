import { Heart } from 'lucide-react';
import { FavoriteList } from './favorite-list';

export default function FavoriteProductsPage() {
	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2">
				<Heart className="fill-primary text-white" strokeWidth={1} />
				<h1 className="text-xl font-black">Favoritos</h1>
			</div>

			<FavoriteList />
		</div>
	);
}
