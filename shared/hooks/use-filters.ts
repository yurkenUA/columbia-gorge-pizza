import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface PriceRangeProps {
	priceFrom?: number;
	priceTo?: number;
}

export interface QueryFilters extends PriceRangeProps {
	pizzaTypes: string;
	pizzaSizes: string;
	ingredients: string;
}

export interface Filters {
	pizzaSizes: Set<string>;
	pizzaTypes: Set<string>;
	priceRange: PriceRangeProps;
	selectedIngredients: Set<string>;
}

export interface ReturnProps extends Filters {
	setPriceRange: (name: keyof PriceRangeProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setPizzaSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

	// INGREDIENTS FILTER
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(',')),
	);

	// PRICE FILTER
	const [priceRange, setPriceRange] = useState<PriceRangeProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	const updatePriceRange = (name: keyof PriceRangeProps, value: number) => {
		setPriceRange((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// SIZE FILTER
	const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(
		new Set<string>(searchParams.get('pizzaSizes')?.split(',') || []),
	);
	// PIZZA TYPE FILTER
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []),
	);

	return useMemo(
		() => ({
			pizzaSizes,
			pizzaTypes,
			priceRange,
			selectedIngredients,
			setPriceRange: updatePriceRange,
			setPizzaSizes: togglePizzaSizes,
			setPizzaTypes: togglePizzaTypes,
			setSelectedIngredients: toggleIngredients,
		}),
		[pizzaSizes, pizzaTypes, priceRange, selectedIngredients],
	);
};
