import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	name: z.optional(z.string()),
	email: z.optional(z.string().email()),
	role: z.optional(z.enum(['ADMIN', 'MODERADOR'])),
});

export async function PUT(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PUT') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const data = await request.json();

	const id = z.string().parse(params.id);
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

	const { name, email, role } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return NextResponse.json({ message: `Usuário não encontrado."` }, { status: 404 });
		}

		user.name = name ?? user.name;
		user.email = email ?? user.email;
		user.role = role ?? user.role;

		await prisma.user.update({
			data: user,
			where: {
				id: user.id,
			},
		});

		return Response.json(
			{
				message: 'Usuário atualizado com sucesso',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('update user route error: ', error);
		return NextResponse.json(
			{ message: 'Erro durante  atualização de usuário.' },
			{ status: 400 }
		);
	}
}
