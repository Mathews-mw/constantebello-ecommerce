'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import validateCpf from 'validar-cpf';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerUser } from '@/app/api/@requests/users/register-user';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CpfInput } from '@/components/cpf-input';
import { PageTitle } from '@/components/page-title';
import { Checkbox } from '@/components/ui/checkbox';
import { DateInput } from '@/components/date-input';
import { useMutation } from '@tanstack/react-query';
import { PhoneInput } from '@/components/phone-input';
import { ErrorMessage } from '@/components/error-message';
import { PasswordInput } from '@/components/password-input';

import { Loader2 } from 'lucide-react';
import { insertUserInfos } from '@/app/api/@requests/users/insert-user-infos';

const signUpForm = z.object({
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
	email: z.string().email({ message: 'Preencha com um e-mail válido' }),
	confirmEmail: z.string().email({ message: 'Preencha com um e-mail válido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	confirmPassword: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	policyConsent: z.coerce.boolean().refine((value) => value ?? false, {
		message: '**Para prosseguir com o seu cadastro, você deve ler e aceitar os termos.',
	}),
});

type SignUpForm = z.infer<typeof signUpForm>;

export default function Cadastro() {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<SignUpForm>({
		resolver: zodResolver(signUpForm),
	});

	const navigator = useRouter();

	const { mutateAsync: registerUserFn, isPending } = useMutation({
		mutationFn: async (data: SignUpForm) => {
			const response = await registerUser({
				name: data.name,
				email: data.email,
				password: data.password,
			});

			await insertUserInfos({
				userId: response.user.id,
				phone: data.phone,
				cpf: data.cpf,
				birthday: data.birthday,
				policyConsent: data.policyConsent,
			});
		},
	});

	async function handleSignUpForm(data: SignUpForm) {
		if (data.email !== data.confirmEmail) {
			return toast.error(
				'A Validação de e-mail não está correta. Por favor, preencha ambos os campos de e-mail iguais.'
			);
		}
		if (data.password !== data.confirmPassword) {
			return toast.error('As senhas não são iguais.');
		}

		try {
			await registerUserFn(data);

			reset();
			toast.success('Cadastro feito com sucesso');
			navigator.replace(`/cadastro/confirmacao?user=${data.name}`);
		} catch (error) {
			console.log('error: ', error);
		}
	}

	return (
		<div className="space-y-8">
			<PageTitle title="CRIAR CONTA" />

			<form onSubmit={handleSubmit(handleSignUpForm)} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
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
				</div>

				<div className="grid grid-cols-2 gap-4">
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
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="email">E-mail</Label>
						<Input id="email" type="email" {...register('email')} />
						<ErrorMessage message={errors.email?.message} />
					</div>

					<div className="space-y-1">
						<Label htmlFor="confirmEmail">Confirme o e-mail</Label>
						<Input id="confirmEmail" {...register('confirmEmail')} />
						<ErrorMessage message={errors.confirmEmail?.message} />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="password">Senha</Label>
						<PasswordInput id="password" {...register('password')} />
						<ErrorMessage message={errors.password?.message} />
					</div>

					<div className="space-y-1">
						<Label htmlFor="confirmPassword">Confirme a senha</Label>
						<PasswordInput id="confirmPassword" {...register('confirmPassword')} />
						<ErrorMessage message={errors.confirmPassword?.message} />
					</div>
				</div>

				<div>
					<div className="flex items-center space-x-2">
						<Controller
							name="policyConsent"
							control={control}
							render={({ field }) => {
								return <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />;
							}}
						/>

						<label
							htmlFor="terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Li e estou de acordo com as{' '}
							<Button type="button" variant="link" className="p-0">
								políticas da empresa e políticas de privacidade.*
							</Button>
						</label>
					</div>
					<ErrorMessage message={errors.policyConsent?.message} />
				</div>

				<div className="flex justify-end">
					<Button type="submit" disabled={isPending || isSubmitting}>
						CADASTRAR
						{(isPending || isSubmitting) && <Loader2 className="h-5 w-5 animate-spin" />}
					</Button>
				</div>
			</form>
		</div>
	);
}
