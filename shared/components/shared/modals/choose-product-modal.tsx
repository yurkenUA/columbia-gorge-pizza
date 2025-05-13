'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ProductForm } from '../product-form';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
					className,
				)}>
				<VisuallyHidden>
					<DialogTitle>{product.name} Details</DialogTitle>
					<DialogDescription>Choose your product preferences</DialogDescription>
				</VisuallyHidden>

				<ProductForm product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};
