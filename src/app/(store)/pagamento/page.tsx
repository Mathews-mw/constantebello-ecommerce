'use client';

import { useState } from 'react';
import { OrderSummary } from './order-summary';
import { PaymentsTypes } from './payments-types';
import { OrderPaymentType } from '@prisma/client';

export default function CheckoutPage() {
	const [selectedPayment, setSelectedPayment] = useState<OrderPaymentType | undefined>(undefined);
	console.log('selectedPayment: ', selectedPayment);

	return (
		<div>
			<div className="grid grid-cols-3 gap-8">
				<PaymentsTypes selectedPaymentType={selectedPayment} onSelectPaymentType={setSelectedPayment} />

				<OrderSummary paymentType={selectedPayment} />
			</div>
		</div>
	);
}
