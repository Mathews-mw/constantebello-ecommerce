import { render } from '@react-email/components';
import { mailTransport } from './mail-transport';
import ReceiptEmail from '@emails/receipt-email';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IProps {
	to: string;
	name: string;
	orderId: string;
	orderLink: string;
	address: string;
	total: number;
	subtotal: number;
	discount: number;
	deliveryFee: number;
	products: Array<{
		id: string;
		img: string;
		name: string;
		size: string;
		quantity: number;
		price: number;
	}>;
}

export async function sendReceiptEmail({
	to,
	name,
	orderId,
	orderLink,
	address,
	total,
	subtotal,
	discount,
	deliveryFee,
	products,
}: IProps): Promise<SMTPTransport.SentMessageInfo> {
	const emailHtml = await render(
		ReceiptEmail({ name, orderId, orderLink, address, total, subtotal, discount, deliveryFee, products })
	);
	const emailPlainText = await render(
		ReceiptEmail({ name, orderId, orderLink, address, total, subtotal, discount, deliveryFee, products }),
		{
			plainText: true,
		}
	);

	const emailSenderResult = await mailTransport.sendMail({
		from: 'Sumaúma Móveis <mensageiro@sumaumamoveis.com.br>',
		to,
		subject: 'Pedido aprovado!',
		text: emailPlainText,
		html: emailHtml,
	});

	console.log('send email response: ', emailSenderResult);

	return emailSenderResult;
}
