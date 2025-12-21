import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
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
    default: "Antigravity | Build the Future",
    template: "%s | Antigravity Portfolio"
  },
  description: "A next-generation full-stack developer portfolio. Experience the fusion of high-performance code and stunning visual design.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Portfolio", "Full Stack", "Web Development"],
  authors: [{ name: "Antigravity Dev" }],
  creator: "Antigravity Dev",
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
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
