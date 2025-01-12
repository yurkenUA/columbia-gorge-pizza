import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { Prisma } from "@prisma/client";

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
    productId,
    pizzaDough,
    size,
}: {
    productId: number;
    pizzaDough?: 1 | 2;
    size?: 8 | 10 | 12;
}) => {
    return {
        productId,
        price: randomNumber(12, 39),
        pizzaDough,
        size,
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "Alison Parker",
                email: "aparker@gmail.com",
                password: hashSync("111111", 10),
                verified: new Date(),
                role: "USER",
            },
            {
                fullName: "Yuri Zatoka",
                email: "zatoka.dev@gmail.com",
                password: hashSync("111111", 10),
                verified: new Date(),
                role: "ADMIN",
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: "Fresh Pepperoni",
            imageUrl:
                "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: "Cheesee",
            imageUrl:
                "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: "Chorizo Fresh",
            imageUrl:
                "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            generateProductItem({
                productId: pizza1.id,
                pizzaDough: 1,
                size: 8,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaDough: 2,
                size: 10,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaDough: 1,
                size: 12,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaDough: 2,
                size: 8,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaDough: 1,
                size: 10,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaDough: 2,
                size: 12,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaDough: 2,
                size: 8,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaDough: 1,
                size: 10,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaDough: 2,
                size: 12,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaDough: 2,
                size: 8,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaDough: 1,
                size: 10,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaDough: 2,
                size: 12,
            }),
            // other products
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
            generateProductItem({ productId: 12 }),
            generateProductItem({ productId: 13 }),
            generateProductItem({ productId: 14 }),
            generateProductItem({ productId: 15 }),
            generateProductItem({ productId: 16 }),
            generateProductItem({ productId: 17 }),
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: "11111",
            },
            {
                userId: 2,
                totalAmount: 0,
                token: "22222",
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            cartId: 1,
            productItemId: 1,
            quantity: 2,
            ingredients: {
                connect: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                    { id: 5 },
                ],
            },
        },
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    });
