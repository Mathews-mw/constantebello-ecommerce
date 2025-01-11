'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useCallback, useState } from 'react';

import { ProductImage } from '@prisma/client';
import { Button } from '../../../../../components/ui/button';
import { type CarouselApi } from '../../../../../components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem } from '../../../../../components/ui/carousel';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IProps {
	productImages: ProductImage[];
}

export function ProductImages({ productImages }: IProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [selectedScrollSnap, setSelectedScrollSnap] = useState(0);

	const mainImage = productImages.find((item) => item.mainImage) ?? productImages[0];
	const secondaryImages = productImages.filter((item) => !item.mainImage);

	const images = [mainImage, ...secondaryImages];

	const onPrevButtonClick = useCallback(() => {
		if (!api) return;

		api.scrollPrev();
		setSelectedScrollSnap(api.selectedScrollSnap());
	}, [api]);

	const onNextButtonClick = useCallback(() => {
		if (!api) return;

		api.scrollNext();
		setSelectedScrollSnap(api.selectedScrollSnap());
	}, [api]);

	const onSelectScrollSnap = useCallback(
		(index: number) => {
			if (!api) return;

			api.scrollTo(index);
			setSelectedScrollSnap(index);
		},
		[api]
	);

	return (
		<div className="space-y-2.5">
			<Carousel className="w-ful" setApi={setApi} opts={{ loop: true }}>
				<CarouselContent>
					{images.map((image) => (
						<CarouselItem key={image.id}>
							<div>
								<Image
									src={image.imageUrl}
									alt=""
									width={1020}
									height={1020}
									className="h-[290px] rounded-lg object-cover sm:h-[530px]"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<div className="flex w-full items-center justify-between">
				<div className="flex gap-4">
					<Button variant="outline" onClick={onPrevButtonClick} className="h-8 w-8 rounded-full">
						<ChevronLeft />
					</Button>
					<Button variant="outline" onClick={onNextButtonClick} className="h-8 w-8 rounded-full">
						<ChevronRight />
					</Button>
				</div>

				<div className="space-x-2">
					{api?.scrollSnapList().map((_, index) => {
						return (
							<button
								key={index}
								data-selected={selectedScrollSnap === index}
								onClick={() => onSelectScrollSnap(index)}
								className={twMerge([
									'm-0 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-muted-foreground/50 bg-transparent p-0',
									'data-[selected=true]:border-primary data-[selected=true]:bg-primary/50',
								])}
							></button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
