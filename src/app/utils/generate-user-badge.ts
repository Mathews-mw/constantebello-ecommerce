type UserInfo = {
	initials: string;
	color: string;
};

export function generateUserBadge(userName: string): UserInfo {
	if (!userName) {
		throw new Error('O nome do usuário é obrigatório.');
	}

	const nameParts = userName.trim().split(' ');

	if (nameParts.length < 2) {
		throw new Error('O nome do usuário deve conter pelo menos dois nomes.');
	}

	const firstName = nameParts[0];
	const secondName = nameParts[1];

	const initials = `${firstName[0].toUpperCase()}${secondName[0].toUpperCase()}`;

	const charSum = firstName.length + secondName.length;

	const hue = (charSum * 37) % 360; // Multiplica para espalhar melhor as cores
	const color = `hsl(${hue}, 70%, 50%)`;

	return {
		initials,
		color,
	};
}
