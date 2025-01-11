import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '../../../../env';
import { api } from '../../../../lib/axios';
import { prisma } from '../../../../lib/prisma';
import { sendWelcomeEmail } from '../../../utils/mails/send-welcome-email';

const nextAuthOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
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
					return {
						id: sessionResponse.user.id,
						name: sessionResponse.user.name,
						email: sessionResponse.user.email,
						role: sessionResponse.user.role,
					};
				}

				return null;
			},
		}),
	],
	secret: `${env.NEXTAUTH_SECRET}`,
	session: {
		strategy: 'jwt',
	},
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
					await sendWelcomeEmail({
						to: user.email ?? '',
						name: user.name ?? '',
						siteLink: 'https://google.com',
					});
				}
			}

			return true;
		},

		async jwt({ token, trigger, user, session }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.role = user.role;
			}

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
			// if (user) {
			// 	session.user.id = user.id;
			// 	session.user.name = user.name;
			// 	session.user.email = user.email;
			// 	session.user.role = user.role;
			// }
			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
