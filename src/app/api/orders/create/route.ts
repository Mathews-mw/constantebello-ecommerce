import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	cart_id: z.string().uuid(),
});

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

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

	const { user_id, cart_id } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
		});

		const cart = await prisma.cart.findUnique({
			where: {
				id: cart_id,
			},
		});

		if (!user || !cart) {
			return NextResponse.json({ message: `Recurso não encontrado.` }, { status: 404 });
		}

		const cartItems = await prisma.cartItem.findMany({
			where: {
				cartId: cart_id,
			},
			include: {
				product: true,
			},
		});

		const totalPriceOrder = cartItems.reduce((acc, currentItem) => {
			return (acc += currentItem.price * currentItem.quantity);
		}, 0);

		const order = await prisma.order.create({
			data: {
				userId: user_id,
				totalPrice: totalPriceOrder,
			},
		});

		const orderItemsToCreate: Array<Prisma.OrderItemUncheckedCreateInput> = cartItems.map((item) => {
			return {
				orderId: order.id,
				productId: item.productId,
				priceAtPurchase: item.product.price,
				quantity: item.quantity,
			};
		});

		await prisma.orderItem.createMany({
			data: orderItemsToCreate,
		});

		return Response.json(
			{
				message: 'Ordem gerada com sucesso',
				order,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create order route error: ', error);
		return NextResponse.json({ message: 'Erro ao tentar gerar ordem.' }, { status: 400 });
	}
}
