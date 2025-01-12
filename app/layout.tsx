import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared";

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Columbia Gorge Pizza",
    description:
        "New Modern Pizza Shop in the Columbia Gorge. Created by Zatoka Developer based on Next.js, TypeScript, TailwindCSS and Shadcn UI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={nunito.variable}>
                <Header />
                <main className="min-h-screen">{children}</main>
            </body>
        </html>
    );
}
