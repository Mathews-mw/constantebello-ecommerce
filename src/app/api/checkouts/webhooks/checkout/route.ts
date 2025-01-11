import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { prisma } from '../../../../../lib/prisma';

// Webhooks de checkout ocorrem quando o status do checkout muda.

export async function POST(request: NextRequest) {
	const data = await request.json();

	console.log('pagbank checkout webhook notification: ', data);

	try {
		return Response.json(
			{
				message: 'Operação concluída com sucesso.',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('order notification route error: ', error);
		return new Response('Ops! Parece que algo deu errado.', {
			status: 400,
		});
	}
}
