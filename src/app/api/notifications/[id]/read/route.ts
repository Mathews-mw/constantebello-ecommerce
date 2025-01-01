import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function PATCH(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PATCH') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { id } = await params;
	const notificationId = z.string().uuid().parse(id);

	try {
		const notification = await prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		});

		if (!notification) {
			return NextResponse.json({ message: `Recurso não encontrado."` }, { status: 404 });
		}

		await prisma.notification.update({
			data: {
				readAt: new Date(),
			},
			where: {
				id: notificationId,
			},
		});

		return Response.json({ status: 204 });
	} catch (error) {
		console.log('get notification by id route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
