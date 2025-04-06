import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-100 dark:bg-zinc-950 border-t border-gray-200/50 dark:border-zinc-800/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
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
            </div>
            <p className="text-zinc-600 dark:text-gray-400">
              Where Healthcare Meets Innovation. Building solutions to real healthcare problems.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/mission"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  Healthcare Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  Patient Rights
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-600 dark:text-gray-400 hover:text-deep-green dark:hover:text-light-green transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-medium mb-4">Stay Updated</h3>
            <p className="text-zinc-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest healthcare solutions.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-deep-green dark:focus:border-light-green focus:ring-deep-green/20 dark:focus:ring-light-green/20 text-zinc-900 dark:text-white"
              />
              <Button className="bg-deep-green hover:bg-deep-green/90 dark:bg-light-green dark:hover:bg-light-green/90 text-white dark:text-zinc-950 font-medium transition-all duration-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 dark:text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Swastify. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-zinc-500 dark:text-gray-500 text-sm hover:text-deep-green dark:hover:text-light-green transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-zinc-500 dark:text-gray-500 text-sm hover:text-deep-green dark:hover:text-light-green transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-zinc-500 dark:text-gray-500 text-sm hover:text-deep-green dark:hover:text-light-green transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

