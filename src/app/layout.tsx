import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/atoms/logo/logo";
import { Footer } from "@/components/atoms/footer/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Raung Aman",
	description: "Ruang Aman. Ai mental health condition analysis",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Logo />
				{children}
				<Footer />
			</body>
		</html>
	);
}
