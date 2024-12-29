'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { errorToasterHandler } from '@/app/utils/error-toaster-handler';
import { registerUserAddress } from '@/app/api/@requests/users/address/register-user-address';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CepInput } from '@/components/cep-input';
import { ErrorMessage } from '@/components/error-message';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { ImagePlus, Loader2, MapPinPlus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StarsRating } from '@/components/rating/stars-rating';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IProps {
	userId: string;
}

const reviewFormSchema = z.object({
	reviewValue: z.number().min(1, { message: 'Por favor, dê pelo menos 1 estrela para a sua avaliação' }),
	reviewTitle: z.string().min(1, { message: 'Por favor, preencha o título da sua avaliação' }),
	reviewText: z
		.string()
		.min(1, { message: 'Por favor, preencha o texto da sua avaliação' })
		.max(1000, { message: 'Texto de 1000 caracteres no máximo' }),
});

type ReviewInputData = z.infer<typeof reviewFormSchema>;

export function ReviewProductDialog() {
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { isSubmitting, errors },
	} = useForm<ReviewInputData>({
		resolver: zodResolver(reviewFormSchema),
	});

	const [isOpen, setIsOpen] = useState(false);

	const useQuery = useQueryClient();

	console.log('text review length: ', watch('reviewText')?.length);

	// const { mutateAsync: registerCustomerAddressFn, isPending } = useMutation({
	// 	mutationFn: registerUserAddress,
	// 	onSuccess: async () => {
	// 		await useQuery.invalidateQueries({ queryKey: ['user', userId] });
	// 	},
	// });

	async function handleReviewForm(data: ReviewInputData) {
		try {
			setIsOpen(false);
			toast.success('Endereço cadastrado com sucesso');
		} catch (error) {
			console.log('handleAddAddressForm error: ', error);
			errorToasterHandler(error);
		}
	}

	return (
		<Dialog modal open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Avaliar</Button>
			</DialogTrigger>

			<DialogContent className="w-full min-w-[640px]">
				<ScrollArea className="max-h-[80vh] overflow-y-auto pr-4">
					<DialogHeader className="mb-4 space-y-2 px-1">
						<DialogTitle>O que você achou do produto?</DialogTitle>

						<DialogDescription className="text-sm font-bold text-muted-foreground">
							MESA DE ESCRITÓRIO / MESA SIMPLES - CADEIRA SIMPLES R$ 820,00 165L X 90C
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSubmit(handleReviewForm)} className="space-y-1 px-1">
						<div className="flex flex-col gap-2">
							<Label className="font-semibold text-muted-foreground">Qual nota você dá para o produto?*</Label>
							<StarsRating onRatingStars={(value) => console.log(value)} />
						</div>

						<div className="space-y-1">
							<Label htmlFor="reviewTitle" className="font-semibold text-muted-foreground">
								Título da sua avaliação*
							</Label>
							<Input id="reviewTitle" {...register('reviewTitle')} />
						</div>

						<div className="space-y-1">
							<Label htmlFor="reviewText" className="font-bold text-muted-foreground">
								Escreva sua avaliação*
							</Label>
							<Textarea id="reviewText" maxLength={1000} {...register('reviewText')} />
							<div className="flex w-full justify-end">
								<small className="text-end text-muted-foreground">{watch('reviewText')?.length ?? 0}/1000</small>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Label className="font-semibold text-muted-foreground">Insira até 4 fotos do produto</Label>
							<Button type="button" size="icon" variant="outline">
								<ImagePlus />
							</Button>

							<small className="text-muted-foreground">
								Por favor, insira apenas imagens relacionadas ao produto. Formatos permitidos para imagens: JPEG ou PNG
								(10MB máximo).
							</small>
						</div>

						<div className="flex w-full justify-end">
							<Button type="submit">Avaliar</Button>
						</div>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
