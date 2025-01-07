import { IProductDetails } from '@/@types/product';
import Image from 'next/image';

interface IProps {
	product: IProductDetails;
}

export function ProductImages({ product }: IProps) {
	return (
		<div className="flex flex-col-reverse gap-4 lg:flex-row">
			<div className="grid grid-cols-3 grid-rows-1 gap-2 lg:flex lg:flex-col lg:justify-between">
				<Image
					priority
					src={product.imageUrl}
					alt=""
					width={320}
					height={300}
					className="rounded-lg object-cover lg:h-[167px]"
				/>
				<Image
					priority
					src={product.imageUrl}
					alt=""
					width={320}
					height={300}
					className="rounded-lg object-cover lg:h-[167px]"
				/>
				<Image
					priority
					src={product.imageUrl}
					alt=""
					width={320}
					height={300}
					className="rounded-lg object-cover lg:h-[167px]"
				/>
			</div>

			<Image
				priority
				quality={100}
				src={product.imageUrl}
				alt=""
				width={1020}
				height={1020}
				className="h-80 rounded-lg object-cover lg:h-[530px]"
			/>
		</div>
	);
}
