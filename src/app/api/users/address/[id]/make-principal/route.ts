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

	const addressId = z.string().parse(params.id);

	try {
		const address = await prisma.userAddress.findUnique({
			where: {
				id: addressId,
			},
			include: {
				userInfo: true,
			},
		});

		if (!address) {
			return NextResponse.json({ message: 'Endereço não encontrado' }, { status: 404 });
		}

		await prisma.userAddress.updateMany({
			data: {
				isMainAddress: false,
			},
			where: {
				isMainAddress: true,
			},
		});

		await prisma.userAddress.update({
			data: {
				isMainAddress: true,
			},
			where: {
				id: addressId,
			},
		});

		return Response.json(
			{
				message: 'endereço atualizado com sucesso',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('update user address route error: ', error);
		return NextResponse.json({ message: 'Erro durante a atualização de endereço.' }, { status: 400 });
	}
}
