import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

export const calcTotalPizzaPrice = (
	size: PizzaSize,
	type: PizzaType,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectIngredients: Set<number>,
) => {
	const pizzaPrice =
		items.find((item) => item.size === size && item.pizzaDough === type)?.price || 0;
	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectIngredients.has(ingredient.id))
		.reduce((acc, item) => acc + item.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};
