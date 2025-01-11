import { Skeleton } from '@/components/ui/skeleton';

export function BillingInfoCardSkeleton() {
	return (
		<div className="space-y-2">
			<h4 className="text-lg font-bold">Informações de cobrança</h4>

			<div className="space-y-2.5">
				<div className="flex items-center justify-between">
					<span className="font-bold text-muted-foreground">Nome</span>
					<Skeleton className="h-4 w-[240px]" />
				</div>
				<div className="flex justify-between">
					<span className="font-bold text-muted-foreground">Endereço</span>
					<Skeleton className="h-4 w-[340px]" />
				</div>
				<div className="flex justify-between">
					<span className="font-bold text-muted-foreground">Telefone</span>
					<Skeleton className="h-4 w-[200px]" />
				</div>
				<div className="flex justify-between">
					<span className="font-bold text-muted-foreground">E-mail</span>
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		</div>
	);
}
