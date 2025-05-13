'use client';

import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients, useFilters, useQueryFilters } from '@/shared/hooks';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading } = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const items = ingredients.map((item) => ({
		text: item.name,
		value: String(item.id),
	}));

	const updatePriceRange = (prices: number[]) => {
		filters.setPriceRange('priceFrom', prices[0]);
		filters.setPriceRange('priceTo', prices[1]);
	};
	return (
		<div className={className}>
			<Title text="Filters" size="sm" className="mb-5 font-bold" />

			{/* Upper Checkboxes */}
			<div className="flex flex-col gap-4">
				<CheckboxFiltersGroup
					title="Doughs types"
					name="pizzaTypes"
					className="mb-5"
					onClickCheckbox={filters.setPizzaTypes}
					selected={filters.pizzaTypes}
					items={[
						{ text: 'Thin', value: '1' },
						{ text: 'Regular', value: '2' },
					]}
				/>

				<CheckboxFiltersGroup
					title="Sizes"
					name="sizes"
					className="mb-5"
					onClickCheckbox={filters.setPizzaSizes}
					selected={filters.pizzaSizes}
					items={[
						{ text: '8"', value: '8' },
						{ text: '10"', value: '10' },
						{ text: '12"', value: '12' },
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
						value={String(filters.priceRange.priceFrom)}
						onChange={(e) => filters.setPriceRange('priceFrom', Number(e.target.value))}
					/>
					<Input
						type="number"
						placeholder="100"
						min={10}
						max={100}
						value={String(filters.priceRange.priceTo)}
						onChange={(e) => filters.setPriceRange('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={100}
					step={1}
					value={[filters.priceRange.priceFrom || 0, filters.priceRange.priceTo || 100]}
					onValueChange={updatePriceRange}
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
				onClickCheckbox={filters.setSelectedIngredients}
				selected={filters.selectedIngredients}
			/>
		</div>
	);
};
