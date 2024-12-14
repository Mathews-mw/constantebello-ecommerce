'use client';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export function ProductsFilters() {
	const [minCurrencyValue, setMinCurrencyValue] = useState<number[]>([300]);
	const [maxCurrencyValue, setMaxCurrencyValue] = useState<number[]>([800]);

	return (
		<div className="h-min space-y-4 rounded-xl border p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<h4 className="text-lg font-semibold">Filtros</h4>
				<SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
			</div>

			<Separator />

			<div className="space-y-4">
				<h6 className="font-semibold">Preço</h6>

				<div>
					<Label className="text-sm text-muted-foreground">Mínimo R$</Label>
					<Slider
						defaultValue={[450]}
						max={1000}
						step={1}
						value={minCurrencyValue}
						onValueChange={(value) => setMinCurrencyValue(value)}
					/>
				</div>
				<div>
					<Label className="text-sm text-muted-foreground">Máximo R$</Label>
					<Slider
						defaultValue={[850]}
						max={1000}
						step={1}
						dir="rtl"
						value={maxCurrencyValue}
						onValueChange={(value) => setMaxCurrencyValue(value)}
					/>
				</div>

				<div className="flex justify-evenly">
					<div>
						<div className="w-min text-nowrap rounded border px-2 py-1 text-sm text-muted-foreground">
							<span>Mín: R$ {minCurrencyValue[0]}</span>
						</div>
					</div>

					<div>
						<span className="text-muted-foreground"> - </span>
					</div>

					<div>
						<div className="w-min text-nowrap rounded border px-2 py-1 text-sm text-muted-foreground">
							<span>Máx: R$ {maxCurrencyValue[0]}</span>
						</div>
					</div>
				</div>
			</div>

			<Separator />

			<div className="space-y-4">
				<h6 className="font-semibold">Categoria</h6>

				<ul className="space-y-2 text-muted-foreground">
					<li className="font-semibold text-foreground">Todos</li>
					<li>Cozinha</li>
					<li>Quarto</li>
					<li>Sala</li>
					<li>Sala de janta</li>
				</ul>
			</div>
		</div>
	);
}
