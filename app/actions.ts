'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates/order-success';
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';
import { CheckoutFormValues } from '@/shared/constants';
import { sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get('cartToken')?.value;

		if (!cartToken) {
			throw new Error('Cart token not found');
		}

		/* Находим корзину по токену */
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		/* Если корзина не найдена возращаем ошибку */
		if (!userCart) {
			throw new Error('Cart not found');
		}

		/* Если корзина пустая возращаем ошибку */
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty');
		}

		/* Create an order */
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
				paymentId: Math.random().toString(36).substring(7),
			},
		});

		/* Clear cart */
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: OrderStatus.SUCCESSED,
			},
		});

		const paymentUrl = process.env.PAYMENT_URL ?? 'http://localhost:3000/?paid';

		await sendEmail(
			'zatoka.dev@gmail.com',
			'Columbia Gorge Pizza /  Order #' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl,
			}),
		);

		await sendEmail(
			'zatoka.dev@gmail.com',
			'Columbia Gorge Pizza /  Order #' + order.id,
			OrderSuccessTemplate({
				orderId: order.id,
				items: JSON.parse(order?.items as string) as CartItemDTO[],
			}),
		);

		return paymentUrl;
	} catch (err) {
		console.log('[CreateOrder] Server error', err);
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error('User not found');
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
			},
		});
	} catch (err) {
		console.log('Error [UPDATE_USER]', err);
		throw err;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error('Email not confirmed');
			}

			throw new Error('The user already exists');
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
				verified: new Date(),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		await sendEmail(
			createdUser.email,
			'Columbia Gorge Pizza / 📝 Confirmation of registration',
			VerificationUserTemplate({
				code,
			}),
		);
	} catch (err) {
		console.log('Error [CREATE_USER]', err);
		throw err;
	}
}
