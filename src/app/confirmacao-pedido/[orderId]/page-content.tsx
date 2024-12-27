'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { updateOrderStatus } from '@/app/api/@requests/orders/update-order-status';
import { getOrderDetailsById } from '@/app/api/@requests/orders/get-order-details-by-id';

import { Button } from '@/components/ui/button';
import { BillingInfoCard } from './billing-info-card';
import { OrderSummaryCard } from './order-summary-card';
import { BillingInfoCardSkeleton } from './billing-info-card-skeleton';
import { errorToasterHandler } from '@/app/utils/error-toaster-handler';
import { OrderSummaryCardSkeleton } from './order-summary-card-skeleton';

import { ArrowLeft } from 'lucide-react';

interface IPageContentProps {
	orderId: string;
}

export function PageContent({ orderId }: IPageContentProps) {
	const router = useRouter();

	const { data: orderDetails } = useQuery({
		queryKey: ['order-details', orderId],
		queryFn: async () => getOrderDetailsById({ orderId }),
	});

	const { mutateAsync: updateOrderStatusFn } = useMutation({ mutationFn: updateOrderStatus });

	async function handleUpdateOrderStatus() {
		try {
			await updateOrderStatusFn({ orderId, orderStatus: 'PAYMENT_CONFIRMED' });
		} catch (error) {
			errorToasterHandler(error);
		}
	}

	useEffect(() => {
		handleUpdateOrderStatus();
	}, []);

	return (
		<div className="grid grid-cols-2 gap-20">
			<div className="h-min space-y-10 p-4">
				<div className="space-y-4">
					<h1 className="text-5xl font-black">Obrigado por comprar conosco!</h1>
					<p className="text-muted-foreground">
						Seu pedido será processado em 24 horas em dias úteis de trabalho. Nós iremos notificar você por e-mail ou
						telefone assim que seu pedido estiver pronto para entrega.
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
