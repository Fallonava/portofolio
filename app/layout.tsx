import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fallonava Project | Future Web",
    template: "%s | Fallonava Project"
  },
  description: "Experience the fusion of high-performance code and stunning visual design by Fallonava.",
  keywords: ["Next.js", "React", "Portfolio", "Fallonava", "Full Stack"],
  authors: [{ name: "Fallonava" }],
  creator: "Fallonava",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://antigravity.dev",
    title: "Antigravity - The Future of Web Portfolios",
    description: "Experience liftoff with a portfolio that defies expectations. Built with Next.js & Framer Motion.",
    siteName: "Antigravity Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antigravity | Build the Future",
    description: "Experience the fusion of high-performance code and stunning visual design.",
    creator: "@antigravity",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${inter.variable} font-sans antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
