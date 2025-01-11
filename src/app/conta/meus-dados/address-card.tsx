import { twMerge } from 'tailwind-merge';
import { UserAddress } from '@prisma/client';

import { Button } from '../../../components/ui/button';
import { DeleteAddressDialog } from './delete-address-dialog';
import { MakeAddressPrincipalDialog } from './make-address-principal-dialog';

interface IAddressCardProps {
	userId: string;
	address: UserAddress;
}

export function AddressCard({ address, userId }: IAddressCardProps) {
	return (
		<div
			className={twMerge([
				'rounded border border-l-4 px-4 py-2',
				`${address.isMainAddress ? 'border-primary bg-primary-foreground' : 'bg-secondary'}`,
			])}
		>
			<div className="flex w-full justify-between">
				<div className="w-full flex-grow space-y-2 text-sm">
					<p>{address.street}</p>
					<p>Número: {address.number}</p>
					{address.addressComplement && <p>Complemento: {address.addressComplement}</p>}
					{address.addressReference && <p>Referência: {address.addressReference}</p>}
					<p>CEP: {address.cep}</p>
					<p>
						{address.city}, {address.state}
					</p>
				</div>

				{address.isMainAddress && (
					<div>
						<span className="text-sm font-bold text-primary">(PRINCIPAL)</span>
					</div>
				)}
			</div>

			<div className="flex w-full justify-end gap-2">
				<Button size="xs" variant="outline" className="text-xs font-semibold">
					Editar
				</Button>

				<DeleteAddressDialog userId={userId} addressId={address.id} />

				<MakeAddressPrincipalDialog userId={userId} addressId={address.id} />
			</div>
		</div>
	);
}
