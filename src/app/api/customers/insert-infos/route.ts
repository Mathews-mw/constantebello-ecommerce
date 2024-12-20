import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	phone: z.string(),
	cpf: z.string(),
	birthday: z.string(),
	policy_consent: z.coerce.boolean(),
	advertising_consent: z.optional(z.coerce.boolean()),
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
				message:
					'Erro ao preencher formulário. Por favor, verifique os dados e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { user_id, cpf, birthday, phone, policy_consent, advertising_consent } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
		});

		if (!user) {
			return NextResponse.json({ message: `Usuário não encontrado.` }, { status: 404 });
		}

		await prisma.customerInfo.create({
			data: {
				userId: user_id,
				phone,
				cpf,
				birthday,
				policyConsent: policy_consent,
				advertisingConsent: advertising_consent,
			},
		});

		return Response.json(
			{
				message: 'Informações do usuário cadastrada com sucesso',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create customer infos route error: ', error);
		return NextResponse.json(
			{ message: 'Erro durante o cadastro das informações do usuário.' },
			{ status: 400 }
		);
	}
}
