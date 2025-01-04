import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { OrderPaymentType } from '@prisma/client';
import { updateOrderItemsHandler } from '../../@handlers/update-order-items-handler';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	cart_id: z.string().uuid(),
	delivery_in: z.string(),
	discount: z.coerce.number().optional().default(0),
	delivery_fee: z.coerce.number().optional().default(0),
	payment_institution_order_id: z.string().optional(),
	payment_type: z.nativeEnum(OrderPaymentType),
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

	const { user_id, cart_id, payment_type, delivery_in, discount, delivery_fee, payment_institution_order_id } =
		dataParse.data;

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

		const subtotalOrder = cartItems.reduce((acc, currentItem) => {
			return (acc += currentItem.price * currentItem.quantity);
		}, 0);

		const order = await prisma.order.upsert({
			create: {
				id: cart.preOrderId,
				userId: user_id,
				subtotal: subtotalOrder,
				discount,
				deliveryFee: delivery_fee,
				paymentInstitutionOrderId: payment_institution_order_id,
				paymentType: payment_type,
				deliveryIn: delivery_in,
			},
			update: {
				userId: user_id,
				subtotal: subtotalOrder,
				discount,
				deliveryFee: delivery_fee,
				paymentType: payment_type,
				paymentInstitutionOrderId: payment_institution_order_id,
				deliveryIn: delivery_in,
			},
			where: {
				id: cart.preOrderId,
			},
		});

		const orderItemsToCreate = cartItems.map((item) => {
			return {
				productId: item.productId,
				quantity: item.quantity,
				priceAtPurchase: item.product.price,
			};
		});

		await updateOrderItemsHandler({
			orderId: order.id,
			updatedItems: orderItemsToCreate,
		});

		return Response.json(
			{
				message: 'Ordem gerada com sucesso',
				order,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('save order route error: ', error);
		return NextResponse.json({ message: 'Erro ao tentar gerar ordem.' }, { status: 400 });
	}
}
