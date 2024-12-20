import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function DELETE(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'DELETE') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const id = z.string().parse(params.id);

	try {
		await prisma.user.delete({
			where: {
				id,
			},
		});

		return Response.json(
			{
				message: 'Usuário deletado com sucesso',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('delete user route error: ', error);
		return NextResponse.json(
			{ message: 'Erro durante  o processo de deletar usuário.' },
			{ status: 400 }
		);
	}
}
