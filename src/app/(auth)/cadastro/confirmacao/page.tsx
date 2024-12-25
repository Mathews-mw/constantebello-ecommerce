/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/page-title';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegistrationConfirmationPage() {
	const searchParams = useSearchParams();
	const navigator = useRouter();

	const userName = searchParams.get('user');

	return (
		<div className="space-y-8">
			<PageTitle title="Confirmação de cadastro" />

			<div className="flex flex-col items-center justify-center gap-4">
				<p>
					<strong>{userName}</strong>, obrigado pelo seu cadastro no nosso e-commerce.
				</p>

				<img src="/approval-animated.gif" alt="Aprovado" />

				<p className="text-center">
					Antes de realizar suas compras, por favor, faça o seu login e complete as informações de cadastro na seção de
					dados cadastrais do cliente.
				</p>

				<Button onClick={() => navigator.replace('/')}>Voltar para a loja</Button>
			</div>
		</div>
	);
}
