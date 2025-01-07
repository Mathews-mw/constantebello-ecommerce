import { ForwardRefRenderFunction, forwardRef, useEffect, useState } from 'react';

import { Input, InputProps } from './ui/input';

interface ICurrencyInputProps extends InputProps {
	value: string;
	defaultValue?: string;
	onValueChange: (event: string) => void;
}

const CepInputBase: ForwardRefRenderFunction<HTMLInputElement, ICurrencyInputProps> = (
	{ value, defaultValue, onValueChange, ...props },
	ref
) => {
	const [cepInputValue, setCepInputValue] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		const formattedValue = formatCep(inputValue);

		setCepInputValue(formattedValue);
		onValueChange(formattedValue);
	};

	const formatCep = (value: string): string => {
		const numericValue = value.replace(/[^\d]/g, '');
		const cepValue = numericValue.replace(/(\d{5})(\d)/, '$1-$2');

		return cepValue;
	};

	useEffect(() => {
		if (defaultValue) {
			const formattedValue = formatCep(defaultValue);

			setCepInputValue(formattedValue);
		}
	}, [defaultValue]);

	return (
		<Input
			ref={ref}
			color="primary"
			inputMode="numeric"
			maxLength={9}
			value={cepInputValue}
			onChange={handleChange}
			{...props}
		/>
	);
};

export const CepInput = forwardRef(CepInputBase);
