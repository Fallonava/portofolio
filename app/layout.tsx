import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { Noise } from "@/components/ui/Noise";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "sonner";
import { getSiteSettings } from "@/sanity/lib/siteSettings";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const accent   = settings.accentColor ?? '#007AFF';
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`:root { --accent: ${accent}; --primary: ${accent}; }`}</style>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased selection:bg-primary selection:text-white`}
      >
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <CustomCursor />
            <Noise />
            <ScrollProgress />
            {children}
            <WhatsAppButton />
            <Toaster 
              toastOptions={{
                className: "bg-card text-card-foreground border-[3px] border-border brutal-shadow font-bold rounded-xl",
              }}
            />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
