'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import validateCpf from 'validar-cpf';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cpfFormatter } from '../../utils/cpf-formatter';
import { phoneFormatter } from '../../utils/phone-formatter';
import { updateUser } from '../../api/@requests/users/update-user';
import { errorToasterHandler } from '../../utils/error-toaster-handler';

import { IUserDetails } from '../../../@types/user';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { CpfInput } from '../../../components/cpf-input';
import { Checkbox } from '../../../components/ui/checkbox';
import { DateInput } from '../../../components/date-input';
import { PhoneInput } from '../../../components/phone-input';
import { ErrorMessage } from '../../../components/error-message';

import { Loader2 } from 'lucide-react';

interface IProps {
	user: IUserDetails;
}

const updateForm = z.object({
	name: z.string().min(3, { message: 'Por favor, preencha o campo.' }),
	cpf: z
		.string()
		.min(1, { message: 'Por favor, preencha o campo.' })
		.refine((value) => validateCpf(value), { message: 'Por favor, preencha um CPF válido' }),
	phone: z.string().min(15, { message: 'Por favor, preencha o campo.' }),
	birthday: z
		.string()
		.min(1, { message: 'Por favor, preencha o campo.' })
		.refine((value) => /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(value), {
			message: 'Por favor, preencha uma data válida',
		}),
	advertisingConsent: z.coerce.boolean(),
});

type UpdateForm = z.infer<typeof updateForm>;

export function UpdateUserInfosForm({ user }: IProps) {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<UpdateForm>({
		resolver: zodResolver(updateForm),
		defaultValues: {
			name: user.name ?? undefined,
			birthday: user.userInfos ? user.userInfos.birthday : undefined,
			cpf: user.userInfos ? cpfFormatter(user.userInfos.cpf) : undefined,
			phone: user.userInfos ? phoneFormatter(user.userInfos.phone) : undefined,
			advertisingConsent: user.userInfos ? user.userInfos.advertisingConsent : undefined,
		},
	});

	const queryClient = useQueryClient();

	const { mutateAsync: updateUserFn, isPending } = useMutation({
		mutationFn: updateUser,
	});

	async function handleUpdateForm(data: UpdateForm) {
		try {
			await updateUserFn({
				id: user.id,
				email: user.email,
				name: data.name,
				cpf: data.cpf,
				phone: data.phone,
				birthday: data.birthday,
				advertisingConsent: data.advertisingConsent,
			});

			await queryClient.invalidateQueries({ queryKey: ['user', user.id] });

			reset();
			toast.success('Cadastro atualizado com sucesso');
		} catch (error) {
			console.log('error: ', error);
			errorToasterHandler(error);
		}
	}

	return (
		<form onSubmit={handleSubmit(handleUpdateForm)} className="flex flex-col gap-4">
			<div className="space-y-1">
				<Label htmlFor="name">Nome completo*</Label>
				<Input id="name" {...register('name')} />
				<ErrorMessage message={errors.name?.message} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="cpf">CPF*</Label>
				<Controller
					name="cpf"
					control={control}
					render={({ field }) => {
						return <CpfInput id="cpf" value={field.value} onChange={field.onChange} />;
					}}
				/>
				<ErrorMessage message={errors.cpf?.message} />
			</div>

			<div className="flex flex-col gap-3">
				<Label htmlFor="birthday">Data de nascimento*</Label>
				<Controller
					name="birthday"
					control={control}
					render={({ field }) => {
						return <DateInput id="birthday" value={field.value} onChange={field.onChange} />;
					}}
				/>
				<ErrorMessage message={errors.birthday?.message} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="phone">Telefone</Label>
				<Controller
					name="phone"
					control={control}
					render={({ field }) => {
						return <PhoneInput id="phone" value={field.value} onChange={field.onChange} />;
					}}
				/>
				<ErrorMessage message={errors.phone?.message} />
			</div>

			<div className="space-y-2">
				<Label>E-mail</Label>
				<Input value={user.email} disabled readOnly />
			</div>

			<div className="flex items-center gap-2">
				<Controller
					name="advertisingConsent"
					control={control}
					render={({ field }) => {
						return <Checkbox id="terms" className="mt-2" checked={field.value} onCheckedChange={field.onChange} />;
					}}
				/>

				<label
					htmlFor="terms"
					className="mt-2 text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Quero receber ofertas e novidades por e-mail
				</label>
			</div>

			<div className="flex justify-end">
				<Button type="submit" disabled={isPending || isSubmitting}>
					{(isPending || isSubmitting) && <Loader2 className="animate-spin" />}
					Salvar
				</Button>
			</div>
		</form>
	);
}
