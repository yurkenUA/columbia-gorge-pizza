'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
	const router = useRouter();
	const [openAuthModal, setOpenAuthModal] = React.useState(false);
	const searchParams = useSearchParams();

	React.useEffect(() => {
		let toastMessage = '';

		if (searchParams.has('paid')) {
			toastMessage = 'Order successfully paid! 🎉 Order info sent to email';
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Email successfully verified! 🎉';
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/');
				toast.success(toastMessage, {
					icon: '✅',
					duration: 3000,
				});
			}, 500);
		}
	}, [searchParams]);

	return (
		<header className={cn('border-b', className)}>
			<Container className="flex items-center justify-between py-8">
				{/* Left Side */}
				<Link href="/" className="flex items-center gap-4">
					<Image src="/logo.svg" alt="Logo" width={60} height={65} />
					<div>
						<h1 className="text-2xl uppercase font-black">Columbia Gorge Pizza</h1>
						<p className="text-sm text-gray-400 leading-3 text-center">
							where bold flavors meet the majestic
							<br />
							Columbia River and peaks of Hood and Adams
						</p>
					</div>
				</Link>

				{/* Search */}
				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				{/* Right Side */}
				<div className="flex items-center gap-3">
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
