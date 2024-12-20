/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export function errorToasterHandler(error: any, message?: string) {
	if (error instanceof AxiosError) {
		return toast.error(error.response?.data.message);
	}

	toast.error(message);
}
