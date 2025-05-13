'use client';

import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store/category';

interface Props {
	title: string;
	// products: CategoryProducts['products'];
	items: any[];
	className?: string;
	listClassName?: string;
	categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	categoryId,
	listClassName,
	className,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, intersection?.isIntersecting, setActiveCategoryId]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} className="mb-5 font-extrabold" size="lg" />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((item, index) => (
					<ProductCard
						key={index}
						id={item.id}
						name={item.name}
						price={item.items[0].price}
						imageUrl={item.imageUrl}
						ingredients={item.ingredients}
					/>
				))}
			</div>
		</div>
	);
};
