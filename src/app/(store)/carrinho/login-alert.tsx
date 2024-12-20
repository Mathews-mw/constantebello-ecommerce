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
import { ArrowRight } from 'lucide-react';

interface ILoginAlert {
	disabled?: boolean;
}

export function LoginAlert({ disabled }: ILoginAlert) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="secondary" className="w-full" disabled={disabled}>
					Ir para o Checkout
					<ArrowRight className="h-6 w-6" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex w-full items-center justify-center">
						<img src="/alert-animated.gif" />
					</div>
					<AlertDialogTitle>Faça o login para prosseguir</AlertDialogTitle>
					<AlertDialogDescription>
						Por favor, faça o seu login para prosseguir com o seu checkout e concluir o seu
						pagamento.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>OK</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
