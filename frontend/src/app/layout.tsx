import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import NotificationBanner from "@/components/notification-banner"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Swastify - #1 Healthcare Platform | Swastify Life | Swastify Care",
  description:
    "Swastify is India's leading healthcare platform transforming patient care, doctor connections, and hospital management. Our comprehensive solution makes healthcare accessible, efficient, and personalized for all users. Experience the future of healthcare with Swastify Life and Swastify Care.",
  keywords:
    "swastify, swastify care, swastify life, healthcare platform, digital healthcare, medical services, healthcare solution, india healthcare",
  icons: {
    icon: [
      { url: "https://swastify.life/favicon.ico", type: "image/x-icon" },
      { url: "https://swastify.life/images/swastify-logo.png", type: "image/png" },
    ],
    shortcut: [{ url: "https://swastify.life/favicon.ico", type: "image/x-icon" }],
    apple: { url: "https://swastify.life/images/swastify-logo.png", type: "image/png" },
    other: [
      {
        rel: "image_src",
        url: "https://swastify.life/images/swastify-logo.png",
      },
    ],
  },
  metadataBase: new URL("https://swastify.life"),
  alternates: {
    canonical: "https://swastify.life",
  },
  openGraph: {
    title: "Swastify - #1 Healthcare Platform | Swastify Life | Swastify Care",
    description:
      "Swastify is India's leading healthcare platform transforming patient care, doctor connections, and hospital management. Our comprehensive solution makes healthcare accessible, efficient, and personalized for all users.",
    url: "https://swastify.life",
    siteName: "Swastify",
    images: [
      {
        url: "https://swastify.life/images/swastify-logo.png",
        width: 800,
        height: 800,
        alt: "Swastify Logo",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swastify - #1 Healthcare Platform | Swastify Life | Swastify Care",
    description:
      "Swastify is India's leading healthcare platform transforming patient care, doctor connections, and hospital management. Experience the future of healthcare with Swastify.",
    images: ["https://swastify.life/images/swastify-logo.png"],
    creator: "@getswastify",
    site: "@getswastify",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "a2FAvi39LjBMje-T4K-Cken3FLyXFcjsy8jiw5g41bo",
    yandex: "verify",
    yahoo: "verify",
  },
  other: {
    "apple-mobile-web-app-title": "Swastify",
    "application-name": "Swastify",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "https://swastify.life/images/swastify-logo.png",
    "msapplication-config": "https://swastify.life/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://swastify.life" />
        <link rel="shortcut icon" href="https://swastify.life/favicon.ico" />
        <link rel="icon" type="image/png" href="https://swastify.life/images/swastify-logo.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <NotificationBanner />
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
