import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../../lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { id } = await params;
	const userId = z.string().parse(id);

	try {
		const address = await prisma.userAddress.findUnique({
			where: {
				id: userId,
			},
		});

		return Response.json(address);
	} catch (error) {
		console.log('get user address by address_id route error: ', error);
		return NextResponse.json({ message: 'Erro durante a consulta do endereço.' }, { status: 400 });
	}
}
