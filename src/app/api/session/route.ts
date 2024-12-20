import { z } from 'zod';
import dayjs from 'dayjs';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const EXPIRES_IN_DAYS = 7;
const EXPIRES_IN_DAYS_TIME = '7d';

export async function POST(request: NextRequest) {
	const data = await request.json();

	console.log('request: ', data);

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

	const { email, password: userPassword } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				sessions: true,
			},
		});

		if (!user) {
			return NextResponse.json({ message: 'credenciais inválidas!' }, { status: 401 });
		}

		if (user.password) {
			const passwordMatch = await compare(userPassword, user.password);

			if (!passwordMatch) {
				return NextResponse.json({ message: 'credenciais inválidas!' }, { status: 401 });
			}
		}

		const token = sign({}, env.SECRET_TOKEN, {
			subject: user.email,
			expiresIn: EXPIRES_IN_DAYS_TIME,
		});

		const { password, ...userWithoutPassword } = user;

		const expiresIn = dayjs().add(EXPIRES_IN_DAYS, 'day');

		await prisma.session.create({
			data: {
				userId: user.id,
				sessionToken: token,
				expires: expiresIn.toDate(),
			},
		});

		return Response.json({
			user: userWithoutPassword,
			token,
		});
	} catch (error) {
		console.log('session route error: ', error);
		return NextResponse.json({ message: 'Erro de autenticação.' }, { status: 400 });
	}
}
