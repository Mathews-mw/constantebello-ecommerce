'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import * as Slider from '@radix-ui/react-slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

import { SlidersHorizontal } from 'lucide-react';
import { Label } from '@/components/ui/label';

const items = [
	{
		id: 'COZINHA',
		label: 'Cozinha',
	},
	{
		id: 'ESCRITORIO',
		label: 'Escritório',
	},
	{
		id: 'QUARTO',
		label: 'Quarto',
	},
	{
		id: 'SALA',
		label: 'Sala',
	},
	{
		id: 'SALA_JANTA',
		label: 'Sala de janta',
	},
];

export function ProductsFilters() {
	const [rangePriceFilter, setRangePriceFilter] = useState([220, 5000]);
	const [rangePriceFilterCommitted, setRangePriceFilterCommitted] = useState<number[] | undefined>();
	const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	useEffect(() => {
		if (rangePriceFilterCommitted) {
			const [minPrice, maxPrice] = rangePriceFilterCommitted;
			params.set('minPrice', minPrice.toString());
			params.set('maxPrice', maxPrice.toString());
		} else {
			params.delete('minPrice');
			params.delete('maxPrice');
		}

		if (departmentFilter && departmentFilter.length > 0) {
			console.log(`departmentFilter: `, departmentFilter);
			params.set('departments', departmentFilter.join(','));
		} else {
			params.delete('departments');
		}

		replace(`${pathname}?${params.toString()}`);
	}, [rangePriceFilterCommitted, departmentFilter]);

	useEffect(() => {
		const minPriceParams = searchParams.get('minPrice');
		const maxPriceParams = searchParams.get('maxPrice');
		const departmentsParams = searchParams.get('departments');

		if (minPriceParams && maxPriceParams) {
			setRangePriceFilter([Number(minPriceParams), Number(maxPriceParams)]);
			setRangePriceFilterCommitted([Number(minPriceParams), Number(maxPriceParams)]);
		}
		if (departmentsParams) {
			setDepartmentFilter(departmentsParams.split(','));
		}
	}, []);

	return (
		<div className="h-min space-y-4 rounded-xl border bg-background p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<h4 className="text-lg font-semibold">Filtros</h4>
				<SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
			</div>

			<Separator />

			<div className="space-y-4">
				<h6 className="font-semibold">Preço</h6>
				<div>
					<Slider.Root
						defaultValue={[220, 5000]}
						min={100}
						max={10000}
						minStepsBetweenThumbs={1}
						value={rangePriceFilter}
						onValueChange={setRangePriceFilter}
						onValueCommit={(value) => setRangePriceFilterCommitted(value)}
						className="relative flex w-full touch-none select-none items-center"
					>
						<Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
							<Slider.Range className="absolute h-full bg-primary" />
						</Slider.Track>
						<Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
						<Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
					</Slider.Root>
				</div>

				<div className="flex justify-evenly">
					<div>
						<div className="w-min text-nowrap rounded border px-2 py-1 text-sm text-muted-foreground">
							<span>Mín: R$ {rangePriceFilter[0]}</span>
						</div>
					</div>

					<div>
						<span className="text-muted-foreground"> - </span>
					</div>

					<div>
						<div className="w-min text-nowrap rounded border px-2 py-1 text-sm text-muted-foreground">
							<span>Máx: R$ {rangePriceFilter[1]}</span>
						</div>
					</div>
				</div>
			</div>

			<Separator />

			<div className="space-y-4">
				<h6 className="font-semibold">Departamento</h6>

				<div className="flex flex-col gap-4">
					{items.map((department) => {
						return (
							<div key={department.id} className="flex items-center gap-1.5">
								<Checkbox
									checked={departmentFilter.includes(department.id)}
									onCheckedChange={(checked) => {
										if (departmentFilter.includes(department.id)) {
											setDepartmentFilter((prev) => prev.filter((item) => item !== department.id));
											return checked;
										}

										setDepartmentFilter((prev) => [...prev, department.id]);
										return checked;
									}}
								/>
								<Label className="text-muted-foreground">{department.label}</Label>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
