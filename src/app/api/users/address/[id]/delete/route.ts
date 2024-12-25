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

		await prisma.userAddress.delete({
			where: {
				id: addressId,
			},
		});

		return Response.json(
			{
				message: 'endereço removido com sucesso',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('delete customer address route error: ', error);
		return NextResponse.json({ message: 'Erro ao tentar remover endereço.' }, { status: 400 });
	}
}
