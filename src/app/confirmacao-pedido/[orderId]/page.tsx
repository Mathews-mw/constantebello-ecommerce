import { Metadata } from 'next';
import { PageContent } from './page-content';

interface IPageProps {
	params: Promise<{
		orderId: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Confirmação do pedido',
};

export default async function PaymentConfirmationPage({ params }: IPageProps) {
	const { orderId } = await params;

	return <PageContent orderId={orderId} />;
}
