import { z } from 'zod';
import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

const PASSWORD_RESET = 'sindagente@99';

export async function PATCH(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PATCH') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const id = z.string().parse(params.id);

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return NextResponse.json({ message: `Usuário não encontrado."` }, { status: 404 });
		}

		const hashedPassword = await hash(PASSWORD_RESET, 8);

		user.password = hashedPassword;

		await prisma.user.update({
			data: user,
			where: {
				id: user.id,
			},
		});

		return Response.json(
			{
				message: 'Senha redefinida com sucesso',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('Reset user password route error: ', error);
		return NextResponse.json(
			{ message: 'Erro durante  a redefinição de senha do usuário.' },
			{ status: 400 }
		);
	}
}
