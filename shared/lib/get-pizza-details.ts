import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { Ingredient, ProductItem } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
	size: PizzaSize,
	type: PizzaType,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectIngredients: Set<number>,
) => {
	const totalPrice = calcTotalPizzaPrice(size, type, items, ingredients, selectIngredients);
	const textDetaills = `${size}", ${mapPizzaType[type]} dough`;

	return {
		textDetaills,
		totalPrice,
	};
};
