"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-full bg-green-700/90 dark:bg-light-green/90 backdrop-blur-sm text-white dark:text-zinc-950  px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="font-medium text-sm">
            <span className="hidden sm:inline">🚀</span> Swastify is currently in ideation phase. Your feedback is
            extremely valuable to us!
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-white dark:text-zinc-950 hover:bg-deep-green/80 dark:hover:bg-light-green/80 hover:text-white dark:hover:text-zinc-950"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}

