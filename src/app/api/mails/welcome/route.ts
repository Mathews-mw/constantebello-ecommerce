import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { sendWelcomeEmail } from '../../../utils/mails/send-welcome-email';

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
		const emailSenderResult = await sendWelcomeEmail({
			to,
			name,
			siteLink: 'https://www.google.com/',
		});

		return Response.json(
			{
				messageId: emailSenderResult.messageId,
				accepted: emailSenderResult.accepted,
				rejected: emailSenderResult.rejected,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('email send router error: ', error);
		if (error instanceof Error) {
			return NextResponse.json({ message: 'Erro durante o envio de e-mail.', error: error.message }, { status: 400 });
		}

		return NextResponse.json({ message: 'Erro durante o envio de e-mail.' }, { status: 500 });
	}
}
