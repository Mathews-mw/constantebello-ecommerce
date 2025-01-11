import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../../../lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	cep: z.string().optional(),
	street: z.string().optional(),
	number: z.string().optional(),
	neighborhood: z.string().optional(),
	address_complement: z.optional(z.string()),
	address_reference: z.optional(z.string()),
	city: z.string().optional(),
	state: z.string().optional(),
	is_principal: z.optional(z.coerce.boolean()),
});

export async function PUT(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PUT') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const addressId = z.string().parse(params.id);

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

	const { cep, street, number, neighborhood, address_complement, address_reference, city, state, is_principal } =
		dataParse.data;

	try {
		const address = await prisma.userAddress.findUnique({
			where: {
				id: addressId,
			},
		});

		if (!address) {
			return NextResponse.json({ message: 'Endereço não encontrado' }, { status: 404 });
		}

		await prisma.userAddress.update({
			data: {
				cep: cep ? cep.replace('-', '') : address.cep,
				street,
				number,
				neighborhood,
				addressComplement: address_complement,
				addressReference: address_reference,
				city,
				state,
				isMainAddress: is_principal,
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
		console.log('update user address route error: ', error);
		return NextResponse.json({ message: 'Erro durante a atualização de endereço.' }, { status: 400 });
	}
}
