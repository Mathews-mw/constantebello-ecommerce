/* eslint-disable @next/next/no-img-element */
'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';

import { QueryName } from './query-name';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/page-title';

export default function RegistrationConfirmationPage() {
	const navigator = useRouter();

	return (
		<div className="space-y-8">
			<PageTitle title="Confirmação de cadastro" />

			<div className="flex flex-col items-center justify-center gap-4">
				<Suspense fallback={null}>
					<QueryName />
				</Suspense>

				<img src="/approval-animated.gif" alt="Aprovado" />

				<p className="text-center">
					Antes de seguir com as suas compras, por favor, verifique o e-mail que foi encaminhado para você para
					confirmar o seu cadastro.
				</p>

				<Button onClick={() => navigator.replace('/')}>Voltar para a loja</Button>
			</div>
		</div>
	);
}
