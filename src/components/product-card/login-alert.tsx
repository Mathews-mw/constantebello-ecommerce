import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Heart } from 'lucide-react';

export function LoginAlert() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="icon" variant="ghost" className="absolute right-2 top-2 z-10">
					<Heart strokeWidth={3} className="h-6 w-6 text-primary/70" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex w-full items-center justify-center">
						<img src="/alert-animated.gif" />
					</div>
					<AlertDialogTitle className="text-center">Faça o login</AlertDialogTitle>
					<AlertDialogDescription className="text-justify">
						Por favor, faça o seu login para marcar como favorito os produtos que gostar. Além disso, ao fazer o login,
						você pode aproveitar da melhor forma possível todos os recursos da plataforma.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>OK</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
