import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../../../lib/prisma';
import { Prisma } from '@prisma/client';

interface IParamsProps {
	params: {
		user_id: string;
	};
}

const queryParamsSchema = z.object({
	unreadOnly: z.coerce.boolean(),
});

export async function GET(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { searchParams } = request.nextUrl;

	const { unreadOnly } = queryParamsSchema.parse({
		unreadOnly: searchParams.get('unreadOnly'),
	});

	const { user_id } = await params;
	const userId = z.string().uuid().parse(user_id);

	try {
		const query: Prisma.NotificationFindManyArgs = {
			where: {
				userId,
				readAt: unreadOnly ? null : undefined,
			},
		};

		const [notifications, amount] = await prisma.$transaction([
			prisma.notification.findMany({
				where: query.where,
			}),
			prisma.notification.count({
				where: query.where,
			}),
		]);

		return Response.json({
			notifications,
			amount,
		});
	} catch (error) {
		console.log('listing user notifications route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
