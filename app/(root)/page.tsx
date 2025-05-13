import {
	Container,
	Filters,
	ProductsGroupList,
	Stories,
	Title,
	TopBar,
} from '@/shared/components/shared';
import { Suspense } from 'react';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';
import { CircleFadingPlus } from 'lucide-react';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams);
	return (
		<>
			<Container className="mt-10">
				<Title text="All Pizzas" size="lg" className="font-extrabold" />
			</Container>
			<TopBar categories={categories.filter((category) => category.products.length > 0)} />
			<Container className="mt-5">
				<div className="flex items-center gap-2">
					<Title text="Stories" size="md" className="text-[#f56565]" />
					<CircleFadingPlus size={32} color="#f56565" />
				</div>
				<Stories />
			</Container>

			<Container className="mt-10 pb-14">
				<div className="flex gap-[70px]">
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											items={category.products}
											categoryId={category.id}
										/>
									),
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
