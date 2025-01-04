export function birthdayFormatter(value: string): string {
	return value
		.replace(/\D/g, '') // Remove caracteres não numéricos
		.replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a primeira barra
		.replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a segunda barra
		.replace(/(\d{4})\d+$/, '$1'); // Limita o ano a 4 dígitos
}
