'use client';

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Loader2 } from 'lucide-react';

const signInForm = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type SignInForm = z.infer<typeof signInForm>;

export default function SignInPage() {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
	});

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	async function handleCredentialsSignInForm(data: SignInForm) {
		try {
			setIsLoading(true);

			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.ok === false && result.status === 401) {
				setIsLoading(false);
				return toast.error('Ops! Credenciais inválidas.');
			}

			setIsLoading(false);
			router.replace('/');
		} catch (error) {
			setIsLoading(false);
			console.log('error: ', error);
			toast.error('Credenciais inválidas.');
		}
	}

	return (
		<div className="p-8">
			<div>
				<Button asChild variant="secondary" disabled={isLoading || isSubmitting} className="absolute left-8 top-8">
					<Link href="/cadastro">Cadastre-se</Link>
				</Button>

				<Button asChild variant="link" className="absolute right-8 top-8">
					<Link href="/">Voltar ao site</Link>
				</Button>
			</div>

			<div className="flex w-[400px] flex-col justify-center gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-center">Acesse sua conta</CardTitle>
						<CardDescription className="text-center">
							Faça o login ou cadastre-se para ter a melhor experiência no nosso e-commerce.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<form onSubmit={handleSubmit(handleCredentialsSignInForm)} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">E-mail</Label>

								<div>
									<Input id="email" placeholder="Insira seu e-mail cadastrado" type="text" {...register('email')} />
									<small className="text-red-400">{errors.email?.message}</small>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="name">Senha</Label>

								<div>
									<Input id="name" placeholder="Insira sua senha" type="password" {...register('password')} />
									<small className="text-red-400">{errors.password?.message}</small>
								</div>
							</div>

							<Button type="button" variant="link" className="m-0 p-0" disabled={isSubmitting}>
								Esqueceu a senha?
							</Button>

							<Button type="submit" className="flex w-full gap-2" disabled={isSubmitting}>
								Acessar painel
								{isSubmitting && <Loader2 className="h-5 w-5 animate-spin text-slate-200" />}
							</Button>
						</form>

						<Separator />

						<div className="flex flex-col gap-4">
							<span className="text-sm">Ou entre com uma das redes sociais</span>

							<div className="flex items-center gap-4">
								<Button
									variant="outline"
									onClick={() => signIn('google', { callbackUrl: '/' })}
									disabled={isLoading || isSubmitting}
								>
									<Image src="/google-logo.svg" alt="google" width={32} height={32} className="h-6 w-6" />
								</Button>

								<Button variant="outline" disabled={isLoading || isSubmitting}>
									<Image src="/apple-logo.svg" alt="google" width={32} height={32} className="h-6 w-6" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
