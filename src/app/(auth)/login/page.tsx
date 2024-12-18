'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
	return (
		<div>
			<h1>Login</h1>

			<Button onClick={() => signIn('google', { callbackUrl: '/' })}>Login com Google</Button>
		</div>
	);
}
