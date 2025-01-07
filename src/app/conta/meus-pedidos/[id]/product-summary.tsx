import dayjs from 'dayjs';
import Image from 'next/image';

import { IOrderDetails } from '@/@types/order';

import { Button } from '@/components/ui/button';
import { OrderProgress } from './order-progress';
import { Separator } from '@/components/ui/separator';
import { OrderStatusBadge } from '@/components/order-status-badge';

interface IProps {
	order: IOrderDetails;
}

export function ProductSummary({ order }: IProps) {
	return (
		<div className="col-span-2 space-y-8 rounded-lg border bg-background p-6 shadow-sm">
			<div className="flex w-full flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center lg:gap-0">
				<div className="text-sm font-semibold">
					<h4>Pedido: {order.id}</h4>
					<div>
						<span>Data: </span>
						{order && <span>{dayjs(order.createdAt).format('DD/MM/YYYY')}</span>}
					</div>
				</div>

				<OrderStatusBadge text={order.statusText} status={order.status} />
			</div>

			<Separator />

			{order.orderItems.map((item) => {
				return (
					<div key={item.id} className="flex w-full justify-between">
						<div className="flex gap-3">
							<Image
								src={item.product.imageUrl}
								alt=""
								width={1020}
								height={1020}
								className="h-[65px] w-[65px] rounded-lg border object-cover p-px"
							/>
							<div className="flex flex-col">
								<span title="" className="line-clamp-1 text-sm font-bold">
									{item.product.name}
								</span>
								<span className="text-sm text-muted-foreground">Quantidade: {item.quantity}</span>
							</div>
						</div>

						<span className="font-bold text-muted-foreground">
							{item.priceAtPurchase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
						</span>
					</div>
				);
			})}

			<Separator />

			<div className="flex w-full flex-col justify-center gap-2 lg:flex-row lg:justify-end lg:gap-4">
				<Button variant="secondary">Ajuda com o pedido</Button>
				<Button variant="outline">Rastreio detalhado</Button>
			</div>

			<OrderProgress />
		</div>
	);
}
