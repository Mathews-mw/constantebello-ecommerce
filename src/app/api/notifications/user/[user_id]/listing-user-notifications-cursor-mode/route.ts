import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../../../lib/prisma';

interface IParamsProps {
	params: {
		user_id: string;
	};
}

const queryParamsSchema = z.object({
	cursor: z.optional(z.string()).nullish(),
	limit: z.coerce.number(),
	skip: z.optional(z.number()).nullish(),
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

	const { limit, cursor, skip } = queryParamsSchema.parse({
		cursor: searchParams.get('cursor'),
		limit: searchParams.get('limit'),
		skip: searchParams.get('skip'),
	});

	const { user_id } = await params;
	const userId = z.string().uuid().parse(user_id);

	try {
		const notifications = await prisma.notification.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: skip ?? undefined,
			take: limit + 1,
			cursor: cursor
				? {
						id: cursor,
					}
				: undefined,
		});

		let nextCursor: string | undefined;
		let previousCursor: string | undefined;

		if (notifications.length > limit) {
			previousCursor = notifications[0].id;

			const nextItem = notifications.pop();
			nextCursor = nextItem?.id;
		}

		return Response.json({
			nextCursor,
			previousCursor,
			notifications,
		});
	} catch (error) {
		console.log('listing user notifications cursor mode route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
