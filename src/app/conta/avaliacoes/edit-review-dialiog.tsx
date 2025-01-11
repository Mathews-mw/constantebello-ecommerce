'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { errorToasterHandler } from '../../utils/error-toaster-handler';

import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { ErrorMessage } from '../../../components/error-message';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';

import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { StarsRating } from '../../../components/rating/stars-rating';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { ProductReview } from '@prisma/client';
import { updateUserReview } from '../../api/@requests/reviews/update-user-review';

import { ImagePlus, Loader2, SquarePen } from 'lucide-react';

interface IProps {
	review: ProductReview;
}

const reviewFormSchema = z.object({
	reviewTitle: z.string().min(1, { message: 'Por favor, preencha o título da sua avaliação' }),
	reviewText: z
		.string()
		.min(1, { message: 'Por favor, preencha o texto da sua avaliação' })
		.max(1000, { message: 'Texto de 1000 caracteres no máximo' }),
});

type ReviewInputData = z.infer<typeof reviewFormSchema>;

export function EditReviewDialog({ review }: IProps) {
	const {
		handleSubmit,
		register,
		watch,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<ReviewInputData>({
		resolver: zodResolver(reviewFormSchema),
		defaultValues: {
			reviewTitle: review.reviewTitle,
			reviewText: review.reviewText,
		},
	});

	const [isOpen, setIsOpen] = useState(false);
	const [reviewScore, setReviewScore] = useState<number>(review.score);
	const [reviewScoreErrorMsg, setReviewScoreErrorMsg] = useState('');

	const useQuery = useQueryClient();

	const { mutateAsync: updateUserReviewFn, isPending } = useMutation({
		mutationFn: updateUserReview,
		onSuccess: async () => {
			await useQuery.invalidateQueries({ queryKey: ['user-products-review', review.userId] });
		},
	});

	async function handleReviewForm(data: ReviewInputData) {
		if (!reviewScore) {
			setReviewScoreErrorMsg('Por favor, você precisa selecionar uma nota para a sua avaliação');
			return;
		} else {
			setReviewScoreErrorMsg('');
		}

		try {
			await updateUserReviewFn({
				reviewId: review.id,
				score: reviewScore,
				reviewTitle: data.reviewTitle,
				reviewText: data.reviewText,
			});

			reset();
			setIsOpen(false);
			toast.success('Avaliação atualizada com sucesso');
		} catch (error) {
			console.log('handleAddAddressForm error: ', error);
			errorToasterHandler(error);
		}
	}

	return (
		<Dialog modal open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="outline">
					<SquarePen />
					Editar
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full md:min-w-[640px]">
				<ScrollArea className="max-h-[80vh] overflow-y-auto pr-4">
					<DialogHeader className="mb-4 space-y-2 px-1">
						<DialogTitle>Editar avaliação</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit(handleReviewForm)} className="space-y-1 px-1">
						<div className="flex flex-col gap-2">
							<Label className="font-semibold text-muted-foreground">Qual nota você dá para o produto?*</Label>
							<StarsRating onRatingStars={setReviewScore} defaultValue={review.score} />
							<ErrorMessage message={reviewScoreErrorMsg} />
						</div>

						<div className="space-y-1">
							<Label htmlFor="reviewTitle" className="font-semibold text-muted-foreground">
								Título da sua avaliação*
							</Label>
							<Input id="reviewTitle" {...register('reviewTitle')} />
							<ErrorMessage message={errors.reviewTitle?.message} />
						</div>

						<div className="space-y-1">
							<Label htmlFor="reviewText" className="font-bold text-muted-foreground">
								Escreva sua avaliação*
							</Label>
							<Textarea id="reviewText" maxLength={1000} {...register('reviewText')} />
							<div className="flex w-full justify-end">
								<small className="text-end text-muted-foreground">{watch('reviewText')?.length ?? 0}/1000</small>
							</div>
							<ErrorMessage message={errors.reviewText?.message} />
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
							<Button type="submit" disabled={isPending || isSubmitting}>
								{isPending && <Loader2 className="animate-spin" />}
								Salvar
							</Button>
						</div>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
