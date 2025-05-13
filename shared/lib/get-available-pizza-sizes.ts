import { ProductItem } from '@prisma/client';
import { PizzaType, pizzaSizes } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
	const filteredPizzasByType = items.filter((item) => item.pizzaDough === type);

	return pizzaSizes.map((item) => ({
		name: item.name,
		value: String(item.value),
		disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
	}));
};
