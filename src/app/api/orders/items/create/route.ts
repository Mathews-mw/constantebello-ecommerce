import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	order_id: z.optional(z.string().uuid()),
	items: z.array(
		z.object({
			product_id: z.string().uuid(),
			price: z.coerce.number(),
			quantity: z.coerce.number(),
		})
	),
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
				message: 'Erro ao preencher formulário. Por favor, verifique os dados e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { user_id, order_id, items } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
		});

		if (!user) {
			return NextResponse.json({ message: `Recurso não encontrado.` }, { status: 404 });
		}

		const order = await prisma.order.findUnique({
			where: {
				id: order_id,
			},
		});

		const totalPriceOrder = items.reduce((acc, currentItem) => {
			return (acc += currentItem.price * currentItem.quantity);
		}, 0);

		if (!order) {
			const newOrder = await prisma.order.create({
				data: {
					totalPrice: totalPriceOrder,
					userId: user_id,
				},
			});

			for await (const item of items) {
				const product = await prisma.product.findUnique({
					where: {
						id: item.product_id,
					},
				});

				if (!product) {
					return NextResponse.json(
						{
							message: `O produto ${item.product_id} não foi encontrado, portanto, não foi possível concluir a operação.`,
						},
						{ status: 404 }
					);
				}

				await prisma.orderItem.create({
					data: {
						orderId: newOrder.id,
						priceAtPurchase: product.price,
						quantity: item.quantity,
						productId: product.id,
					},
				});
			}
		}

		if (order_id) {
			for await (const item of items) {
				const product = await prisma.product.findUnique({
					where: {
						id: item.product_id,
					},
				});

				if (!product) {
					return NextResponse.json(
						{
							message: `O produto ${item.product_id} não foi encontrado, portanto, não foi possível concluir a operação.`,
						},
						{ status: 404 }
					);
				}

				await prisma.orderItem.upsert({
					create: {
						orderId: order_id,
						priceAtPurchase: product.price,
						quantity: item.quantity,
						productId: product.id,
					},
					update: {
						priceAtPurchase: product.price,
						quantity: item.quantity,
					},
					where: {
						productId_orderId: {
							productId: product.id,
							orderId: order_id,
						},
					},
				});
			}
		}

		return Response.json(
			{
				message: 'Produto adicionado ao carrinho com sucesso',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create user route error: ', error);
		return NextResponse.json({ message: 'Erro durante o cadastro do usuário.' }, { status: 400 });
	}
}
