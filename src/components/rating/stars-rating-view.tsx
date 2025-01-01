import { Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface IStarsRatingView {
	totalStars?: number;
	score: number;
	showAverage?: boolean;
	iconsSize?: number;
}

export function StarsRatingView({ totalStars = 5, score, showAverage, iconsSize = 20 }: IStarsRatingView) {
	return (
		<div className="relative inline-flex gap-1 text-left text-primary">
			{[...new Array(totalStars)].map((_, index) => {
				const activeState = score;

				const showEmptyIcon = activeState === -1 || activeState < index + 1;

				const isActiveRating = activeState !== 1;
				const isRatingWithPrecision = activeState % 1 !== 0;
				const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
				const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

				return (
					<div key={index} title={showAverage ? `Média: ${score}` : undefined} className="relative">
						<div
							style={{ width: `${showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%'}` }}
							className="absolute hidden"
						>
							<Star size={iconsSize} className="fill-primary" />
						</div>

						<div className={twMerge(`${showEmptyIcon ? 'text-amber-400' : 'text-amber-400'}`)}>
							{showEmptyIcon ? <Star size={iconsSize} /> : <Star size={iconsSize} className="fill-amber-400" />}
						</div>
					</div>
				);
			})}
		</div>
	);
}
