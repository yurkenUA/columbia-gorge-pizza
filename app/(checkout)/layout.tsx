import { Container, Header } from '@/shared/components/shared';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Columbia Gorge Pizza | Cart',
	description:
		'Developed by Zatoka Developer based on Next.js, TypeScript, TailwindCSS and Shadcn UI',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-screen bg-[#F4F1EE]">
			<Container>
				<Suspense>
					<Header hasSearch={false} hasCart={false} className="border-b-gray-200" />
				</Suspense>
				{children}
			</Container>
		</main>
	);
}
