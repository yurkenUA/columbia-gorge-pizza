"use client";

import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    className?: string;
}

interface PriceRangeProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
    pizzaTypes: string;
    pizzaSizes: string;
    ingredients: string;
}
export const Filters: React.FC<Props> = ({ className }) => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;
    const router = useRouter();

    const { ingredients, loading, onAddId, selectedIngredients } =
        useFilterIngredients(searchParams.get("ingredients")?.split(","));

    const [priceRange, setPriceRange] = useState<PriceRangeProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(
        new Set<string>(searchParams.get("pizzaSizes")?.split(",") || [])
    );

    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
    );

    useEffect(() => {
        const filters = {
            ...priceRange,
            pizzaTypes: Array.from(pizzaTypes),
            pizzaSizes: Array.from(pizzaSizes),
            ingredients: Array.from(selectedIngredients),
        };

        const query = qs.stringify(filters, { arrayFormat: "comma" });

        router.push(`?${query}`, { scroll: false });
    }, [priceRange, pizzaTypes, pizzaSizes, selectedIngredients]);

    const items = ingredients.map((item) => ({
        text: item.name,
        value: String(item.id),
    }));
    return (
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            {/* Upper Checkboxes */}
            <div className="flex flex-col gap-4">
                <CheckboxFiltersGroup
                    title="Doughs types"
                    name="pizzaTypes"
                    className="mb-5"
                    onClickCheckbox={togglePizzaTypes}
                    selected={pizzaTypes}
                    items={[
                        { text: "Thin", value: "1" },
                        { text: "Traditional", value: "2" },
                    ]}
                />

                <CheckboxFiltersGroup
                    title="Sizes"
                    name="sizes"
                    className="mb-5"
                    onClickCheckbox={togglePizzaSizes}
                    selected={pizzaSizes}
                    items={[
                        { text: "8 in", value: "8" },
                        { text: "10 in", value: "10" },
                        { text: "12 in", value: "12" },
                    ]}
                />
            </div>
            {/* Price Range */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price Range</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={99}
                        value={String(priceRange.priceFrom)}
                        onChange={(e) =>
                            setPriceRange({
                                ...priceRange,
                                priceFrom: Number(e.target.value),
                            })
                        }
                    />
                    <Input
                        type="number"
                        placeholder="100"
                        min={10}
                        max={100}
                        value={String(priceRange.priceTo)}
                        onChange={(e) =>
                            setPriceRange({
                                ...priceRange,
                                priceTo: Number(e.target.value),
                            })
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={100}
                    step={1}
                    value={[
                        priceRange.priceFrom || 0,
                        priceRange.priceTo || 100,
                    ]}
                    onValueChange={([priceFrom, priceTo]) =>
                        setPriceRange({ priceFrom, priceTo })
                    }
                />
            </div>
            <CheckboxFiltersGroup
                title="Ingredients"
                name="ingredients"
                limit={6}
                // defaultItems={items.slice(0, limit)}
                items={items}
                className="mt-5"
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
            />
        </div>
    );
};
