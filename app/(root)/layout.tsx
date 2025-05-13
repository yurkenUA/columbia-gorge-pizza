import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/shared/components/shared';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Columbia Gorge Pizza',
	description:
		'New Modern Pizza Shop in the Columbia Gorge. Created by Zatoka Developer based on Next.js, TypeScript, TailwindCSS and Shadcn UI',
};

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen">
			<Suspense>
				<Header />
			</Suspense>
			{children}
			{modal}
		</main>
	);
}
