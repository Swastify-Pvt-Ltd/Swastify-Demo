"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Heart, Shield, MessageSquare, Stethoscope, Pill } from "lucide-react"

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
          : "bg-gradient-to-b from-gray-50 via-gray-100 to-green-50"
      }`}
    >
      {/* Light mode specific background elements */}
      {!isDark && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-light-green/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-deep-green/10 to-transparent rounded-full blur-3xl"></div>
        </>
      )}

      {/* Dark mode specific background elements */}
      {isDark && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-light-green/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-deep-green/10 to-transparent rounded-full blur-3xl"></div>
        </>
      )}

      {/* Shared background elements */}
      <div className="absolute bottom-1/2 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-light-green/20 to-deep-green/20 dark:from-deep-green/20 dark:to-light-green/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-deep-green/5 via-transparent to-transparent dark:from-light-green/5 dark:via-transparent dark:to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto relative">
          
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-deep-green/10 to-light-green/10 dark:from-light-green/20 dark:to-deep-green/20 border border-deep-green/20 dark:border-light-green/30 animate-pulse">
            <span className="text-deep-green dark:text-light-green text-sm font-medium">Your Feedback Matters!</span>
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
            Swastify is building a platform to solve real medical problems.
            <br />
            and your story matters. Share what you've faced in the healthcare system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className={`${
                isDark
                  ? "bg-gradient-to-r from-light-green to-deep-green hover:from-light-green/90 hover:to-deep-green/90 text-zinc-100"
                  : "bg-gradient-to-r from-deep-green to-deep-green/90 hover:from-deep-green/90 hover:to-deep-green text-white"
              } font-medium px-6 py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
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
              } px-6 py-6 rounded-lg text-lg transition-all duration-300 hover:-translate-y-1`}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

