import { Package } from 'lucide-react';

export default function UserOrdersPage() {
	return (
		<div>
			<div className="flex items-center gap-2">
				<Package className="fill-primary text-background" strokeWidth={1} />
				<h1 className="text-xl font-black">Meus dados</h1>
			</div>
		</div>
	);
}
