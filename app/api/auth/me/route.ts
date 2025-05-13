import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shared/constants/auth-options';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const user = await getServerSession(authOptions);

		if (!user) {
			return NextResponse.json({ message: 'User not authorized' }, { status: 401 });
		}

		const data = await prisma.user.findFirst({
			where: {
				id: Number(user.user.id),
			},
			select: {
				fullName: true,
				email: true,
			},
		});

		console.log(data);

		return NextResponse.json(data);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
	}
}
