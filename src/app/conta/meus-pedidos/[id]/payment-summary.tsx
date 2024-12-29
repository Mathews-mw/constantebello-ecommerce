import { IOrderDetails } from '@/@types/order';
import { Separator } from '@/components/ui/separator';

interface IProps {
	order: IOrderDetails;
}

export function PaymentSummary({ order }: IProps) {
	return (
		<div className="h-min space-y-4 rounded-lg border bg-background p-6 shadow-sm">
			<div>
				<span>
					Forma de pagamento: <strong>{order.paymentTypeText}</strong>
				</span>
			</div>

			<Separator />

			<div className="flex flex-col gap-1">
				<span>Endereço de entrega: </span>

				<div className="flex flex-col gap-1 text-sm">
					<span>
						{order.userAddress.street}, Número {order.userAddress.number}
					</span>
					<div>
						{order.userAddress.addressComplement && <span>{order.userAddress.addressComplement}</span>}
						{order.userAddress.addressReference && <span>, {order.userAddress.addressReference} </span>}
					</div>
					<span>
						CEP: {order.userAddress.cep} | {order.userAddress.city} - {order.userAddress.state}
					</span>
				</div>
			</div>

			<Separator />

			<div className="space-y-2 rounded border p-2 text-sm">
				<div className="flex w-full justify-between">
					<span>Total produto(s)</span>
					<span>{order.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
				</div>
				<div className="flex w-full justify-between">
					<span>Descontos</span>
					<span>R$ 00,00</span>
				</div>
				<div className="flex w-full justify-between">
					<span>Entrega</span>
					<span>R$ 00,00</span>
				</div>

				<Separator />

				<div className="flex w-full justify-between rounded font-bold">
					<span>Total</span>
					<span>{order.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
				</div>
			</div>
		</div>
	);
}
