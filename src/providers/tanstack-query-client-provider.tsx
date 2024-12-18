'use client';

import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(relativeTime);

export function TanstackQueryClientProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
