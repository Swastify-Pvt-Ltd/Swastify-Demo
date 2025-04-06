import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import NotificationBanner from "@/components/notification-banner"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Swastify - Healthcare Feedback Platform",
  description: "Share your healthcare experiences and help us build better solutions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NotificationBanner />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

