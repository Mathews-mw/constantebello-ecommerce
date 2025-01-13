'use client';

import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorMessage } from '../error-message';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { PasswordInput } from '../password-input';
import { DialogContent, DialogTitle } from '../ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Loader2 } from 'lucide-react';

interface IProps {
	onOpen?: (open: boolean) => void;
}

const signInForm = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type SignInForm = z.infer<typeof signInForm>;

export function SigInDialogContent({ onOpen }: IProps) {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
	});

	const [isLoading, setIsLoading] = useState(false);

	const pathname = usePathname();

	async function handleCredentialsSignInForm(data: SignInForm) {
		try {
			setIsLoading(true);

			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.ok === false && result.status === 401) {
				if (onOpen) {
					onOpen(false);
				}
				return toast.error('Ops! Credenciais inválidas.');
			}

			setIsLoading(false);
			if (onOpen) {
				onOpen(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.log('error: ', error);
			toast.error('Credenciais inválidas.');
		}
	}

	return (
		<DialogContent className="w-full max-w-[820px] lg:w-[600px]">
			<VisuallyHidden.Root>
				<DialogTitle>Login</DialogTitle>
			</VisuallyHidden.Root>

			<div className="grid grid-cols-2 gap-8">
				<div className="relative">
					<div className="absolute z-10 h-full w-full bg-gradient-to-r from-rose-400 opacity-20" />
					<Image
						src="https://images.unsplash.com/photo-1627226325480-f46163bc38c2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
						width={1020}
						height={1020}
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="space-y-4">
					<div className="mt-4 flex w-full items-center justify-between">
						<h2 className="text-xl font-bold">Acesse sua conta</h2>
						<Button asChild variant="secondary" disabled={isLoading || isSubmitting}>
							<Link href="/cadastro">Cadastre-se</Link>
						</Button>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">
							Faça o login ou cadastre-se para poder ter acesso ao checkout e concluir as suas compras.
						</p>
					</div>

					<form onSubmit={handleSubmit(handleCredentialsSignInForm)} className="space-y-2">
						<div className="space-y-2">
							<div className="space-y-1">
								<Label>E-mail</Label>
								<Input type="email" {...register('email')} />
								<ErrorMessage message={errors.email?.message} />
							</div>
							<div className="space-y-1">
								<Label>Senha</Label>
								<PasswordInput {...register('password')} />
								<ErrorMessage message={errors.email?.message} />
							</div>
						</div>

						<Button type="button" variant="link" className="m-0 p-0" disabled={isLoading || isSubmitting}>
							Esqueceu a senha?
						</Button>

						<Button className="w-full" disabled={isLoading || isSubmitting}>
							Entrar
							{(isLoading || isSubmitting) && <Loader2 className="animate-spin" />}
						</Button>
					</form>

					<Separator />

					<div className="flex flex-col gap-4">
						<span className="text-sm">Ou entre com uma das redes sociais</span>

						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								onClick={() => signIn('google', { callbackUrl: pathname, redirect: false })}
								disabled={isLoading || isSubmitting}
							>
								<Image src="/google-logo.svg" alt="google" width={32} height={32} className="h-6 w-6" />
							</Button>

							<Button variant="outline" disabled={isLoading || isSubmitting}>
								<Image src="/apple-logo.svg" alt="google" width={32} height={32} className="h-6 w-6" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</DialogContent>
	);
}
