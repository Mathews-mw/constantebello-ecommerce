import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { OrderPaymentType, Prisma } from '@prisma/client';
import { pagBankAPI } from '@/lib/pagbank/pagbank-api';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';
import { env } from '@/env';

const bodySchema = z.object({
	user_id: z.string().uuid(),
	cart_id: z.string().uuid(),
	delivery_in: z.string(),
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

	const { user_id, cart_id, payment_type, delivery_in } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
			include: {
				userInfos: true,
			},
		});

		const cart = await prisma.cart.findUnique({
			where: {
				id: cart_id,
			},
		});

		const address = await prisma.userAddress.findUnique({
			where: {
				id: delivery_in,
			},
		});

		if (!user || !cart || !address) {
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

		const checkoutItems = cartItems.map((item) => {
			return {
				reference_id: item.productId,
				name: item.product.name,
				quantity: item.quantity,
				unit_amount: item.price * 100,
				image_url: item.product.imageUrl,
			};
		});

		const preOrderId = cart.preOrderId;
		const expirationDate = dayjs().add(1, 'day');

		const addressComplement =
			address.addressComplement || address.addressReference
				? `${address.addressComplement} ${address.addressReference}`
				: 'N/A';

		const { data: pagBankResponse } = await pagBankAPI.post<IPagBankCreateCheckoutResponse>('/checkouts', {
			reference_id: preOrderId,
			customer_modifiable: false,
			expiration_date: expirationDate.toDate(),
			customer: {
				name: user.name,
				email: user.email,
				tax_id: user.userInfos?.cpf,
				phone: {
					country: '+55',
					area: user.userInfos?.phone.slice(0, 2),
					number: user.userInfos?.phone.slice(2),
				},
			},
			shipping: {
				type: 'FREE',
				amount: 0,
				address: {
					country: 'BRA',
					region_code: address.state,
					city: address.city,
					postal_code: address.cep,
					street: address.street,
					number: address.number,
					locality: address.neighborhood,
					complement: addressComplement,
				},
				address_modifiable: false,
			},
			items: checkoutItems,
			payment_methods: [
				{
					type: 'CREDIT_CARD',
					brands: ['MASTERCARD', 'VISA'],
				},
				{
					type: 'DEBIT_CARD',
					brands: ['VISA'],
				},
				{
					type: 'PIX',
				},
				{
					type: 'BOLETO',
				},
			],
			soft_descriptor: 'Constate Bello',
			redirect_url: `${env.PAGBANK_EVENT_URL}/confirmacao-pedido/${preOrderId}`,
			return_url: `${env.PAGBANK_EVENT_URL}/pagamento`,
			notification_urls: [`${env.PAGBANK_EVENT_URL}/api/checkouts/webhooks/checkout`],
			payment_notification_urls: [`${env.PAGBANK_EVENT_URL}/api/checkouts/webhooks/transactional`],
		});

		console.log('pagBankResponse: ', pagBankResponse);

		const checkout = await prisma.checkout.upsert({
			create: {
				referenceId: preOrderId,
				paymentInstitutionCheckoutId: pagBankResponse.id,
				status: pagBankResponse.status,
				expirationDate: expirationDate.toDate(),
			},
			update: {
				paymentInstitutionCheckoutId: pagBankResponse.id,
				status: pagBankResponse.status,
				expirationDate: expirationDate.toDate(),
			},
			where: {
				referenceId: preOrderId,
			},
		});

		const paymentLink = pagBankResponse.links.find((link) => link.rel === 'PAY');
		const inactiveLink = pagBankResponse.links.find((link) => link.rel === 'INACTIVATE');
		const selfLink = pagBankResponse.links.find((link) => link.rel === 'SELF');

		return Response.json(
			{
				payment_link: paymentLink?.href,
				inactive_link: inactiveLink?.href,
				self_link: selfLink?.href,
				checkout,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create order route error: ', error);

		if (error instanceof AxiosError) {
			console.log('order route axios error: ', error.response?.data);
		}

		return NextResponse.json({ message: 'Erro ao tentar gerar ordem.' }, { status: 400 });
	}
}