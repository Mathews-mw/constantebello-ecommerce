'use client';

import { useEffect, useState } from 'react';

import { Button } from '../../../components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

import { ListFilter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const orderByFilterMap: Map<string, string> = new Map([
	['relevance', 'Relevância'],
	['lowestPrice', 'Menor preço'],
	['highPrice', 'Maior preço'],
	['az', 'AZ'],
	['za', 'ZA'],
]);

const arrayOfObjects = Array.from(orderByFilterMap, ([key, value]) => ({
	value: key,
	label: value,
}));

export function OrderByFilter() {
	const [orderByFilter, setOrderByFilter] = useState('relevance');

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	useEffect(() => {
		if (orderByFilter) {
			params.set('orderBy', orderByFilter);
		} else {
			params.delete('orderBy');
		}

		replace(`${pathname}?${params.toString()}`);
	}, [orderByFilter]);

	useEffect(() => {
		const orderByParams = searchParams.get('orderBy');

		if (orderByParams) {
			setOrderByFilter(orderByParams);
		}
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2 text-sm text-muted-foreground">
					<ListFilter className="h-4 w-4" />
					<span>Ordenar: {orderByFilterMap.get(orderByFilter)}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuRadioGroup value={orderByFilter} onValueChange={setOrderByFilter}>
					{arrayOfObjects.map((item) => {
						return (
							<DropdownMenuRadioItem key={item.value} value={item.value}>
								{item.label}
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
