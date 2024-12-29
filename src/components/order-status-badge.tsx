import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const orderStatus = tv({
	base: 'flex h-min w-min items-center justify-center text-nowrap rounded-sm px-2 py-px',
	variants: {
		status: {
			PAYMENT_CONFIRMED: 'bg-sky-200 text-sky-700',
			PENDING: 'bg-orange-200 text-orange-700',
			COMPLETED: 'bg-emerald-200 text-emerald-700',
			CANCELLED: 'bg-rose-200 text-rose-700',
			AWAITING_PAYMENT: 'bg-amber-200 text-amber-700',
		},
	},

	defaultVariants: {
		status: 'PENDING',
	},
});

interface IProps {
	text: string;
}

export type StatusProps = ComponentProps<'div'> & VariantProps<typeof orderStatus> & IProps;

export function OrderStatusBadge({ status, className, text, ...props }: StatusProps) {
	return (
		<div className={orderStatus({ status, className })} {...props}>
			<span className="text-sm font-bold">{text}</span>
		</div>
	);
}
