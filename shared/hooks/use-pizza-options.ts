import { useEffect, useState } from 'react';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib';
import { ProductItem } from '@prisma/client';
import { Variant } from '../components/shared/group-variants';

interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	selectedIngredients: Set<number>;
	availableSizes: Variant[];
	currentItemId?: number;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	toggleIngredients: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(10);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<number>());
	const availableSizes = getAvailablePizzaSizes(type, items);

	const currentItemId = items.find((item) => item.size === size && item.pizzaDough === type)?.id;

	useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			(item) => Number(item.value) === size && !item.disabled,
		);
		const availableSize = availableSizes?.find((item) => !item.disabled);
		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		toggleIngredients,
	};
};
