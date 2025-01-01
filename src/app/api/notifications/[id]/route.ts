import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

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
	const notificationId = z.string().uuid().parse(id);

	try {
		const notifications = await prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		});

		return Response.json(notifications);
	} catch (error) {
		console.log('get notification by id route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
