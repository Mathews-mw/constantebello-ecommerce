import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@/env';
import { api } from '@/lib/axios';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/app/utils/mails/send-welcome-email';

const nextAuthOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'credentials', // nome do provedor que será utilizado
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { data: sessionResponse, status } = await api.post(`${env.APP_URL}/api/session`, {
					email: credentials?.email,
					password: credentials?.password,
				});

				if (sessionResponse && status === 200) {
					return sessionResponse.user;
				}

				return null;
			},
		}),
	],
	secret: `${env.NEXTAUTH_SECRET}`,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === 'google') {
				const existingUser = await prisma.user.findUnique({
					where: {
						email: user.email ?? undefined,
					},
				});
				if (!existingUser) {
					console.log('É o primeiro acesso desse usuário. Portanto, deve ser enviado o e-mail de boas-vindas');

					await sendWelcomeEmail({
						to: user.email ?? '',
						name: user.name ?? '',
						siteLink: env.NEXT_PUBLIC_APP_BASE_URL,
					});
				}
			}

			return true;
		},
		async jwt({ token, trigger, user, session }) {
			if (trigger === 'signIn') {
				token.role = user.role;
			}
			if (trigger === 'update' && session?.name) {
				token.name = session.name;
			}
			return token;
		},
		async session({ session, token, newSession, user, trigger }) {
			if (trigger === 'update' && newSession?.name) {
				session.user.name = newSession.name;
			}
			if (token) {
				if (token.email && token.name && token.sub && token.role) {
					session.user.id = token.sub;
					session.user.name = token.name;
					session.user.email = token.email;
					session.user.role = token.role;
				}
			}
			if (user) {
				session.user.id = user.id;
				session.user.name = user.name;
				session.user.email = user.email;
				session.user.role = user.role;
			}
			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
