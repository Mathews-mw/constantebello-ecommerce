'use client';

import { useState } from 'react';
import { TabItem } from './tab-item';
import * as Tabs from '@radix-ui/react-tabs';

import { IProductInfos } from '@/@types/product';

import { ProductSize } from '@prisma/client';
import { ProductDetailsTab } from './product-details-tab';
import { ProductReviewsTab } from './product-reviews-tab';

interface IProps {
	model: IProductInfos;
	size: ProductSize;
}

export function ProductTabs({ model, size }: IProps) {
	const [currentTab, setCurrentTab] = useState('details');

	return (
		<Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
			<Tabs.List className="mt-6 flex w-full items-center gap-4 border-b">
				<TabItem value="details" title="Detalhes do Produto" isSelected={currentTab === 'details'} />
				<TabItem value="review" title="Avaliações" isSelected={currentTab === 'review'} />
			</Tabs.List>

			<Tabs.Content value="details" className="p-4">
				<ProductDetailsTab details={model} size={size} />
			</Tabs.Content>

			<Tabs.Content value="review" className="p-4">
				<ProductReviewsTab />
			</Tabs.Content>
		</Tabs.Root>
	);
}
