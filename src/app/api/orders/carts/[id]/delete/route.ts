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
		return Response.json({ message: 'Método não permitido' }, { status: 405 });
	}

	const { id } = await params;
	const cartId = z.string().uuid().parse(id);

	try {
		const cart = await prisma.cart.delete({
			where: {
				id: cartId,
			},
		});

		return Response.json(
			{
				message: 'Carrinho deletado com sucesso',
				cart,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('delete cart route error: ', error);
		return NextResponse.json({ message: 'Erro ao tentar deletar o carrinho.' }, { status: 400 });
	}
}
