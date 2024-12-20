import { z } from 'zod';
import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'node:crypto';

const bodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
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

	const { email, password, name } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			return NextResponse.json(
				{ message: `Usuário como e-mail "${email}" já está cadastrado.` },
				{ status: 400 }
			);
		}

		const hashPassword = await hash(password, 8);

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});

		await prisma.account.create({
			data: {
				userId: newUser.id,
				type: 'credentials',
				provider: 'credentials',
				providerAccountId: randomUUID(),
			},
		});

		return Response.json(
			{
				message: 'Usuário cadastrado com sucesso',
				user: {
					id: newUser.id,
					name: newUser.name,
					email: newUser.email,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create user route error: ', error);
		return NextResponse.json(
			{ message: 'Erro durante o cadastro do usuário.' },
			{ status: 400 }
		);
	}
}
