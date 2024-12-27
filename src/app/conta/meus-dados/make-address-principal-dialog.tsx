'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { errorToasterHandler } from '@/app/utils/error-toaster-handler';
import { makeUserAddressPrincipal } from '@/app/api/@requests/users/address/make-user-address-principal';

import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2 } from 'lucide-react';

interface IProps {
	userId: string;
	addressId: string;
}

export function MakeAddressPrincipalDialog({ userId, addressId }: IProps) {
	const [isOpen, setIsOpen] = useState(false);

	const useQuery = useQueryClient();

	const { mutateAsync: makeAddressPrincipalFn, isPending } = useMutation({
		mutationFn: makeUserAddressPrincipal,
		onSuccess: async () => {
			await useQuery.invalidateQueries({ queryKey: ['user', userId] });
			toast.success('Endereço atualizado');
			setIsOpen(false);
		},
		onError: (error) => {
			errorToasterHandler(error);
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="outline" className="text-xs font-semibold">
					Tornar principal
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tornar esse endereço principal</DialogTitle>

					<DialogDescription className="text-sm text-muted-foreground">
						Deseja marcar esse endereço como sendo o principal para entregas?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isPending} onClick={() => setIsOpen(!isOpen)}>
							Não
						</Button>
					</DialogClose>

					<Button onClick={() => makeAddressPrincipalFn({ addressId })} disabled={isPending}>
						Sim
						{isPending && <Loader2 className="animate-spin" />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
