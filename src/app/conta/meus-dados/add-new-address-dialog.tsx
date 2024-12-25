'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Loader2, MapPinPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from '@/components/error-message';
import { DialogDescription } from '@radix-ui/react-dialog';
import { CepInput } from '@/components/cep-input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerCustomerAddress } from '@/app/api/@requests/users/register-user-address';
import { errorToasterHandler } from '@/app/utils/error-toaster-handler';

interface IProps {
	userId: string;
	customerId: string;
}

const addAddressFormSchema = z.object({
	street: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	number: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	addressComplement: z.optional(z.string()),
	addressReference: z.optional(z.string()),
	neighborhood: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	city: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	state: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type AddAddressInputData = z.infer<typeof addAddressFormSchema>;

export function AddNewAddressDialog({ userId, customerId }: IProps) {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { isSubmitting, errors },
	} = useForm<AddAddressInputData>({
		resolver: zodResolver(addAddressFormSchema),
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isSearchCep, setIsSearchCep] = useState(false);
	const [cepInputValue, setCepInputValue] = useState<string>('');
	const [searchCepErrorMessage, setSearchCepErrorMessage] = useState('');

	const useQuery = useQueryClient();

	const { mutateAsync: registerCustomerAddressFn, isPending } = useMutation({
		mutationFn: registerCustomerAddress,
		onSuccess: async () => {
			await useQuery.invalidateQueries({ queryKey: ['user', userId] });
		},
	});

	async function searchCep() {
		if (!cepInputValue) {
			setIsSearchCep(false);
			return;
		}

		const cepFormatted = cepInputValue.replace('-', '');

		if (cepFormatted.length < 8) {
			return setSearchCepErrorMessage('Informe um CEP válido');
		}

		setIsSearchCep(true);
		const data = await fetch(`https://viacep.com.br/ws/${cepFormatted}/json/`);

		const result = await data.json();

		if (result.erro === 'true') {
			setIsSearchCep(false);
			return setSearchCepErrorMessage('CEP não encontrado');
		} else {
			setSearchCepErrorMessage('');
		}

		const cepResponse = result as IViaCepResponse;

		setValue('street', cepResponse.logradouro, {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue('neighborhood', cepResponse.bairro, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue('city', cepResponse.localidade, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue('state', cepResponse.uf, {
			shouldDirty: true,
			shouldValidate: true,
		});

		setIsSearchCep(false);
	}

	async function handleAddAddressForm(data: AddAddressInputData) {
		if (!cepInputValue) {
			return setSearchCepErrorMessage('Por favor, preencha o CEP.');
		} else {
			setSearchCepErrorMessage('');
		}

		try {
			await registerCustomerAddressFn({
				customerId,
				cep: cepInputValue,
				street: data.street,
				number: data.number,
				neighborhood: data.neighborhood,
				addressComplement: data.addressComplement,
				addressReference: data.addressReference,
				city: data.city,
				state: data.state,
			});

			setIsOpen(false);
			toast.success('Endereço cadastrado com sucesso');
		} catch (error) {
			console.log('handleAddAddressForm error: ', error);
			errorToasterHandler(error);
		}
	}

	return (
		<Dialog modal open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<MapPinPlus /> Novo endereço
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full min-w-[640px]">
				<DialogHeader>
					<div className="flex items-center gap-2">
						<MapPinPlus className="text-primary" />
						<DialogTitle>Cadastrar novo endereço de entrega</DialogTitle>
					</div>

					<DialogDescription className="text-sm text-muted-foreground">
						Informe um novo endereço para as suas entregas. Lembrando, você pode marcar esse novo endereço como o padrão
						para as suas encomendas.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(handleAddAddressForm)} className="space-y-4">
					<div className="flex gap-4">
						<CepInput value={cepInputValue} onValueChange={setCepInputValue} placeholder="CEP*" className="max-w-28" />
						<Button
							type="button"
							variant="outline"
							onClick={searchCep}
							disabled={isSearchCep || isSubmitting || isPending}
							className="flex items-center justify-center gap-1.5"
						>
							Buscar
							{isSearchCep && <Loader2 className="h-4 w-4 animate-spin" />}
						</Button>

						<ErrorMessage message={searchCepErrorMessage} />
					</div>

					<div className="grid grid-cols-3 gap-2.5">
						<div className="col-span-2">
							<Input placeholder="Logradouro" {...register('street')} />
							<ErrorMessage message={errors.street?.message} />
						</div>
						<div>
							<Input placeholder="Número*" {...register('number')} />
							<ErrorMessage message={errors.number?.message} />
						</div>
					</div>

					<div className="space-y-0.5">
						<Input placeholder="Complemento (Opcional)" {...register('addressComplement')} />
						<small className="ml-1 text-xs text-muted-foreground">Ex.: Apto 123 Bloco 2A</small>
					</div>

					<Input placeholder="Referência (Opcional)" {...register('addressReference')} />

					<div className="flex gap-2.5">
						<div>
							<Input placeholder="Bairro*" {...register('neighborhood')} />
							<ErrorMessage message={errors.neighborhood?.message} />
						</div>
						<div>
							<Input placeholder="Cidade*" {...register('city')} />
							<ErrorMessage message={errors.city?.message} />
						</div>
						<div>
							<Input placeholder="UF*" {...register('state')} />
							<ErrorMessage message={errors.state?.message} />
						</div>
					</div>

					<div className="flex w-full justify-end gap-2">
						<Button type="submit" disabled={isSearchCep || isSubmitting || isPending}>
							Salvar
							{(isSubmitting || isPending) && <Loader2 className="animate-spin" />}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
