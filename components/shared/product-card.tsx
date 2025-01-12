import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
    name: string;
    price: number;
    count?: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({
    id,
    name,
    price,
    count,
    imageUrl,
    className,
}) => {
    return (
        <div className={cn(className)}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <img
                        className="w-[215px] h-[215px]"
                        src={imageUrl}
                        alt={name}
                    />
                </div>

                <Title size="sm" className="mt-3 mb-1 font-bold" text={name} />

                <p className="text-sm text-gray-400">
                    Chicken, mozzarella, cheddar and parmesan cheeses, cheese
                    sauce, tomatoes, alfredo sauce, garlic, onion, olives and
                    basil
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        from <b>{price} $</b>
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
