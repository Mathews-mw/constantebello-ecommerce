interface IPageTitleProps {
	title: string;
}

export function PageTitle({ title }: IPageTitleProps) {
	return <h1 className="text-lg font-black lg:text-2xl">{title}</h1>;
}
