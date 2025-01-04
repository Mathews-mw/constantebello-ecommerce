'use client';

import { twMerge } from 'tailwind-merge';
import { ChangeEventHandler, ComponentProps, ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

type InputControlProps = ComponentProps<'input'>;

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = (
	{ value = '', onChange, ...props },
	ref
) => {
	const [inputValue, setInputValue] = useState<string | number | readonly string[]>(value);

	// Função para aplicar a máscara de CPF
	const applyCpfMask = (value: string): string => {
		return value
			.replace(/\D/g, '') // Remove caracteres não numéricos
			.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
			.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
			.replace(/(\d{3})(\d{2})$/, '$1-$2'); // Adiciona o traço
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.target.value;
		const maskedValue = applyCpfMask(rawValue);

		setInputValue(maskedValue);
		onChange?.(maskedValue as unknown as React.ChangeEvent<HTMLInputElement>); // Notifica o valor ao pai, se fornecido
	};

	return (
		<div
			className={twMerge([
				'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
				'has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2',
				'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
			])}
		>
			<input
				ref={ref}
				value={inputValue}
				onChange={handleInputChange}
				maxLength={14}
				placeholder="999-999-999-99"
				className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
				{...props}
			/>
		</div>
	);
};

export const CpfInput = forwardRef(InputBase);
