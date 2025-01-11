import { useRouter } from 'next/navigation';

import { Button } from '../../../../components/ui/button';

import { ArrowLeft, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

interface IProps {
	isLoading?: boolean;
	disabled?: boolean;
}

export function ReviewCard({ isLoading, disabled }: IProps) {
	const router = useRouter();

	return (
		<div className="flex h-min flex-col gap-2.5 rounded-lg border bg-background p-6 shadow-sm">
			<Button disabled={isLoading || disabled} className="w-full">
				<Link href="/conta/avaliacoes" className="flex w-full items-center justify-center gap-2">
					<ThumbsUp />
					Avaliar produto(s)
				</Link>
			</Button>
			<Button variant="outline" onClick={() => router.back()}>
				<ArrowLeft />
				Voltar aos seus pedidos
			</Button>
		</div>
	);
}
