interface IPageTitleProps {
	title: string;
}

export function PageTitle({ title }: IPageTitleProps) {
	return <h1 className="text-2xl font-black">{title}</h1>;
}
