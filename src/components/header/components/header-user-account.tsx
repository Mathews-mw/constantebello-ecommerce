'use client';

import { useSession } from 'next-auth/react';
import { AccountMenu } from '../../account-menu';
import { SigInDialog } from '../../sigin-dialog';

import { Loader2 } from 'lucide-react';

export function HeaderUserAccount() {
	const { status } = useSession();

	if (status === 'loading') {
		return <Loader2 className="animate-spin" />;
	}

	return <div>{status === 'authenticated' ? <AccountMenu /> : <SigInDialog />}</div>;
}
