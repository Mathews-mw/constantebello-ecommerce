import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	name: z.optional(z.string()),
	email: z.optional(z.string().email()),
	phone: z.optional(z.string()),
	cpf: z.optional(z.string()),
	birthday: z.optional(z.string()),
	policy_consent: z.optional(z.coerce.boolean()),
	advertising_consent: z.optional(z.coerce.boolean()),
	role: z.optional(z.nativeEnum(UserRole)),
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

	const data = await request.json();

	const { id } = await params;
	const userId = z.string().uuid().parse(id);

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

	const { name, email, cpf, birthday, phone, advertising_consent, policy_consent, role } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		const userInfos = await prisma.userInfo.findUnique({
			where: {
				userId,
			},
		});

		if (!user) {
			return NextResponse.json({ message: `Usuário não encontrado.` }, { status: 404 });
		}

		user.name = name ?? user.name;
		user.email = email ?? user.email;
		user.role = role ?? user.role;

		await prisma.user.update({
			data: user,
			where: {
				id: user.id,
			},
		});

		if (!userInfos) {
			if (!phone || !cpf || !birthday) {
				return NextResponse.json(
					{ message: 'Para atualizar o seu cadastro, por favor, preencha todos os dados do formulário' },
					{ status: 400 }
				);
			}

			await prisma.userInfo.create({
				data: {
					userId,
					phone: phone.trim().replace(' ', '').replace('-', '').replace('(', '').replace(')', ''),
					cpf: cpf.trim().replaceAll('.', '').replace('-', ''),
					birthday,
					advertisingConsent: advertising_consent,
				},
			});

			return Response.json(
				{
					message: 'Usuário atualizado com sucesso',
				},
				{ status: 200 }
			);
		}

		userInfos.phone = phone ?? userInfos.phone;
		userInfos.cpf = cpf ?? userInfos.cpf;
		userInfos.birthday = birthday ?? userInfos.birthday;
		userInfos.policyConsent = policy_consent ?? userInfos.policyConsent;
		userInfos.advertisingConsent = advertising_consent ?? userInfos.advertisingConsent;

		await prisma.userInfo.update({
			data: userInfos,
			where: {
				id: userInfos.id,
			},
		});

		return Response.json(
			{
				message: 'Usuário atualizado com sucesso',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('update user route error: ', error);
		return NextResponse.json({ message: 'Erro durante  atualização de usuário.' }, { status: 400 });
	}
}
