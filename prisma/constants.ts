export const categories = [
	{ name: 'Pizza' },
	{ name: 'Combo' },
	{ name: 'Appetizers' },
	{ name: 'Cocktails' },
	{ name: 'Coffee' },
	{ name: 'Beverages' },
	{ name: 'Desserts' },
];

export const _ingredients = [
	{
		name: 'Cheese Crust',
		price: 6,
		imageUrl: '/assets/images/products/99f5cb91225b4875bd06a26d2e842106.png',
	},
	{
		name: 'Creamy Mozzarella',
		price: 3,
		imageUrl: '/assets/images/products/cdea869ef287426386ed634e6099a5ba.png',
	},
	{
		name: 'Cheddar and Parmesan',
		price: 3,
		imageUrl: '/assets/images/products/000D3A22FA54A81411E9AFA69C1FE796.png',
	},
	{
		name: 'Spicy Jalapeño Pepper',
		price: 2,
		imageUrl: '/assets/images/products/11ee95b6bfdf98fb88a113db92d7b3df.png',
	},
	{
		name: 'Tender Chicken',
		price: 3,
		imageUrl: '/assets/images/products/000D3A39D824A82E11E9AFA5B328D35A.png',
	},
	{
		name: 'Champignon Mushrooms',
		price: 2,
		imageUrl: '/assets/images/products/000D3A22FA54A81411E9AFA67259A324.png',
	},
	{
		name: 'Bacon',
		price: 3,
		imageUrl: '/assets/images/products/000D3A39D824A82E11E9AFA637AAB68F.png',
	},
	{
		name: 'Ham',
		price: 3,
		imageUrl: '/assets/images/products/000D3A39D824A82E11E9AFA61B9A8D61.png',
	},
	{
		name: 'Spicy Pepperoni',
		price: 3,
		imageUrl: '/assets/images/products/000D3A22FA54A81411E9AFA6258199C3.png',
	},
	{
		name: 'Spicy Chorizo',
		price: 3,
		imageUrl: '/assets/images/products/000D3A22FA54A81411E9AFA62D5D6027.png',
	},
	{
		name: 'Pickled Cucumbers',
		price: 2,
		imageUrl: '/assets/images/products/000D3A21DA51A81211E9EA89958D782B.png',
	},
	{
		name: 'Fresh Tomatoes',
		price: 2,
		imageUrl: '/assets/images/products/000D3A39D824A82E11E9AFA7AC1A1D67.png',
	},
	{
		name: 'Red Onion',
		price: 2,
		imageUrl: '/assets/images/products/000D3A22FA54A81411E9AFA60AE6464C.png',
	},
	{
		name: 'Juicy Pineapples',
		price: 2,
		imageUrl: '/assets/images/products/000D3A21DA51A81211E9AFA6795BA2A0.png',
	},
	{
		name: 'Italian Herbs',
		price: 1,
		imageUrl: '/assets/images/products/370dac9ed21e4bffaf9bc2618d258734.png',
	},
	{
		name: 'Sweet Pepper',
		price: 2,
		imageUrl: '/assets/images/products/000D3A22FA54A81411E9AFA63F774C1B.png',
	},
	{
		name: 'Feta Cheese Cubes',
		price: 3,
		imageUrl: '/assets/images/products/000D3A39D824A82E11E9AFA6B0FFC349.png',
	},
	{
		name: 'Meatballs',
		price: 3,
		imageUrl: '/assets/images/products/b2f3a5d5afe44516a93cfc0d2ee60088.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	{
		name: 'Chicken box',
		imageUrl: '/assets/images/products/chicken-box.avif',
		categoryId: 2,
	},
	{
		name: 'Breakfast for two',
		imageUrl: '/assets/images/products/breakfast.avif',
		categoryId: 2,
	},
	{
		name: '3 pizzas',
		imageUrl: '/assets/images/products/3-pizzas.avif',
		categoryId: 2,
	},
	{
		name: '2 pizzas',
		imageUrl: '/assets/images/products/2-pizzas.avif',
		categoryId: 2,
	},
	{
		name: '4 Appetizers',
		imageUrl: '/assets/images/products/4-appetizers.avif',
		categoryId: 2,
	},
	{
		name: '2 signature appetizers',
		imageUrl: '/assets/images/products/2-signature-appetizers.avif',
		categoryId: 2,
	},
	{
		name: '5 Pizzas',
		imageUrl: '/assets/images/products/5-pizzas.avif',
		categoryId: 2,
	},
	{
		name: '6 Pizzas',
		imageUrl: '/assets/images/products/6-pizzas.avif',
		categoryId: 2,
	},
	{
		name: '7 Pizzas',
		imageUrl: '/assets/images/products/7-pizzas.avif',
		categoryId: 2,
	},
	{
		name: 'Omelet with Ham and Mushrooms',
		imageUrl: '/assets/images/products/omlet-ham-mushrooms.avif',
		categoryId: 3,
	},
	{
		name: 'Omelet with Pepperoni',
		imageUrl: '/assets/images/products/omlet-pepperoni.avif',
		categoryId: 3,
	},

	{
		name: 'Denwich Ham and Cheese',
		imageUrl: '/assets/images/products/denwich-ham-cheese.avif',
		categoryId: 3,
	},
	{
		name: 'Danwich Chorizo BBQ',
		imageUrl: '/assets/images/products/denwich-chorizo.avif',
		categoryId: 3,
	},
	{
		name: 'Beef Danwich',
		imageUrl: '/assets/images/products/denwich-beef.avif',
		categoryId: 3,
	},
	{
		name: 'Chicken Nuggets',
		imageUrl: '/assets/images/products/chicken-nuggets.avif',
		categoryId: 3,
	},
	{
		name: 'Oven-Baked Potatoes with Sauce 🌱',
		imageUrl: '/assets/images/products/oven-baked-potatoes.avif',
		categoryId: 3,
	},
	{
		name: 'Dodster',
		imageUrl: '/assets/images/products/dodster.avif',
		categoryId: 3,
	},
	{
		name: 'Spicy Dodster 🌶️🌶️',
		imageUrl: '/assets/images/products/spicy-dodster.avif',
		categoryId: 3,
	},
	{
		name: 'Peach Milkshake',
		imageUrl: '/assets/images/products/peach-milkshake.avif',
		categoryId: 4,
	},
	{
		name: 'Milkshake Pistachio',
		imageUrl: '/assets/images/products/milkshake-pistachio.avif',
		categoryId: 4,
	},
	{
		name: 'Banana Milkshake',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
		categoryId: 4,
	},
	{
		name: 'Caramel Apple Milkshake',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
		categoryId: 4,
	},
	{
		name: 'Oreo Cookie Milkshake',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
		categoryId: 4,
	},
	{
		name: 'Classic Milkshake 👶',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
		categoryId: 4,
	},
	{
		name: 'Irish Cappuccino',
		imageUrl: '/assets/images/products/irish-cappuccino.avif',
		categoryId: 5,
	},
	{
		name: 'Apple Pie Cappuccino',
		imageUrl: '/assets/images/products/apple-pie.avif',
		categoryId: 5,
	},
	{
		name: 'Cappuccino',
		imageUrl: '/assets/images/products/cappuccino.avif',
		categoryId: 5,
	},
	{
		name: 'Coffee Nut Latte',
		imageUrl: '/assets/images/products/nut-latte.avif',
		categoryId: 5,
	},
	{
		name: 'Coffee Caramel Cappuccino',
		imageUrl: '/assets/images/products/caramel-cappuccino.avif',
		categoryId: 5,
	},
	{
		name: 'Coffee Coconut Latte',
		imageUrl: '/assets/images/products/coconut-latte.avif',
		categoryId: 5,
	},
	{
		name: 'Coffee Americano',
		imageUrl: '/assets/images/products/americano.avif',
		categoryId: 5,
	},
	{
		name: 'Coffee Latte',
		imageUrl: '/assets/images/products/latte.avif',
		categoryId: 5,
	},
];
