'use client';

import { ReviewCard } from '../../components/review-card';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { NewArrivalsSection } from './new-arrivals-section';
import { BestSellingSection } from './best-selling-section';
import Link from 'next/link';
import { BrowseByCategorySection } from './browse-by-category-section';
import { TestimonialsSection } from './testimonials-section';

export default function HomePage() {
	return (
		<div>
			<div>
				<Image
					src="https://images.unsplash.com/photo-1680503397107-475907e4f3e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="hero image"
					width={5000}
					height={5000}
					className="h-[350px] w-full object-cover object-center"
				/>
			</div>

			<div className="mx-auto mb-0 mt-8 w-full flex-grow space-y-8 py-0 lg:max-w-screen-2xl lg:px-20">
				<NewArrivalsSection />

				<Separator />

				<BestSellingSection />

				<Separator />

				<BrowseByCategorySection />

				<Separator />

				<TestimonialsSection />
			</div>
		</div>
	);
}
