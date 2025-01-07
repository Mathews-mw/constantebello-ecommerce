'use client';

import { useState } from 'react';
import { TabItem } from './tab-item';
import * as Tabs from '@radix-ui/react-tabs';

import { ProductDetailsTab } from './product-details-tab';
import { ProductReviewsTab } from './product-reviews-tab';

export function ProductTabs() {
	const [currentTab, setCurrentTab] = useState('details');

	return (
		<Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
			<Tabs.List className="mt-6 flex w-full items-center gap-4 border-b">
				<TabItem value="details" title="Detalhes do Produto" isSelected={currentTab === 'details'} />
				<TabItem value="review" title="Avaliações" isSelected={currentTab === 'review'} />
			</Tabs.List>

			<Tabs.Content value="details" className="p-4">
				<ProductDetailsTab />
			</Tabs.Content>

			<Tabs.Content value="review" className="p-4">
				<ProductReviewsTab />
			</Tabs.Content>
		</Tabs.Root>
	);
}
