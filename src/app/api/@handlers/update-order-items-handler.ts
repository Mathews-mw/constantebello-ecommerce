import { prisma } from '../../../lib/prisma';
import { Prisma } from '@prisma/client';

interface Items {
	productId: string;
	productModelId: string;
	productSizeId: string;
	quantity: number;
	priceAtPurchase: number;
}

interface IRequest {
	orderId: string;
	updatedItems: Array<Items>;
}

/**
 * Atualiza os itens di pedido com base na lista recebida.
 * @param orderId ID do pedido (order).
 * @param updatedItems Array de itens do carrinho recebidos na requisição.
 */
export async function updateOrderItemsHandler({ orderId, updatedItems }: IRequest) {
	const orderItems = await prisma.orderItem.findMany({
		where: {
			orderId,
		},
	});

	const currentItemsMap = new Map(orderItems.map((item) => [item.productSizeId, item]));

	const itemsToUpdate: Array<{ id: string; quantity: number }> = [];
	const itemsToCreate: Array<Prisma.OrderItemUncheckedCreateInput> = [];
	const itemsToDelete: string[] = [];

	updatedItems.forEach((item) => {
		const existingItem = currentItemsMap.get(item.productSizeId);

		if (existingItem) {
			itemsToUpdate.push({ id: existingItem.id, quantity: item.quantity });

			// remove do map os itens que já foram processados (validos ou atualizados), garantindo que no final o currentItemsMap contenha apenas os itens que devem ser excluídos.
			currentItemsMap.delete(item.productSizeId);
		} else {
			itemsToCreate.push({
				orderId,
				productId: item.productId,
				productModelId: item.productModelId,
				productSizeId: item.productSizeId,
				quantity: item.quantity,
				priceAtPurchase: item.priceAtPurchase,
			});
		}
	});

	// Caso seja 0, significa que a o pedido está sendo recém criado.
	if (currentItemsMap.size > 0) {
		const currentItemsMapValuesArray = [...currentItemsMap.values()];
		itemsToDelete.push(...currentItemsMapValuesArray.map((item) => item.id));
	}

	const transactions = [];

	// Atualizar os itens existentes
	if (itemsToUpdate.length > 0) {
		transactions.push(
			...itemsToUpdate.map((item) => {
				return prisma.orderItem.update({
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
		transactions.push(prisma.orderItem.createMany({ data: itemsToCreate }));
	}

	// Deleta itens removidos
	if (itemsToDelete.length > 0) {
		transactions.push(
			prisma.orderItem.deleteMany({
				where: {
					id: { in: itemsToDelete },
				},
			})
		);
	}

	await prisma.$transaction(transactions);

	return { updated: itemsToUpdate, deleted: itemsToDelete, created: itemsToCreate };
}
