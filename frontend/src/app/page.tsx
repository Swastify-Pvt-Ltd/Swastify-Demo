import FeedbackForm from "@/components/feedback-form"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
// import Features from "@/components/features"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0C]">
      <Header />
      <HeroSection />
      {/* Features component temporarily disabled */}
      {/* <Features /> */}
      <FeedbackForm />
      <Footer />
    </main>
  )
}

