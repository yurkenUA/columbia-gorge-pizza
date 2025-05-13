import { hashSync } from 'bcrypt';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { Prisma } from '@prisma/client';

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
				fullName: 'Alison Parker',
				email: 'aparker@gmail.com',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Yuri Zatoka',
				email: 'zatoka.dev@gmail.com',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	});

	await prisma.category.createMany({
		data: categories,
	});

	await prisma.ingredient.createMany({
		data: _ingredients,
	});

	// await prisma.product.createMany({
	// 	data: products,
	// });

	const pizzasData = [
		{ name: 'Fresh Pepperoni', imageUrl: '/assets/images/products/fresh_pepperoni.avif' },
		{ name: 'Cheesee', imageUrl: '/assets/images/products/cheesee.avif' },
		{ name: 'Chorizo Fresh', imageUrl: '/assets/images/products/chorizo.avif' },
		{ name: 'Shrimp and pesto', imageUrl: '/assets/images/products/shrimp-pesto.avif' },
		{ name: 'Four cheeses', imageUrl: '/assets/images/products/four-cheeses.avif' },
		{ name: 'Chill Grill', imageUrl: '/assets/images/products/chill-grill.avif' },
		{ name: 'Blue Cheese Shrimph', imageUrl: '/assets/images/products/blue-cheese.avif' },
		{ name: 'Ham and mushrooms', imageUrl: '/assets/images/products/ham-and-mushrooms.avif' },
		{ name: 'Bavarian', imageUrl: '/assets/images/products/bavarian.avif' },
		{ name: 'Arriva!', imageUrl: '/assets/images/products/arriva.avif' },
		{ name: 'Beef Stroganoff', imageUrl: '/assets/images/products/beef-stroganoff.avif' },
		{ name: 'Carbonara', imageUrl: '/assets/images/products/carbonara.avif' },
		{ name: 'Julien', imageUrl: '/assets/images/products/julien.avif' },
		{ name: 'Pesto', imageUrl: '/assets/images/products/pesto.avif' },
		{ name: 'Columbia Gorge', imageUrl: '/assets/images/products/columbia.avif' },
	];

	const allProductsData = [
		...pizzasData.map((pizza) => ({ ...pizza, categoryId: 1 })), // Add categoryId 1 for all pizzas
		...products.map((product) => ({ ...product })), // Use existing data for non-pizza products
	];

	// Create products in a loop
	const createdProducts = await Promise.all(
		allProductsData.map(async (productData) => {
			const product = await prisma.product.create({
				data: {
					name: productData.name,
					imageUrl: productData.imageUrl,
					categoryId: productData.categoryId, // Using the category from the data
					ingredients:
						productData.categoryId === 1
							? {
									// Only add ingredients for pizzas
									connect: _ingredients.sort(() => Math.random() - 0.5).slice(0, 12),
								}
							: undefined,
				},
			});

			return product;
		}),
	);

	// Create product items for each product
	const productItemsData = createdProducts.flatMap((product) => {
		if (product.categoryId === 1) {
			// Pizza products
			return [
				generateProductItem({ productId: product.id, pizzaDough: 1, size: 8 }),
				generateProductItem({ productId: product.id, pizzaDough: 2, size: 8 }),
				generateProductItem({ productId: product.id, pizzaDough: 1, size: 10 }),
				generateProductItem({ productId: product.id, pizzaDough: 2, size: 10 }),
				generateProductItem({ productId: product.id, pizzaDough: 1, size: 12 }),
				generateProductItem({ productId: product.id, pizzaDough: 2, size: 12 }),
			];
		} else {
			// Non-pizza products
			return [generateProductItem({ productId: product.id })]; // Assuming non-pizza products have 1 item variant
		}
	});

	// Insert product items in bulk
	await prisma.productItem.createMany({
		data: productItemsData,
	});

	// await prisma.productItem.createMany({
	// 	data: [
	// 		generateProductItem({
	// 			productId: pizza1.id,
	// 			pizzaDough: 1,
	// 			size: 8,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza1.id,
	// 			pizzaDough: 2,
	// 			size: 10,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza1.id,
	// 			pizzaDough: 1,
	// 			size: 12,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza2.id,
	// 			pizzaDough: 2,
	// 			size: 8,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza2.id,
	// 			pizzaDough: 1,
	// 			size: 10,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza2.id,
	// 			pizzaDough: 2,
	// 			size: 12,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza2.id,
	// 			pizzaDough: 2,
	// 			size: 8,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza2.id,
	// 			pizzaDough: 1,
	// 			size: 10,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza2.id,
	// 			pizzaDough: 2,
	// 			size: 12,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza3.id,
	// 			pizzaDough: 2,
	// 			size: 8,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza3.id,
	// 			pizzaDough: 1,
	// 			size: 10,
	// 		}),
	// 		generateProductItem({
	// 			productId: pizza3.id,
	// 			pizzaDough: 2,
	// 			size: 12,
	// 		}),
	// 		// other products
	// 		generateProductItem({ productId: 1 }),
	// 		generateProductItem({ productId: 2 }),
	// 		generateProductItem({ productId: 3 }),
	// 		generateProductItem({ productId: 4 }),
	// 		generateProductItem({ productId: 5 }),
	// 		generateProductItem({ productId: 6 }),
	// 		generateProductItem({ productId: 7 }),
	// 		generateProductItem({ productId: 8 }),
	// 		generateProductItem({ productId: 9 }),
	// 		generateProductItem({ productId: 10 }),
	// 		generateProductItem({ productId: 11 }),
	// 		generateProductItem({ productId: 12 }),
	// 		generateProductItem({ productId: 13 }),
	// 		generateProductItem({ productId: 14 }),
	// 		generateProductItem({ productId: 15 }),
	// 		generateProductItem({ productId: 16 }),
	// 		generateProductItem({ productId: 17 }),
	// 	],
	// });

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '11111',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '22222',
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			cartId: 1,
			productItemId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
			},
		},
	});

	await prisma.story.createMany({
		data: [
			{
				previewImageUrl: '/assets/images/stories/91nlfLRDuqL.jpg',
			},
			{
				previewImageUrl:
					'/assets/images/stories/minimal-pizza-instagram-story-or-whatsapp-sta-design-template-60434ee5215167b7af94fe6580259cdb_screen.jpg',
			},
			{
				previewImageUrl: '/assets/images/stories/81ojGVUJR6L.jpg',
			},
			{
				previewImageUrl: '/assets/images/stories/pizza-burger.jpg',
			},
			{
				previewImageUrl: '/assets/images/stories/8bb8d356534aeb6062b009bc50b84c98.jpg',
			},
			{
				previewImageUrl: '/assets/images/stories/c3e31ec11a7d11516108a7a3bbff0f22.jpg',
			},
		],
	});

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl: '/assets/images/stories/bda33be5896625213e1c728179227819.jpg',
			},
			{
				storyId: 1,
				sourceUrl: '/assets/images/stories/40e2cd0a3e6c4a048fa1c8067a6a631e.jpg',
			},
			{
				storyId: 1,
				sourceUrl: '/assets/images/stories/f91082a8bb2d4d3c47294b999cc8483b.jpg',
			},
			{
				storyId: 1,
				sourceUrl: '/assets/images/stories/12UpIkbEsT6Ee.jpg',
			},
			{
				storyId: 1,
				sourceUrl: '/assets/images/stories/5f40f25d6eab7a430d5fc7543c824b70.jpg',
			},
			{
				storyId: 2,
				sourceUrl: '/assets/images/stories/f91082a8bb2d4d3c47294b999cc8483b.jpg',
			},
			{
				storyId: 2,
				sourceUrl: '/assets/images/stories/bda33be5896625213e1c728179227819.jpg',
			},
			{
				storyId: 2,
				sourceUrl: '/assets/images/stories/40e2cd0a3e6c4a048fa1c8067a6a631e.jpg',
			},
			{
				storyId: 2,
				sourceUrl: '/assets/images/stories/12UpIkbEsT6Ee.jpg',
			},
			{
				storyId: 2,
				sourceUrl: '/assets/images/stories/5f40f25d6eab7a430d5fc7543c824b70.jpg',
			},
			{
				storyId: 3,
				sourceUrl: '/assets/images/stories/40e2cd0a3e6c4a048fa1c8067a6a631e.jpg',
			},
			{
				storyId: 3,
				sourceUrl: '/assets/images/stories/f91082a8bb2d4d3c47294b999cc8483b.jpg',
			},
			{
				storyId: 3,
				sourceUrl: '/assets/images/stories/bda33be5896625213e1c728179227819.jpg',
			},
			{
				storyId: 3,
				sourceUrl: '/assets/images/stories/5f40f25d6eab7a430d5fc7543c824b70.jpg',
			},
			{
				storyId: 3,
				sourceUrl: '/assets/images/stories/12UpIkbEsT6Ee.jpg',
			},
			{
				storyId: 4,
				sourceUrl: '/assets/images/stories/bda33be5896625213e1c728179227819.jpg',
			},
			{
				storyId: 4,
				sourceUrl: '/assets/images/stories/12UpIkbEsT6Ee.jpg',
			},
			{
				storyId: 4,
				sourceUrl: '/assets/images/stories/5f40f25d6eab7a430d5fc7543c824b70.jpg',
			},
			{
				storyId: 4,
				sourceUrl: '/assets/images/stories/40e2cd0a3e6c4a048fa1c8067a6a631e.jpg',
			},
			{
				storyId: 4,
				sourceUrl: '/assets/images/stories/f91082a8bb2d4d3c47294b999cc8483b.jpg',
			},
			{
				storyId: 5,
				sourceUrl: '/assets/images/stories/40e2cd0a3e6c4a048fa1c8067a6a631e.jpg',
			},
			{
				storyId: 5,
				sourceUrl: '/assets/images/stories/12UpIkbEsT6Ee.jpg',
			},
			{
				storyId: 5,
				sourceUrl: '/assets/images/stories/f91082a8bb2d4d3c47294b999cc8483b.jpg',
			},
			{
				storyId: 5,
				sourceUrl: '/assets/images/stories/bda33be5896625213e1c728179227819.jpg',
			},
			{
				storyId: 5,
				sourceUrl: '/assets/images/stories/5f40f25d6eab7a430d5fc7543c824b70.jpg',
			},
			{
				storyId: 6,
				sourceUrl: '/assets/images/stories/5f40f25d6eab7a430d5fc7543c824b70.jpg',
			},
			{
				storyId: 6,
				sourceUrl: '/assets/images/stories/40e2cd0a3e6c4a048fa1c8067a6a631e.jpg',
			},
			{
				storyId: 6,
				sourceUrl: '/assets/images/stories/bda33be5896625213e1c728179227819.jpg',
			},
			{
				storyId: 6,
				sourceUrl: '/assets/images/stories/f91082a8bb2d4d3c47294b999cc8483b.jpg',
			},
			{
				storyId: 6,
				sourceUrl: '/assets/images/stories/12UpIkbEsT6Ee.jpg',
			},
		],
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
	await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
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
