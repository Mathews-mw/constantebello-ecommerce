'use client';

import { Suspense } from 'react';
import PageContent from './page-content';

export default function ProductsPage() {
	return (
		<Suspense>
			<PageContent />
		</Suspense>
	);
}
