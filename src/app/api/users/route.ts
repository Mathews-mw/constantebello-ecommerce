import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
	try {
		const [users, count] = await prisma.$transaction([
			prisma.user.findMany({
				orderBy: {
					name: 'asc',
				},
			}),
			prisma.user.count(),
		]);

		return Response.json({
			users,
			count,
		});
	} catch (error) {
		console.error('Listing users route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
