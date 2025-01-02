'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getOrderDetailsById } from '@/app/api/@requests/orders/get-order-details-by-id';

import { Button } from '@/components/ui/button';
import { BillingInfoCard } from './billing-info-card';
import { OrderSummaryCard } from './order-summary-card';
import { BillingInfoCardSkeleton } from './billing-info-card-skeleton';
import { OrderSummaryCardSkeleton } from './order-summary-card-skeleton';

import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/context/cart-context';

interface IPageContentProps {
	orderId: string;
}

export function PageContent({ orderId }: IPageContentProps) {
	const router = useRouter();
	const { clearCart } = useCart();

	const { data: orderDetails } = useQuery({
		queryKey: ['order-details', orderId],
		queryFn: async () => getOrderDetailsById({ orderId }),
	});

	useEffect(() => {
		clearCart();
	}, []);

	return (
		<div className="grid grid-cols-2 gap-20">
			<div className="h-min space-y-10 p-4">
				<div className="space-y-4">
					<h1 className="text-5xl font-black">Obrigado por comprar conosco!</h1>
					<p className="text-muted-foreground">
						Seu pedido será processado em 24 horas durante os dias úteis de trabalho. Nós iremos notificar você por
						e-mail ou telefone assim que seu pedido estiver pronto para entrega.
					</p>
				</div>

				{orderDetails ? <BillingInfoCard orderDetails={orderDetails} /> : <BillingInfoCardSkeleton />}

				<Button onClick={() => router.replace('/')}>
					<ArrowLeft />
					Voltar para a loja
				</Button>
			</div>

			{orderDetails ? <OrderSummaryCard orderDetails={orderDetails} /> : <OrderSummaryCardSkeleton />}
		</div>
	);
}
