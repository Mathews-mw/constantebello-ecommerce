import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface Items {
	productId: string;
	quantity: number;
	price: number;
}

interface IRequest {
	userId: string;
	updatedItems: Array<Items>;
}

/**
 * Atualiza os itens do carrinho com base na lista recebida.
 * @param userId ID do usuário.
 * @param updatedItems Array de itens do carrinho recebidos na requisição.
 */
export async function updateCartItemsHandler({ userId, updatedItems }: IRequest) {
	const cart = await prisma.cart.findUnique({
		where: {
			userId,
		},
		include: {
			cartItems: true,
		},
	});

	if (!cart) {
		throw new Error('Carrinho não encontrado.');
	}

	const currentItemsMap = new Map(cart.cartItems.map((item) => [item.productId, item]));

	const itemsToUpdate: Array<{ id: string; quantity: number }> = [];
	const itemsToCreate: Array<Prisma.CartItemUncheckedCreateInput> = [];
	const itemsToDelete: string[] = [];

	updatedItems.forEach((item) => {
		const existingItem = currentItemsMap.get(item.productId);

		if (existingItem) {
			itemsToUpdate.push({ id: existingItem.id, quantity: item.quantity });

			// remove do map os itens que já foram processados (validos ou atualizados), garantindo que no final o currentItemsMap contenha apenas os itens que devem ser excluídos.
			currentItemsMap.delete(item.productId);
		} else {
			itemsToCreate.push({ cartId: cart.id, productId: item.productId, quantity: item.quantity, price: item.price });
		}
	});

	// Caso seja 0, significa que a o carrinho está sendo recém criado.
	if (currentItemsMap.size > 0) {
		const currentItemsMapValuesArray = [...currentItemsMap.values()];
		itemsToDelete.push(...currentItemsMapValuesArray.map((item) => item.id));
	}

	const transactions = [];

	// Atualizar os itens existentes
	if (itemsToUpdate.length > 0) {
		transactions.push(
			...itemsToUpdate.map((item) => {
				return prisma.cartItem.update({
					data: {
						quantity: item.quantity,
					},
					where: {
						id: item.id,
					},
				});
			})
		);
	}

	// Cria novos items
	if (itemsToCreate.length > 0) {
		transactions.push(prisma.cartItem.createMany({ data: itemsToCreate }));
	}

	// Deleta itens removidos
	if (itemsToDelete.length > 0) {
		transactions.push(
			prisma.cartItem.deleteMany({
				where: {
					id: { in: itemsToDelete },
				},
			})
		);
	}

	await prisma.$transaction(transactions);

	return { updated: itemsToUpdate, deleted: itemsToDelete, created: itemsToCreate };
}
