import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedIngredients, { toggle }] = useSet(new Set<string>(values));

    useEffect(() => {
        // Api.ingredients
        //     .getAll()
        //     .then((data) => setIngredients(data))
        //     .catch((e) => console.error(e));

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

    return { ingredients, loading, onAddId: toggle, selectedIngredients };
};
