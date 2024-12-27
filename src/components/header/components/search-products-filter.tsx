'use client';

import { KeyboardEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { Search } from 'lucide-react';

export function SearchProductFilter() {
	const [searchValue, setSearchValue] = useState('');

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const { replace } = useRouter();

	function handleSearch() {
		if (!searchValue) {
			return;
		}

		if (searchValue) {
			params.set('search', searchValue);
		} else {
			params.delete('search');
		}

		replace(`/busca?${params.toString()}`);
	}

	function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}

	useEffect(() => {
		const searchProduct = searchParams.get('search');

		if (searchProduct) {
			setSearchValue(searchProduct);
		}
	}, []);

	return (
		<div className="flex w-full max-w-[420px] gap-2 rounded-lg border bg-secondary px-2 has-[:focus]:ring-1 has-[:focus]:ring-primary">
			<input
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onKeyDown={handleSearchKeyDown}
				className="w-full bg-transparent outline-none ring-0"
				placeholder="Buscar por produto..."
			/>
			<Button variant="ghost" onClick={handleSearch} disabled={!searchValue}>
				<Search />
			</Button>
		</div>
	);
}
