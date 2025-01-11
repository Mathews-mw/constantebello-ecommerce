import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { StarsRating } from './stars-rating';

export function ReviewCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Mark Knight</CardTitle>
				<CardDescription>
					<StarsRating />
				</CardDescription>
			</CardHeader>

			<CardContent>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis harum adipisci nam
					ut voluptas porro delectus ad sint voluptatum ea, provident eum a molestiae recusandae
					consequuntur omnis aut voluptates temporibus.
				</p>
			</CardContent>

			<CardFooter>
				<time title="04/12/2024" className="text-sm text-muted-foreground">
					Publicado há 2 semanas atrás
				</time>
			</CardFooter>
		</Card>
	);
}
