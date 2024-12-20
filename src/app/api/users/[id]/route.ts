import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	const id = z.string().parse(params.id);

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				customerInfos: true,
			},
		});

		if (!user) {
			return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
		}

		const { password, ...userWithoutPassword } = user;

		return Response.json(userWithoutPassword);
	} catch (error) {
		console.log('get user route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
