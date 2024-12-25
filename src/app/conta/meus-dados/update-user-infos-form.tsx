import { IUserDetails } from '@/@types/user';
import { CpfInput } from '@/components/cpf-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps {
	user: IUserDetails;
}

const updateForm = z.object({
	name: z.string().min(3, { message: 'Por favor, preencha o campo.' }),
	phone: z.string().min(15, { message: 'Por favor, preencha o campo.' }),
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
			phone: user.userInfos.phone,
			advertisingConsent: user.userInfos.advertisingConsent,
		},
	});

	return (
		<form className="flex flex-col gap-4">
			<div className="space-y-2">
				<Label>Nome</Label>
				<Input {...register('name')} />
			</div>

			<div className="space-y-2">
				<Label>Telefone</Label>
				<Input {...register('phone')} />
			</div>

			<div className="space-y-2">
				<Label>E-mail</Label>
				<Input value={user.email} disabled readOnly />
			</div>

			<div className="space-y-2">
				<Label>CPF</Label>
				<Input id="cpf" value={user.userInfos.cpf} disabled readOnly />
			</div>

			<div className="space-y-2">
				<Label>Data nascimento</Label>
				<Input value={user.userInfos.birthday} disabled readOnly />
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
				<Button type="submit">Salvar</Button>
			</div>
		</form>
	);
}
