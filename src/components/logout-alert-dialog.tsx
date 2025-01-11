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
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function LogoutAlertDialog() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" className="w-full items-center justify-start text-rose-500 hover:text-rose-600">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sair</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
					<AlertDialogDescription>
						Ao sair, você irá encerrar sua sessão na aplicação nesse navegador.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Não</AlertDialogCancel>
					<AlertDialogAction onClick={() => signOut({ callbackUrl: '/' })}>Sair</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
