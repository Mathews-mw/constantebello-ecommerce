import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { ArrowLeft, ThumbsUp } from 'lucide-react';

interface IProps {
	isLoading?: boolean;
}

export function ReviewCard({ isLoading }: IProps) {
	const router = useRouter();

	return (
		<div className="flex h-min flex-col gap-2.5 rounded-lg border bg-background p-6 shadow-sm">
			<Button disabled={isLoading}>
				<ThumbsUp />
				Avaliar produto(s)
			</Button>
			<Button variant="outline" onClick={() => router.back()}>
				<ArrowLeft />
				Voltar aos seus pedidos
			</Button>
		</div>
	);
}
