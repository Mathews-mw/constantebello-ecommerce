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
		color: string;
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
					<Section className="my-4 flex w-full items-center justify-center">
						<Row align="center">
							<span className="text-2xl font-bold">COSTANTE</span>
							<span className="text-brand text-2xl font-bold">BELLO</span>
						</Row>
					</Section>

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
											<Img src={product.img} alt={product.name} width={80} height={80} className="h-[80px] w-[80px]" />
										</Column>

										<Column className="pl-2 align-baseline" align="left">
											<Row>
												<Text title={product.name} className="m-0 line-clamp-1 p-0 text-sm font-semibold">
													{product.name}
												</Text>
											</Row>
											<Row>
												<Text className="m-0 p-0 text-xs">Qnt: {product.quantity}</Text>
											</Row>
											<Row>
												<Text className="m-0 p-0 text-xs">Cor: {product.color}</Text>
											</Row>
											<Row>
												<Text className="m-0 p-0 text-xs">{product.size}</Text>
											</Row>
											<Row>
												<Text className="m-0 p-0 text-sm font-semibold">
													{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
												</Text>
											</Row>
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
										{(discount * -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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

// const productsList = [
// 	{
// 		id: 1,
// 		img: 'https://a-static.mlcdn.com.br/1500x1500/kit-armario-de-cozinha-viena-compacto-com-4-portas-e-1-gaveta-balcao-multiuso-madine/macielsignorini/msarma1200mel/e278e0861dab8bf7c55f9e21740dd70b.jpeg',
// 		name: 'Escrivaninha Mesa de Escritório de Canto 3 Gavetas Branco/Rustic Lisboa Madesa',
// 		size: '190x170x90',
// 		quantity: 1,
// 		price: 540,
// 	},
// 	{
// 		id: 2,
// 		img: 'https://a-static.mlcdn.com.br/1500x1500/kit-armario-de-cozinha-viena-compacto-com-4-portas-e-1-gaveta-balcao-multiuso-madine/macielsignorini/msarma1200mel/e278e0861dab8bf7c55f9e21740dd70b.jpeg',
// 		name: 'Rack para TV 72” 2 Portas Caemmun Tannen 1.8',
// 		size: '190x170x90',
// 		quantity: 1,
// 		price: 540,
// 	},
// ];
