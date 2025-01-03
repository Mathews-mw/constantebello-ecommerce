import WelcomeEmail from '@emails/welcome-email';
import { render } from '@react-email/components';
import { mailTransport } from './mail-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IProps {
	to: string;
	name: string;
	siteLink: string;
}

export async function sendWelcomeEmail({ to, name, siteLink }: IProps): Promise<SMTPTransport.SentMessageInfo> {
	const emailHtml = await render(WelcomeEmail({ name, siteLink }));
	const emailPlainText = await render(WelcomeEmail({ name, siteLink }), {
		plainText: true,
	});

	const emailSenderResult = await mailTransport.sendMail({
		from: 'Sumaúma Móveis <mensageiro@sumaumamoveis.com.br>',
		to,
		subject: 'Bem-vindo(a) à Costante Bello!',
		text: emailPlainText,
		html: emailHtml,
	});

	return emailSenderResult;
}
