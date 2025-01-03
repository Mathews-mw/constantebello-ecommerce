import { env } from '@/env';
import nodemailer from 'nodemailer';

export const mailTransport = nodemailer.createTransport({
	host: env.MAIL_HOST,
	port: env.MAIL_PORT,
	secure: true, // true for port 465, false for other ports
	auth: {
		user: env.MAIL_USER,
		pass: env.MAIL_PASSWORD,
	},
});
