/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export function errorToasterHandler(error: any, message?: string) {
	if (error instanceof AxiosError) {
		if (error.status === 500) {
			console.error('Error status 500: ', error);
			return toast.error(
				'Ops! Parece que aconteceu algum erro interno. Por favor tente novamente em alguns instantes.'
			);
		}

		return toast.error(error.response?.data.message);
	}

	toast.error(message);
}
