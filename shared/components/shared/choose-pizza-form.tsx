'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading?: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
	className?: string;
}
export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	items,
	loading,
	onSubmit,
	className,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		toggleIngredients,
	} = usePizzaOptions(items);

	const { textDetaills, totalPrice } = getPizzaDetails(
		size,
		type,
		items,
		ingredients,
		selectedIngredients,
	);

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] bg-[#FCFCFC] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetaills}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-2">
					<div className="grid grid-cols-3 gap-4">
						{ingredients.map((item) => (
							<IngredientItem
								key={item.id}
								imageUrl={item.imageUrl}
								name={item.name}
								price={item.price}
								active={selectedIngredients.has(item.id)}
								onClick={() => toggleIngredients(item.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Add to cart for ${totalPrice}
				</Button>
			</div>
		</div>
	);
};
