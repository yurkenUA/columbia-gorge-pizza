import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn("border border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                {/* Left Side */}
                <Link href="/" className="flex items-center gap-4">
                    <Image src="/logo.svg" alt="Logo" width={60} height={65} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">
                            Columbia Gorge Pizza
                        </h1>
                        <p className="text-sm text-gray-400 leading-3 text-center">
                            where bold flavors meet the majestic
                            <br />
                            Columbia River and peaks of Hood and Adams
                        </p>
                    </div>
                </Link>

                {/* Search */}
                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <User size={16} />
                        Sign In
                    </Button>

                    <div>
                        <Button className="group relative">
                            <b>99 $</b>
                            <span className="h-full w-[1px] bg-white/30 mx-3" />
                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart
                                    size={16}
                                    className="relative"
                                    strokeWidth={2}
                                />
                                <b>3</b>
                            </div>
                            <ArrowRight
                                size={20}
                                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
};
