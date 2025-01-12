"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import React from "react";

interface Props {
    className?: string;
}

const categories = [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Combo" },
    { id: 3, name: "Appetizers" },
    { id: 4, name: "Cocktails" },
    { id: 5, name: "Coffee" },
    { id: 6, name: "Beverages" },
    { id: 7, name: "Desserts" },
];

export const Categories: React.FC<Props> = ({ className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
                className
            )}
        >
            {categories.map(({ name, id }) => (
                <a
                    key={id}
                    href={`#${name}`}
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5",
                        id === categoryActiveId &&
                            "bg-white shadow-md shadow-gray-200 text-primary"
                    )}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
