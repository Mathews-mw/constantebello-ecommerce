import { Star } from 'lucide-react';

export function StarsRating() {
	return (
		<div className="flex items-center gap-4">
			<div className="flex gap-1">
				<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
				<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
				<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
				<Star className="h-4 w-4 fill-amber-300 stroke-amber-300" />
				<Star className="h-4 w-4 stroke-amber-300" />
			</div>

			<span className="text-sm text-muted-foreground">(118)</span>
		</div>
	);
}
