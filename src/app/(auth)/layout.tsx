import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function SessionLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
