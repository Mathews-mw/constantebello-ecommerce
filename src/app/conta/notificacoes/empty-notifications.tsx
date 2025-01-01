import Image from 'next/image';

export function EmptyNotifications() {
	return (
		<div className="flex flex-col items-center">
			<h4 className="text-xl font-bold">Tudo calmo por aqui...</h4>
			<Image src="/empty-notification.png" alt="Sem notificações" width={220} height={220} quality={100} />
			<p className="font-semibold">Você ainda não tem notificações.</p>
		</div>
	);
}
