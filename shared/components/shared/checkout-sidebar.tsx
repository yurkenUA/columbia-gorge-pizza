import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib/utils';

const VAT = 15;
const DELIVERY_PRICE = 9.99;

interface Props {
	totalAmount: number;
	loading?: boolean;
	className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
	const vatPrice = ((totalAmount * VAT) / 100).toFixed(2);
	const totalPrice = (totalAmount + (totalAmount ? DELIVERY_PRICE : 0) + Number(vatPrice)).toFixed(
		2,
	);

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Total:</span>
				{loading ? (
					<Skeleton className="h-11 w-48" />
				) : (
					<span className="h-11 text-[34px] font-extrabold">${totalPrice}</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-400" />
						Subtotal:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `$${totalAmount}`}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-400" />
						Taxes:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `$${vatPrice}`}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-400" />
						Delivery:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`$${totalAmount ? DELIVERY_PRICE : 0}`
					)
				}
			/>

			<Button
				loading={loading}
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
				Proceed to payment
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};
