import { FooterMobileContent } from './footer-mobile-content';
import { FooterDesktopContent } from './footer-desktop-content';

export function StoreFooter() {
	return (
		<footer className="mt-8 border-t bg-background">
			<FooterDesktopContent />

			<FooterMobileContent />
		</footer>
	);
}
