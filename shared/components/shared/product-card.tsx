import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	ingredients: Ingredient[];
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
}) => {
	return (
		<div className={cn(className)}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 h-[260px]">
					<img className="w-[250px] h-[250px] object-contain" src={imageUrl} alt={name} />
				</div>

				<Title size="sm" className="mt-3 mb-1 font-bold" text={name} />

				<p className="text-sm text-gray-400">{ingredients.map((ing) => ing.name).join(', ')}</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						from <b>${price}</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-2" />
						Add
					</Button>
				</div>
			</Link>
		</div>
	);
};
