import axios from 'axios';
import { env } from '../../env';

export const pagBankAPI = axios.create({
	baseURL: env.PAGBANK_API_URL,
	headers: {
		Authorization: `Bearer ${env.PAGBANK_TOKEN}`,
	},
});
