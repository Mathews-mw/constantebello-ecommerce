'use client';

import Image from 'next/image';

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface IProps {
	isOpen: boolean;
	onOpen?: (open: boolean) => void;
}

export function GeneratingOrderAlert({ isOpen, onOpen }: IProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpen}>
			<AlertDialogContent onEscapeKeyDown={(event) => event.preventDefault()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Gerando seu pedido</AlertDialogTitle>
					<AlertDialogDescription>Por favor, aguarde...</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="flex items-center justify-center">
					<Image src="/cart-animation.gif" alt="" width={50} height={50} />
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
