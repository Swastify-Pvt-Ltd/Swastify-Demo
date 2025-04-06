import FeedbackForm from "@/components/feedback-form"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import Features from "@/components/features"
import AnimatedGradientBackground from "@/components/animated-gradient-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-light-green/20 dark:bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-green-900">
      <AnimatedGradientBackground />
      <Header />
      <HeroSection />
      {/* <Features /> */}
      <FeedbackForm />
      <Footer />
    </main>
  )
}

