'use client';

import { useState } from 'react';

import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { SigInDialogContent } from './sigin-dialog-content';

export function SigInDialog() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog modal open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Entrar</Button>
			</DialogTrigger>

			<SigInDialogContent onOpen={setIsOpen} />
		</Dialog>
	);
}
