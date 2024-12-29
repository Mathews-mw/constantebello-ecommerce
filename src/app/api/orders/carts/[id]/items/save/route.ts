import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { updateCartItemsHandler } from '@/app/api/@handlers/update-cart-items-handler';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	user_id: z.string().uuid(),
	cart_items: z.array(
		z.object({
			product_id: z.string().uuid(),
			price: z.coerce.number(),
			quantity: z.coerce.number(),
		})
	),
});

export async function POST(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'POST') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { id } = await params;
	const cartId = z.string().uuid().parse(id);

	const data = await request.json();

	const dataParse = bodySchema.safeParse(data);

	if (!dataParse.success) {
		return NextResponse.json(
			{
				message: 'Erro na validação de dados. Por favor, verifique-os e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { user_id, cart_items } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
		});

		const cart = await prisma.cart.findUnique({
			where: {
				id: cartId,
			},
		});

		if (!user || !cart) {
			return NextResponse.json({ message: `Recurso não encontrado.` }, { status: 404 });
		}

		const itemsToUpdate = cart_items.map((item) => {
			return {
				productId: item.product_id,
				quantity: item.quantity,
				price: item.price,
			};
		});

		const result = await updateCartItemsHandler({ userId: user_id, updatedItems: itemsToUpdate });

		return Response.json(
			{
				message: 'Produtos adicionados ao carrinho com sucesso',
				result,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('save cart items route error: ', error);
		return NextResponse.json({ message: 'Erro durante a criação do pedido.' }, { status: 400 });
	}
}
