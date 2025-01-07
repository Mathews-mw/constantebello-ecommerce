import { ReviewCard } from '@/components/review-card';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';

export function TestimonialsSection() {
	return (
		<>
			<DesktopContent />
			<MobileContent />
		</>
	);
}

function DesktopContent() {
	return (
		<div className="hidden space-y-8 lg:block">
			<div className="flex w-full items-center justify-between">
				<h1 className="mb-4 text-2xl font-bold">DEPOIMENTOS DE CLIENTES</h1>

				<div className="flex items-center gap-2">
					<Button size="icon" variant="secondary">
						<MoveLeft className="h-5 w-5" />
					</Button>
					<Button size="icon" variant="secondary">
						<MoveRight className="h-5 w-5" />
					</Button>
				</div>
			</div>

			<div className="flex gap-4">
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
			</div>
		</div>
	);
}

function MobileContent() {
	return (
		<div className="space-y-8 px-5 lg:hidden">
			<div className="flex w-full items-start justify-between">
				<h1 className="mb-4 text-2xl font-bold">DEPOIMENTOS DE CLIENTES</h1>

				<div className="flex items-center gap-2">
					<Button size="icon" variant="secondary">
						<MoveLeft className="h-5 w-5" />
					</Button>
					<Button size="icon" variant="secondary">
						<MoveRight className="h-5 w-5" />
					</Button>
				</div>
			</div>

			<div className="flex gap-4">
				<ReviewCard />
			</div>
		</div>
	);
}
