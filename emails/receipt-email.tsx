import * as React from 'react';
import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Row,
	Section,
	Text,
	Tailwind,
	Hr,
} from '@react-email/components';

interface WelcomeEmailProps {
	name: string;
	orderId: string;
	orderLink: string;
	address: string;
	total: number;
	subtotal: number;
	discount: number;
	deliveryFee: number;
	products: Array<{
		id: string;
		img: string;
		name: string;
		size: string;
		quantity: number;
		price: number;
	}>;
}

export default function ReceiptEmail({
	name,
	orderId,
	orderLink,
	address,
	total,
	subtotal,
	discount,
	deliveryFee,
	products,
}: WelcomeEmailProps) {
	return (
		<Html>
			<Head />
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								brand: '#f43f5e',
								offwhite: '#fafbfb',
							},
							spacing: {
								0: '0px',
								20: '20px',
								45: '45px',
							},
						},
					},
				}}
			>
				<Body className="bg-offwhite font-sans text-base">
					<Img
						src="https://1drv.ms/i/s!AvTMsh8dt1IIt-gDjU3K4ONAbeC0Nw?embed=1&width=296&height=65"
						width="296"
						height="65"
						alt="Costate Bello"
						className="mx-auto my-20"
					/>
					<Container className="p-45 bg-white">
						<Heading className="my-0 text-center text-2xl leading-8">Obrigado(a) por comprar conosco!</Heading>

						<Section>
							<Row>
								<Text className="text-base font-bold">{name}</Text>

								<Text className="text-justify text-base">
									Seu pagamento foi confirmado e seu pedido já está sendo processado. Estamos preparando tudo para
									entregar o seu móvel o mais rápido possível para você.
								</Text>

								<Text className="text-justify text-base">
									Não se preocupe, iremos notifica-lo quando seu pedido estiver em rota de entrega. Fique de olho no seu
									e-mail e telefone.
								</Text>
							</Row>
						</Section>

						<Hr className="my-[16px] border-t-2 border-gray-300" />

						<Section>
							<Text className="m-0 p-0 text-base font-bold">Detalhes do seu pedido</Text>

							<Row className="my-2 rounded-[8px] bg-zinc-200 p-2">
								<Column>
									<Text className="m-0 p-0">ID do pedido</Text>
								</Column>
								<Column align="right">
									<Text className="m-0 p-0 font-bold">{orderId}</Text>
								</Column>
							</Row>

							<Row className="my-2">
								<Text className="m-0 p-0 font-semibold">Endereço de entrega</Text>

								<Text className="m-0 p-0">{address}</Text>
							</Row>
						</Section>

						<Section className="box-border rounded-[8px] border border-solid border-zinc-200 p-2">
							{products?.map((product) => {
								return (
									<Row key={product.id} className="mt-2">
										<Column>
											<Img src={product.img} alt={product.name} width={80} height={80} />
										</Column>

										<Column className="m-0 flex flex-col pl-2">
											<Text title={product.name} className="m-0 line-clamp-1 p-0 text-sm font-semibold">
												{product.name}
											</Text>
											<Text className="m-0 p-0 text-xs">Qnt: {product.quantity}</Text>
											<Text className="m-0 p-0 text-xs">{product.size}</Text>
											<Text className="m-0 p-0 text-sm font-semibold">
												{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
											</Text>
										</Column>
									</Row>
								);
							})}

							<Hr className="my-[16px] border-t-2 border-gray-300" />

							<Row className="m-0 p-0">
								<Column>
									<Text className="m-0 p-0">Subtotal</Text>
								</Column>
								<Column align="right">
									<Text className="m-0 p-0 font-semibold">
										{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
									</Text>
								</Column>
							</Row>

							<Hr className="my-[16px] border-t-2 border-gray-300" />

							<Row className="m-0 p-0">
								<Column>
									<Text className="m-0 p-0">Descontos</Text>
								</Column>
								<Column align="right">
									<Text className="m-0 p-0 font-semibold">
										{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
									</Text>
								</Column>
							</Row>

							<Hr className="my-[16px] border-t-2 border-gray-300" />

							<Row className="m-0 p-0">
								<Column>
									<Text className="m-0 p-0">Entrega</Text>
								</Column>
								<Column align="right">
									<Text className="m-0 p-0 font-semibold">
										{deliveryFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
									</Text>
								</Column>
							</Row>

							<Hr className="my-[16px] border-t-2 border-gray-300" />

							<Row className="m-0">
								<Column>
									<Text className="m-0 p-0 font-semibold">Total</Text>
								</Column>
								<Column align="right">
									<Text className="m-0 p-0 font-bold">
										{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
									</Text>
								</Column>
							</Row>
						</Section>

						<Section className="mt-4 text-center">
							<Button href={orderLink} className="bg-brand rounded-lg px-4 py-3 text-white">
								Detalhes do Pedido
							</Button>
						</Section>

						<Hr className="my-[16px] border-t-2 border-gray-300" />

						<Section>
							<Row>
								<Text className="text-justify text-base">
									Se precisar de ajuda ou tiver alguma dúvida, nossa equipe está à disposição. É só enviar um e-mail
									para suporte@costantebello.com.br ou entrar em contato pelo nosso{' '}
									<Link href="#">canal de atendimento</Link>.
								</Text>

								<Text className="text-justify text-base">
									Estamos ansiosos para ajudar você a criar o espaço dos seus sonhos!
								</Text>
							</Row>
						</Section>

						<Section>
							<Row>
								<Text className="m-0 p-0">Com carinho,</Text>
								<Text className="m-0 p-0 font-bold">Equipe Costante Bello</Text>
							</Row>
						</Section>
					</Container>

					<Container className="mt-20">
						<Section>
							<Row>
								<Column className="px-20 text-right">
									<Link>Suporte</Link>
								</Column>
								<Column className="text-left">
									<Link>Nossas Políticas</Link>
								</Column>
							</Row>
						</Section>
						<Text className="mb-45 text-center text-gray-400">
							Costate Bello, 44 Rua tal, Bairro Tal, CEP: 69000-000, Manaus - AM
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
