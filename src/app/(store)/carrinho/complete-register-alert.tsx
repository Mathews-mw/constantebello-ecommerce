import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface IProps {
	isOpen: boolean;
	onOpen?: (open: boolean) => void;
}

export function CompleteRegisterAlert({ isOpen, onOpen }: IProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpen}>
			<VisuallyHidden>
				<AlertDialogTrigger asChild>
					<Button variant="secondary" className="w-full">
						Ir para o Checkout
						<ArrowRight className="h-6 w-6" />
					</Button>
				</AlertDialogTrigger>
			</VisuallyHidden>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex w-full items-center justify-center">
						<img src="/alert-animated.gif" />
					</div>
					<AlertDialogTitle>Complete o seu cadastro para prosseguir</AlertDialogTitle>
					<AlertDialogDescription>
						Por favor, complete o seu cadastro para prosseguir com o seu checkout e concluir o seu pagamento. Algumas
						informações são essenciais para prosseguir com o seu pagamento. Vá em <strong>meus dados</strong> e insira
						suas informações.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Link href="/conta/meus-dados">Completar cadastro</Link>
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
