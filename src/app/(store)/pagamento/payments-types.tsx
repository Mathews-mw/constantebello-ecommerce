'use client';

import { twMerge } from 'tailwind-merge';
import { OrderPaymentType } from '@prisma/client';

import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PixFiledCustomIcon } from '@/components/custom-icons/pix-filled-custom-icon';

import { CreditCard, HandCoins, ScanBarcode } from 'lucide-react';

interface IPaymentsTypesProps {
	selectedPaymentType: OrderPaymentType | undefined;
	onSelectPaymentType: (value: OrderPaymentType) => void;
}

export function PaymentsTypes({ selectedPaymentType, onSelectPaymentType }: IPaymentsTypesProps) {
	return (
		<div className="col-span-2 h-min space-y-8 rounded-lg bg-background p-6 shadow-sm">
			<div className="flex items-center gap-2">
				<HandCoins className="h-6 w-6 text-primary" />
				<h2 className="font-black">FORMAS DE PAGAMENTO</h2>
			</div>

			<RadioGroup value={selectedPaymentType} onValueChange={onSelectPaymentType} className="space-y-4">
				<div className="group flex items-center" data-selected={selectedPaymentType === OrderPaymentType.PIX}>
					<RadioGroupItem value={OrderPaymentType.PIX} id={OrderPaymentType.PIX} className="hidden" />
					<label
						htmlFor={OrderPaymentType.PIX}
						className={twMerge([
							'w-full cursor-pointer space-y-2 rounded border border-l-4 p-2 text-muted-foreground',
							'group-data-[selected=true]:border-primary group-data-[selected=true]:bg-primary/10 group-data-[selected=true]:text-foreground',
						])}
					>
						<div className="flex w-full items-center justify-between px-2 py-1">
							<span className="font-bold">PIX</span>
							<PixFiledCustomIcon className="fill-muted-foreground group-data-[selected=true]:fill-primary" />
						</div>

						<Separator />

						<div>
							<p className="text-sm text-muted-foreground">Até 10% de desconto com aprovação imediata.</p>
						</div>
					</label>
				</div>

				<div
					className="group flex items-center"
					data-selected={selectedPaymentType === OrderPaymentType.CARTAO_CREDITO}
				>
					<RadioGroupItem
						value={OrderPaymentType.CARTAO_CREDITO}
						id={OrderPaymentType.CARTAO_CREDITO}
						className="hidden"
					/>
					<label
						htmlFor={OrderPaymentType.CARTAO_CREDITO}
						className={twMerge([
							'w-full cursor-pointer rounded border border-l-4 p-2 text-muted-foreground',
							'group-data-[selected=true]:border-primary group-data-[selected=true]:bg-primary/10 group-data-[selected=true]:text-foreground',
						])}
					>
						<div className="flex w-full items-center justify-between px-2 py-1">
							<span className="font-bold">CARTÃO DE CRÉDITO</span>
							<CreditCard
								className={twMerge([
									'h-8 w-8 fill-muted-foreground text-background',
									'group-data-[selected=true]:fill-primary group-data-[selected=true]:text-rose-100',
								])}
							/>
						</div>
					</label>
				</div>

				<div className="group flex items-center" data-selected={selectedPaymentType === OrderPaymentType.BOLETO}>
					<RadioGroupItem value={OrderPaymentType.BOLETO} id={OrderPaymentType.BOLETO} className="hidden" />
					<label
						htmlFor={OrderPaymentType.BOLETO}
						className={twMerge([
							'w-full cursor-pointer rounded border border-l-4 p-2 text-muted-foreground',
							'group-data-[selected=true]:border-primary group-data-[selected=true]:bg-primary/10 group-data-[selected=true]:text-foreground',
						])}
					>
						<div className="flex w-full items-center justify-between px-2 py-1">
							<span className="font-bold">BOLETO BANCÁRIO</span>
							<ScanBarcode className="h-8 w-8 text-muted-foreground group-data-[selected=true]:text-primary" />
						</div>
					</label>
				</div>
			</RadioGroup>
		</div>
	);
}
