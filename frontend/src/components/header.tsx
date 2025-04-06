"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-gray-200/50 dark:border-zinc-800/50 sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <Image
              src="/images/swastify-logo.png"
              alt="Swastify Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-zinc-900 dark:text-white">Swastify</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`transition-colors ${
              isActive("/")
                ? "text-deep-green dark:text-light-green font-medium"
                : "text-zinc-700 dark:text-gray-300 hover:text-deep-green dark:hover:text-light-green"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              isActive("/about")
                ? "text-deep-green dark:text-light-green font-medium"
                : "text-zinc-700 dark:text-gray-300 hover:text-deep-green dark:hover:text-light-green"
            }`}
          >
            About
          </Link>
          <Link
            href="/mission"
            className={`transition-colors ${
              isActive("/mission")
                ? "text-deep-green dark:text-light-green font-medium"
                : "text-zinc-700 dark:text-gray-300 hover:text-deep-green dark:hover:text-light-green"
            }`}
          >
            Mission
          </Link>
          <Link
            href="/contact"
            className={`transition-colors ${
              isActive("/contact")
                ? "text-deep-green dark:text-light-green font-medium"
                : "text-zinc-700 dark:text-gray-300 hover:text-deep-green dark:hover:text-light-green"
            }`}
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-zinc-900 dark:text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col space-y-8 mt-6 px-2">
              <Link
                href="/"
                className={`text-lg ${
                  isActive("/")
                    ? "text-deep-green dark:text-light-green font-medium"
                    : "text-zinc-900 dark:text-white hover:text-deep-green dark:hover:text-light-green"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-lg ${
                  isActive("/about")
                    ? "text-deep-green dark:text-light-green font-medium"
                    : "text-zinc-900 dark:text-white hover:text-deep-green dark:hover:text-light-green"
                }`}
              >
                About
              </Link>
              <Link
                href="/mission"
                className={`text-lg ${
                  isActive("/mission")
                    ? "text-deep-green dark:text-light-green font-medium"
                    : "text-zinc-900 dark:text-white hover:text-deep-green dark:hover:text-light-green"
                }`}
              >
                Mission
              </Link>
              <Link
                href="/contact"
                className={`text-lg ${
                  isActive("/contact")
                    ? "text-deep-green dark:text-light-green font-medium"
                    : "text-zinc-900 dark:text-white hover:text-deep-green dark:hover:text-light-green"
                }`}
              >
                Contact
              </Link>
              <div className="flex justify-between items-center pt-2">
                <span className="text-zinc-900 dark:text-white text-lg">Theme</span>
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

