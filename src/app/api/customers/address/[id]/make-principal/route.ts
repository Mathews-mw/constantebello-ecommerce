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
		const address = await prisma.customerAddress.findUnique({
			where: {
				id: addressId,
			},
			include: {
				customerInfo: true,
			},
		});

		if (!address) {
			return NextResponse.json({ message: 'Endereço não encontrado' }, { status: 404 });
		}

		await prisma.customerAddress.updateMany({
			data: {
				isPrincipal: false,
			},
			where: {
				isPrincipal: true,
			},
		});

		await prisma.customerAddress.update({
			data: {
				isPrincipal: true,
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
		console.log('update customer address route error: ', error);
		return NextResponse.json(
			{ message: 'Erro durante a atualização de endereço.' },
			{ status: 400 }
		);
	}
}
