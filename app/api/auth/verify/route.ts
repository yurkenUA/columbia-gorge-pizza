import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		// const code = req.nextUrl.searchParams.get('code');
		const code = '';

		if (!code) {
			return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
		}

		const verificationCode = await prisma.verificationCode.findFirst({
			where: {
				code,
			},
		});

		if (!verificationCode) {
			return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
		}

		await prisma.user.update({
			where: {
				id: verificationCode?.userId as number,
			},
			data: {
				verified: new Date(),
			},
		});

		await prisma.verificationCode.delete({
			where: {
				id: verificationCode?.id,
			},
		});

		return NextResponse.redirect(new URL('/?verified', req.url));
	} catch (error) {
		console.error(error);
		console.log('[VERIFY_GET] Server error', error);
	}
}
