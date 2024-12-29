'use client';

import { twMerge } from 'tailwind-merge';
import { ComponentProps, ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

type InputControlProps = ComponentProps<'input'>;

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = ({ ...props }, ref) => {
	const [isVisible, setIsVisible] = useState(false);
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
				className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
				type={isVisible ? 'text' : 'password'}
				{...props}
			/>

			<button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
				{isVisible ? (
					<EyeOff className="pointer-events-none h-5 w-5 text-muted-foreground" />
				) : (
					<Eye className="pointer-events-none h-5 w-5 text-muted-foreground" />
				)}
			</button>
		</div>
	);
};

export const PasswordInput = forwardRef(InputBase);
