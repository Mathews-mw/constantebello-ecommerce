import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
});

export { handler as GET, handler as POST };
