import { IOrderDetails } from '@/@types/order';
import { phoneFormatter } from '@/app/utils/phone-formatter';

interface IProps {
	orderDetails: IOrderDetails;
}

export function BillingInfoCard({ orderDetails }: IProps) {
	const addressComplement = orderDetails.userAddress.addressComplement
		? `, ${orderDetails.userAddress.addressComplement}`
		: '';

	const addressReference = orderDetails.userAddress.addressReference
		? `, ${orderDetails?.userAddress.addressReference}`
		: '';

	const orderAddress = `${orderDetails.userAddress.street}, N ${orderDetails.userAddress.number}${addressComplement}${addressReference}, ${orderDetails.userAddress.neighborhood}. CEP: ${orderDetails.userAddress.cep} | ${orderDetails.userAddress.city} - ${orderDetails.userAddress.state}`;

	return (
		<div className="space-y-2 text-sm lg:text-base">
			<h4 className="text-lg font-bold">Informações de cobrança</h4>

			<div className="space-y-2.5">
				<div className="flex justify-between">
					<span className="font-bold text-muted-foreground">Nome</span>
					<span className="text-end">{orderDetails.user.name}</span>
				</div>
				<div className="flex justify-between">
					<span className="font-bold text-muted-foreground">Endereço</span>
					<span className="w-1/2 text-wrap text-end">{orderAddress}</span>
				</div>
				<div className="flex justify-between">
					<span className="font-bold text-muted-foreground">Telefone</span>
					<span className="text-end">{phoneFormatter(orderDetails.user.userInfos.phone)}</span>
				</div>
				<div className="flex justify-between">
					<span className="font-bold text-muted-foreground">E-mail</span>
					<span className="text-end">{orderDetails.user.email}</span>
				</div>
			</div>
		</div>
	);
}
