import { z } from 'zod';
import { render } from '@react-email/components';
import { NextRequest, NextResponse } from 'next/server';

import WelcomeEmail from '@emails/welcome-email';
import { mailTransport } from '@/app/utils/mails/mail-transport';

const bodySchema = z.object({
	to: z.string().email(),
	name: z.string(),
	site_link: z.string().url(),
});

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const data = await request.json();
	const dataParse = bodySchema.safeParse(data);

	if (!dataParse.success) {
		return NextResponse.json(
			{
				message: 'Erro ao preencher formulário. Por favor, verifique os dados e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { to, name, site_link } = dataParse.data;

	try {
		const emailHtml = await render(WelcomeEmail({ name, siteLink: site_link }));
		const emailPlainText = await render(WelcomeEmail({ name, siteLink: site_link }), {
			plainText: true,
		});

		const emailSenderResult = await mailTransport.sendMail({
			from: 'Sumaúma Móveis <mensageiro@sumaumamoveis.com.br>',
			to,
			subject: 'Bem-vindo(a) à Costante Bello!',
			text: emailPlainText,
			html: emailHtml,
		});

		console.log('Message sent %s', emailSenderResult);

		return Response.json(
			{
				message: emailSenderResult.messageId,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('email send router error: ', error);
		return NextResponse.json({ message: 'Erro durante o envio de e-mail.' }, { status: 400 });
	}
}
