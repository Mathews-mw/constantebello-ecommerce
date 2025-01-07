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
} from '@react-email/components';

interface WelcomeEmailProps {
	name: string;
	siteLink: string;
}

export default function WelcomeEmail({ name, siteLink }: WelcomeEmailProps) {
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
						<Heading className="my-0 text-center text-2xl leading-8">Bem-vindo(a) à Costante Bello!</Heading>

						<Section>
							<Row>
								<Text className="text-base font-bold">Olá, {name}</Text>

								<Text className="text-justify text-base">
									Seja muito bem-vindo(a) à Costante Bello, o lugar onde design, funcionalidade e beleza se encontram
									para transformar o seu lar! Estamos muito felizes por tê-lo(a) conosco.
								</Text>

								<Text className="text-justify text-base">
									Aqui na Costante Bello, acreditamos que cada detalhe importa. Por isso, oferecemos móveis planejados
									que se adaptam perfeitamente ao seu estilo e às suas necessidades, tornando cada ambiente único e
									especial.
								</Text>
							</Row>
						</Section>

						<Section>
							<Row>
								<Text className="text-base font-bold">Como podemos ajudar você? Explore o nosso site e descubra:</Text>
								<ul>
									<li>✅ Móveis sob medida para qualquer ambiente.</li>
									<li>✅ Inspirações para deixar seu lar ainda mais aconchegante.</li>
									<li>✅ Atendimento personalizado para tirar todas as suas dúvidas.</li>
								</ul>
							</Row>
						</Section>

						<Section className="text-base">
							<Row>
								<Text className="text-base font-bold">Uma oferta especial para você!</Text>
								<Text className="text-justify text-base">
									Como um agradecimento por se juntar a nós, estamos oferecendo um CUPOM com 10% na sua primeira compra
									no site. Use o código <strong className="text-brand">BEMVINDO10</strong> no checkout.
								</Text>
							</Row>
						</Section>

						<Section className="text-center">
							<Button href="/#" className="bg-brand rounded-lg px-4 py-3 text-white">
								Ir para o site
							</Button>
						</Section>

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
