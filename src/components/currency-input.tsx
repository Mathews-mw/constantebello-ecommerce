import { ForwardRefRenderFunction, forwardRef, useEffect, useState } from 'react';

import { Input } from './ui/input';

interface ICurrencyInputProps extends InputProps {
	value: string;
	defaultValue?: string;
	onValueChange: (event: string) => void;
}

const CurrencyInputBase: ForwardRefRenderFunction<HTMLInputElement, ICurrencyInputProps> = (
	{ value, defaultValue, onValueChange, ...props },
	ref
) => {
	const [currentInputValue, setCurrentInputValue] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		const formattedValue = formatCurrency(inputValue);

		setCurrentInputValue(formattedValue);
		onValueChange(formattedValue);
	};

	const formatCurrency = (value: string): string => {
		const numericValue = value.replace(/[^\d]/g, '');
		const floatValue = parseFloat(numericValue) / 100;

		return floatValue.toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		});
	};

	useEffect(() => {
		if (defaultValue) {
			const formattedValue = formatCurrency(defaultValue);

			setCurrentInputValue(formattedValue);
		}
	}, [defaultValue]);

	return (
		<Input
			ref={ref}
			color="primary"
			value={currentInputValue}
			onChange={handleChange}
			{...props}
		/>
	);
};

export const CurrencyInput = forwardRef(CurrencyInputBase);
