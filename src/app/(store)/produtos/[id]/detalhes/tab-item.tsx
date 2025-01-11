'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'motion/react';

import { twMerge } from 'tailwind-merge';

interface ITabItemProps {
	value: string;
	title: string;
	isSelected?: boolean;
}

export function TabItem({ value, title, isSelected = false }: ITabItemProps) {
	return (
		<Tabs.Trigger
			value={value}
			className={twMerge(
				'group relative px-1 pb-4 text-sm font-medium text-muted-foreground outline-none hover:text-primary',
				'data-[state=active]:font-bold data-[state=active]:text-primary'
			)}
		>
			<span className="whitespace-nowrap rounded group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-4">
				{title}
			</span>

			{isSelected && (
				<motion.div layoutId="activeTab" className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary" />
			)}
		</Tabs.Trigger>
	);
}
