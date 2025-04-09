import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import NotificationBanner from "@/components/notification-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Swastify - Healthcare Platform",
  description: "Swastify is building a comprehensive healthcare solution with user feedback shaping its development.",
  icons: {
    icon: "/images/swastify-logo.png",
  },
  openGraph: {
    title: "Swastify - Healthcare Platform",
    description: "Swastify is building a comprehensive healthcare solution with user feedback shaping its development.",
    url: "https://swastify.life", // Updated to your correct site URL
    siteName: "Swastify",
    images: [
      {
        url: "/images/swastify-logo.png", // Image for Open Graph
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
    description: "Swastify is building a comprehensive healthcare solution with user feedback shaping its development.",
    image: "/images/swastify-logo.png", // Image for Twitter Card
  },
  social: {
    linkedin: "https://linkedin.com/company/getswastify",
    twitter: "https://x.com/getswastify",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <NotificationBanner />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
