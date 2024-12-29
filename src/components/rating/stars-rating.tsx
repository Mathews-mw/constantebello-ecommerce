import { MouseEvent, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Star } from 'lucide-react';

interface IStarsRatingProps {
	precision?: number;
	totalStars?: number;
	defaultValue?: number;
	onRatingStars?: (value: number) => void;
}

export function StarsRating({ precision = 1, totalStars = 5, defaultValue, onRatingStars }: IStarsRatingProps) {
	const [activeStar, setActiveStar] = useState(defaultValue || -1);
	const [isHovered, setIsHovered] = useState(false);
	const [hoverActiveStar, setHoverActiveStar] = useState(-1);

	const ratingContainerRef = useRef<HTMLDivElement>(null!);

	const calculateRating = (e: MouseEvent<HTMLDivElement>) => {
		const { width, left } = ratingContainerRef.current.getBoundingClientRect();
		let percent = (e.clientX - left) / width;
		const numberInStars = percent * totalStars;
		const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

		return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0));
	};

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		setIsHovered(false);

		if (onRatingStars) {
			onRatingStars(calculateRating(e));
		}

		setActiveStar(calculateRating(e));
	};

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		setIsHovered(true);
		setHoverActiveStar(calculateRating(e));
	};

	const handleMouseLeave = () => {
		setHoverActiveStar(-1); // Reset to default state
		setIsHovered(false);
	};

	return (
		<div
			onClick={handleClick}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			ref={ratingContainerRef}
			className="relative inline-flex w-min cursor-pointer gap-1 text-left"
		>
			{[...new Array(totalStars)].map((_, index) => {
				const activeState = isHovered ? hoverActiveStar : activeStar;

				const showEmptyIcon = activeState === -1 || activeState < index + 1;

				const isActiveRating = activeState !== 1;
				const isRatingWithPrecision = activeState % 1 !== 0;
				const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
				const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

				return (
					<div key={index} className="relative cursor-pointer">
						<div
							style={{ width: `${showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%'}` }}
							className="absolute hidden"
						>
							<Star size={28} className="fill-amber-400" strokeWidth={1} />
						</div>

						<div className={twMerge(`${showEmptyIcon ? 'text-amber-400' : 'text-amber-400'}`)}>
							{showEmptyIcon ? (
								<Star size={28} strokeWidth={1} />
							) : (
								<Star size={28} strokeWidth={1} className="fill-amber-400" />
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
