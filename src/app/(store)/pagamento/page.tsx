import { OrderSummary } from './order-summary';

export default function CheckoutPage() {
	return (
		<div className="mt-16 flex h-full w-full items-center justify-center lg:mt-0">
			<OrderSummary />
		</div>
	);
}
