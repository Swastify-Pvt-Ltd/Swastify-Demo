import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import NotificationBanner from "@/components/notification-banner";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Swastify - Healthcare Platform",
  description:
    "Swastify is building a comprehensive healthcare solution with user feedback shaping its development.",
  icons: {
    icon: "/images/swastify-logo.png",
  },
  openGraph: {
    title: "Swastify - Healthcare Platform",
    description:
      "Swastify is building a comprehensive healthcare solution with user feedback shaping its development.",
    url: "https://swastify.life", // Updated to your correct site URL
    siteName: "Swastify",
    images: [
      {
        url: "https://swastify.life/images/swastify-logo.png", 
        width: 800,
        height: 800,
        alt: "Swastify Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swastify - Healthcare Platform",
    description:
      "Swastify is building a comprehensive healthcare solution with user feedback shaping its development.",
    image: ["https://swastify.life/images/swastify-logo.png"], 
  },
  social: {
    linkedin: "https://linkedin.com/company/getswastify",
    twitter: "https://x.com/getswastify",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="google-site-verification"
        content="a2FAvi39LjBMje-T4K-Cken3FLyXFcjsy8jiw5g41bo"
      />
      <meta property="og:title" content="Swastify - Healthcare Platform" />
      <meta
        property="og:description"
        content="Swastify is building a comprehensive healthcare solution with user feedback shaping its development."
      />
      <meta
        property="og:image"
        content="https://swastify.life/images/swastify-logo.png"
      />
      <meta property="og:url" content="https://swastify.life" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Swastify - Healthcare Platform" />
      <meta
        name="twitter:description"
        content="Swastify is building a comprehensive healthcare solution with user feedback shaping its development."
      />
      <meta
        name="twitter:image"
        content="https://swastify.life/images/swastify-logo.png"
      />
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange>
          <NotificationBanner />
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
