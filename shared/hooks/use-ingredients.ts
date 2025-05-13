import { Api } from '@/shared/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnProps {
	ingredients: Ingredient[];
	loading: boolean;
}

export const useIngredients = (): ReturnProps => {
	const [loading, setLoading] = useState(true);
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);

	useEffect(() => {
		Api.ingredients
			.getAll()
			.then((data) => setIngredients(data))
			.catch((e) => console.error(e));

		async function fetchIngredients() {
			try {
				setLoading(true);
				const data = await Api.ingredients.getAll();
				setIngredients(data);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}
		fetchIngredients();
	}, []);

	return { ingredients, loading };
};
