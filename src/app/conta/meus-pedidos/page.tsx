'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { listingOrdersByUserId } from '@/app/api/@requests/orders/listing-orders-by-user-id';

import { OrderItemCard } from './order-item-card';

import { Package } from 'lucide-react';

export default function UserOrdersPage() {
	const { data, status } = useSession();

	const { data: userOrders } = useQuery({
		queryKey: ['user-orders', data?.user.id],
		queryFn: async () => listingOrdersByUserId({ userId: data?.user.id ?? '' }),
		enabled: status === 'authenticated' && !!data,
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2">
				<Package className="fill-primary text-background" strokeWidth={1} />
				<h1 className="text-xl font-black">Meus pedidos</h1>
			</div>

			<div className="space-y-4">
				{userOrders?.map((item) => {
					return <OrderItemCard orderDetails={item} key={item.id} />;
				})}
			</div>
		</div>
	);
}
