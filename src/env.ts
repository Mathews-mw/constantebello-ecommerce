import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		APP_URL: z.string(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		SECRET_TOKEN: z.string(),
		NEXTAUTH_URL: z.string().url(),
		NEXTAUTH_SECRET: z.string(),
		PAGBANK_API_URL: z.string().url(),
		PAGBANK_TOKEN: z.string(),
		PAGBANK_EVENT_URL: z.string(),
		MAIL_HOST: z.string(),
		MAIL_PORT: z.coerce.number(),
		MAIL_USER: z.string(),
		MAIL_PASSWORD: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		APP_URL: process.env.APP_URL,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		SECRET_TOKEN: process.env.SECRET_TOKEN,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		PAGBANK_API_URL: process.env.PAGBANK_API_URL,
		PAGBANK_TOKEN: process.env.PAGBANK_TOKEN,
		PAGBANK_EVENT_URL: process.env.PAGBANK_EVENT_URL,
		MAIL_HOST: process.env.MAIL_HOST,
		MAIL_PORT: process.env.MAIL_PORT,
		MAIL_USER: process.env.MAIL_USER,
		MAIL_PASSWORD: process.env.MAIL_PASSWORD,
	},
});
