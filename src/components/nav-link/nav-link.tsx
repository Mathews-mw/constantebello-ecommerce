import { NavItem } from './nav-item';

export function NavLink() {
	return (
		<nav className="hidden flex-row items-center space-x-4 lg:flex">
			<NavItem title="Home" href="/" />
			<NavItem title="Produtos" href="/produtos" />
		</nav>
	);
}
