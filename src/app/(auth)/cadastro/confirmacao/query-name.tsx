'use client';

import { useSearchParams } from 'next/navigation';

export function QueryName() {
	const searchParams = useSearchParams();

	const userName = searchParams.get('user');

	return (
		<p>
			<strong>{userName}</strong>, obrigado pelo seu cadastro no nosso e-commerce.
		</p>
	);
}
