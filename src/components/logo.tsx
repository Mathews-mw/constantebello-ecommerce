import Link from 'next/link';

export function Logo() {
	return (
		<div className="flex items-baseline gap-0.5">
			<Link href="/">
				<span className="text-lg font-bold">COSTANTE</span>
				<span className="text-lg font-bold text-primary">BELLO</span>
			</Link>
		</div>
	);
}
