"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure to avoid layout shift
    return (
      <section className="w-full py-16 md:py-24 relative overflow-hidden min-h-screen flex justify-center items-center">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">{/* Placeholder content */}</div>
        </div>
      </section>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <section
      className={`w-full py-16 md:py-24 relative overflow-hidden min-h-screen flex justify-center items-center ${
        isDark
          ? "bg-gradient-to-b from-zinc-950 via-zinc-900 to-green-900/70"
          : "bg-gradient-to-b from-gray-50 via-gray-100 to-light-green/20"
      }`}
    >
      {/* Abstract background shapes - visible in both light and dark modes but with different opacities */}
      {/* <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-deep-green/30 to-light-green/20 dark:from-light-green/20 dark:to-deep-green/20 blur-3xl"></div> */}
      <div className="absolute bottom-1/2 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-light-green/20 to-deep-green/20 dark:from-deep-green/20 dark:to-light-green/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-deep-green/5 via-transparent to-transparent dark:from-light-green/5 dark:via-transparent dark:to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-deep-green/10 to-light-green/10 dark:from-light-green/20 dark:to-deep-green/20 border border-deep-green/20 dark:border-light-green/30">
            <span className="text-deep-green dark:text-light-green text-sm font-medium">
              Healthcare Feedback Platform
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight ${
              isDark
                ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-light-green to-white"
                : "bg-clip-text text-transparent bg-gradient-to-r from-deep-green via-deep-green to-deep-green/80"
            }`}
          >
            Tell Us Your Healthcare Struggles.
          </h1>

          <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${isDark ? "text-gray-300" : "text-zinc-700"}`}>
            Swastify is building a platform to solve real medical problems — and your story matters. Share what you've
            faced in the healthcare system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className={`${
                isDark
                  ? "bg-gradient-to-r from-light-green to-deep-green hover:from-light-green/90 hover:to-deep-green/90 text-zinc-950"
                  : "bg-gradient-to-r from-deep-green to-deep-green/90 hover:from-deep-green/90 hover:to-deep-green text-white"
              } font-medium px-6 py-6 rounded-lg shadow-lg transition-colors duration-300 text-lg`}
              onClick={() => document.getElementById("feedback-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Share Your Experience
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className={`${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-zinc-800 hover:text-light-green"
                  : "border-gray-300 text-zinc-700 hover:bg-gray-100 hover:text-deep-green"
              } px-6 py-6 rounded-lg text-lg transition-colors duration-200`}
            >
              Learn More
            </Button>
          </div>

          {/* Healthcare icons/graphics */}
          <div className="mt-16 grid grid-cols-3 gap-4 opacity-80">
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full ${
                  isDark ? "bg-light-green/20" : "bg-deep-green/20"
                } flex items-center justify-center mb-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${isDark ? "text-light-green" : "text-deep-green"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className={`text-sm ${isDark ? "text-gray-300" : "text-zinc-700"}`}>Patient Care</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full ${
                  isDark ? "bg-light-green/20" : "bg-deep-green/20"
                } flex items-center justify-center mb-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${isDark ? "text-light-green" : "text-deep-green"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className={`text-sm ${isDark ? "text-gray-300" : "text-zinc-700"}`}>Healthcare</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full ${
                  isDark ? "bg-light-green/20" : "bg-deep-green/20"
                } flex items-center justify-center mb-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${isDark ? "text-light-green" : "text-deep-green"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <span className={`text-sm ${isDark ? "text-gray-300" : "text-zinc-700"}`}>Feedback</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

