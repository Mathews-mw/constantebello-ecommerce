'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IOrderDetails } from '@/@types/order';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderStatusBadge } from '@/components/order-status-badge';

import { PackageSearch } from 'lucide-react';

interface IOrderItemCardProps {
	orderDetails: IOrderDetails;
}

export function OrderItemCard({ orderDetails }: IOrderItemCardProps) {
	const router = useRouter();

	return (
		<div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
			<div className="flex w-full flex-col-reverse justify-between gap-2.5 lg:flex-row lg:gap-0">
				<div className="flex flex-col gap-1 text-sm text-muted-foreground">
					<p>
						Pedido: <strong>{orderDetails.id}</strong>
					</p>
					<p>
						Data: <strong>{dayjs(orderDetails.createdAt).format('DD/MM/YYYY')}</strong>
					</p>
					<p>
						Tipo pagamento: <strong>{orderDetails.paymentTypeText}</strong>
					</p>
				</div>

				<div className="flex w-full justify-end lg:w-min">
					<OrderStatusBadge status={orderDetails.status} text={orderDetails.statusText} />
				</div>
			</div>

			<Separator />

			<div className="flex w-full flex-col justify-between gap-2.5 lg:flex-row lg:gap-0">
				<div className="w-full space-y-2">
					{orderDetails.orderItems.map((item) => {
						return (
							<div className="flex gap-3" key={item.id}>
								<Image
									src={item.product.imageUrl}
									alt=""
									width={1020}
									height={1020}
									className="h-[65px] w-[65px] rounded-lg border object-cover p-px"
								/>
								<div className="flex flex-col">
									<span title={item.product.name} className="line-clamp-1 text-sm font-bold">
										{item.product.name}
									</span>
									<span className="text-sm">Quantidade: {item.quantity}</span>
								</div>
							</div>
						);
					})}
				</div>

				<Button size="sm" variant="outline" onClick={() => router.push(`/conta/meus-pedidos/${orderDetails.id}`)}>
					<PackageSearch className="h-5 w-5" />
					Detalhes do pedido
				</Button>
			</div>
		</div>
	);
}
