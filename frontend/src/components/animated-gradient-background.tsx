"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDark = resolvedTheme === "dark"

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient circles
    const circles: Circle[] = []
    const colors = isDark
      ? [
          "rgba(164, 219, 77, 0.2)", // light-green
          "rgba(1, 122, 52, 0.2)", // deep-green
          "rgba(1, 122, 52, 0.1)", // deep-green lighter
          "rgba(164, 219, 77, 0.1)", // light-green lighter
        ]
      : [
          "rgba(1, 122, 52, 0.1)", // deep-green
          "rgba(164, 219, 77, 0.1)", // light-green
          "rgba(1, 122, 52, 0.05)", // deep-green lighter
          "rgba(164, 219, 77, 0.05)", // light-green lighter
        ]

    for (let i = 0; i < 5; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update circles
      circles.forEach((circle) => {
        // Update position
        circle.x += circle.vx
        circle.y += circle.vy

        // Bounce off edges
        if (circle.x < 0 || circle.x > canvas.width) circle.vx *= -1
        if (circle.y < 0 || circle.y > canvas.height) circle.vy *= -1

        // Draw circle
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)
        gradient.addColorStop(0, circle.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />
}

interface Circle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
}

