import dayjs from 'dayjs';
import Image from 'next/image';
import type { IOrderDetails } from '@/@types/order';

import { Separator } from '@/components/ui/separator';

import { FileSearch } from 'lucide-react';

interface IProps {
	orderDetails: IOrderDetails;
}

export function OrderSummaryCard({ orderDetails }: IProps) {
	const totalOrder = orderDetails.totalPrice + 40 - 120;

	let paymentType = '';

	switch (orderDetails?.paymentType) {
		case 'CARTAO_CREDITO':
			paymentType = 'Cartão de crédito';
			break;
		case 'BOLETO':
			paymentType = 'Boleto bancário';
			break;
		case 'PIX':
			paymentType = 'Pix';
			break;
	}

	return (
		<div className="space-y-4 rounded-lg border bg-background p-6">
			<div className="flex items-center gap-2">
				<FileSearch className="text-primary" />
				<h4 className="font-black">Resumo do seu pedido</h4>
			</div>

			<Separator />

			<div className="flex w-full justify-between">
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Data</span>
					<span className="text-sm font-semibold">{dayjs(orderDetails?.createdAt).format('DD MMM YYYY')}</span>
				</div>

				<Separator orientation="vertical" className="h-8" />

				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">ID do Pedido</span>
					<span className="text-sm font-semibold">{orderDetails.id}</span>
				</div>

				<Separator orientation="vertical" className="h-8" />
				<div className="flex flex-col">
					<span className="text-xs text-muted-foreground">Método de pagamento</span>
					<span className="text-sm font-semibold">{paymentType}</span>
				</div>
			</div>

			<Separator />

			<ul className="space-y-4">
				{orderDetails.orderItems.map((item) => {
					return (
						<li className="flex w-full justify-between gap-2" key={item.id}>
							<div className="flex gap-4">
								<Image
									src={item.product.imageUrl}
									alt=""
									width={1020}
									height={1020}
									className="w-[80px] rounded-lg object-cover"
								/>
								<div className="flex flex-col">
									<span title={item.product.name} className="line-clamp-1 text-xs font-bold">
										{item.product.name}
									</span>
									<span className="text-xs text-muted-foreground">Quantidade: {item.quantity}</span>
									<span className="text-xs text-muted-foreground">Cor: Stone</span>
									<span className="text-xs text-muted-foreground">Tamanho: 165L X 90C</span>
								</div>
							</div>

							<div>
								<span className="text-nowrap text-sm font-bold">
									{item.priceAtPurchase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
								</span>
							</div>
						</li>
					);
				})}
			</ul>

			<Separator />

			<div className="space-y-2 text-xs">
				<div className="flex w-full justify-between font-bold text-muted-foreground">
					<span>Subtotal</span>
					<span>{orderDetails.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
				</div>
				<div className="flex w-full justify-between font-bold text-muted-foreground">
					<span>Descontos</span>
					<span>- R$ 120,50</span>
				</div>
				<div className="flex w-full justify-between font-bold text-muted-foreground">
					<span>Entrega</span>
					<span>R$ 40,00</span>
				</div>
			</div>

			<Separator />

			<div className="flex w-full justify-between font-bold">
				<span>Total do pedido</span>
				<span>{totalOrder.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
			</div>
		</div>
	);
}
