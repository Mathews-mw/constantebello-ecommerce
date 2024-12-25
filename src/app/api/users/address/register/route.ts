import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	cep: z.string(),
	street: z.string(),
	number: z.string(),
	neighborhood: z.string(),
	address_complement: z.optional(z.string()),
	address_reference: z.optional(z.string()),
	city: z.string(),
	state: z.string(),
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

	const { user_id, cep, street, number, neighborhood, address_complement, address_reference, city, state } =
		dataParse.data;

	try {
		const userInfos = await prisma.userInfo.findUnique({
			where: {
				userId: user_id,
			},
		});

		if (!userInfos) {
			return NextResponse.json(
				{
					message: 'Cliente não encontrado. Por favor, verifique os dados preenchidos',
				},
				{ status: 400 }
			);
		}

		await prisma.userAddress.create({
			data: {
				userInfoId: userInfos.id,
				cep: cep.replace('-', ''),
				street,
				number,
				neighborhood,
				addressComplement: address_complement,
				addressReference: address_reference,
				city,
				state,
			},
		});

		return Response.json(
			{
				message: 'endereço registrado com sucesso',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('register customer address route error: ', error);
		return NextResponse.json({ message: 'Erro durante o cadastro de endereço.' }, { status: 400 });
	}
}
