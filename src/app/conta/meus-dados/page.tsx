'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { getUserById } from '../../api/@requests/users/get-user-by-id';

import { AddressCard } from './address-card';
import { UpdateUserInfosForm } from './update-user-infos-form';
import { AddNewAddressDialog } from '../../../components/add-new-address-dialog';
import { UpdateUserInfosFormSkeleton } from './update-user-infos-form-skeleton';

import { FileText, MapPinHouse, UserRound } from 'lucide-react';

export default function UserPersonalDataPage() {
	const { data, status } = useSession();
	const [parent] = useAutoAnimate();

	const { data: user } = useQuery({
		queryKey: ['user', data?.user.id],
		queryFn: async () => getUserById({ id: data ? data.user.id : '' }),
		enabled: !!data && status === 'authenticated',
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2">
				<UserRound className="fill-primary text-white" strokeWidth={1} />
				<h1 className="text-xl font-black">Meus dados</h1>
			</div>

			<div className="flex w-full flex-wrap gap-8">
				<div className="h-min flex-grow space-y-4 rounded-lg border bg-background p-4 shadow-sm">
					<div className="flex items-center gap-2">
						<FileText className="fill-primary text-background" />
						<h2 className="text-lg font-semibold">Dados de cadastro</h2>
					</div>

					{user ? <UpdateUserInfosForm user={user} /> : <UpdateUserInfosFormSkeleton />}
				</div>

				<div className="h-min flex-grow space-y-4 rounded-lg border bg-background p-4 shadow-sm">
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-2">
							<MapPinHouse className="fill-background text-primary" />
							<h2 className="text-lg font-semibold">Endereços cadastrados</h2>
						</div>

						{user && <AddNewAddressDialog userId={user.id} />}
					</div>

					{user && (
						<div ref={parent} className="space-y-2">
							{user?.userInfos?.userAddress.map((address) => {
								return <AddressCard key={address.id} address={address} userId={user.id} />;
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
