import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Donato Carpentiere | Developer Portfolio",
  description:
    "Full-stack developer passionate about building beautiful, performant, and accessible web applications.",
  keywords: [
    "developer",
    "full-stack",
    "next.js",
    "react",
    "typescript",
    "portfolio",
  ],
  authors: [{ name: "Donato Carpentiere" }],
  icons: {
    icon: [{ url: "/images/donato-logo.png", type: "image/png" }],
    apple: [{ url: "/images/donato-logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "Donato Carpentiere | Developer Portfolio",
    description:
      "Full-stack developer passionate about building beautiful, performant, and accessible web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donato Carpentiere | Developer Portfolio",
    description:
      "Full-stack developer passionate about building beautiful, performant, and accessible web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "it")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/images/donato-logo.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
