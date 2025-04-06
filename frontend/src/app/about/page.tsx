import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedGradientBackground from "@/components/animated-gradient-background"
import Image from "next/image"

export const metadata = {
  title: "About Us | Swastify - Healthcare Feedback Platform",
  description: "Learn about Swastify's mission to improve healthcare through community feedback.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-light-green/20 dark:bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-green-900">
      <AnimatedGradientBackground />
      <Header />

      <section className="w-full py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">About Swastify</h1>

            <div className="mb-12 relative rounded-xl overflow-hidden h-64 md:h-96">
              <Image
                src="/images/swastify-cover.png"
                alt="Swastify Team"
                width={800}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-zinc-700 dark:text-gray-300 mb-6">
                Swastify was founded in 2025 with a simple yet powerful mission: to transform healthcare by listening to
                the people who matter most—patients, caregivers, and healthcare professionals.
              </p>

              
            

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Our Team</h2>
              <p className="text-zinc-700 dark:text-gray-300 mb-6">
                Swastify brings together experts from healthcare, technology, and design. Our diverse team is united by
                a common purpose: to make healthcare more responsive to human needs. From doctors and nurses to software
                engineers and data scientists, we approach healthcare challenges from multiple perspectives.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Our Approach</h2>
              <p className="text-zinc-700 dark:text-gray-300 mb-6">
                We believe in the power of community-driven innovation. By collecting and analyzing thousands of
                healthcare experiences, we identify patterns and opportunities that might otherwise go unnoticed. Then,
                we work with healthcare providers, technologists, and policymakers to develop practical solutions.
              </p>

              <div className="bg-deep-green/10 dark:bg-light-green/10 p-6 rounded-lg my-8 border border-deep-green/20 dark:border-light-green/20">
                <h3 className="text-xl font-bold mb-2 text-deep-green dark:text-light-green">Our Values</h3>
                <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-gray-300">
                  <li>
                    <strong>Empathy:</strong> We put people first in everything we do.
                  </li>
                  <li>
                    <strong>Transparency:</strong> We believe in open communication and sharing our findings.
                  </li>
                  <li>
                    <strong>Innovation:</strong> We constantly seek new and better ways to solve healthcare challenges.
                  </li>
                  <li>
                    <strong>Inclusivity:</strong> We ensure our platform is accessible to everyone, regardless of
                    background or ability.
                  </li>
                  <li>
                    <strong>Impact:</strong> We measure our success by the positive changes we help create in
                    healthcare.
                  </li>
                </ul>
              </div>

              <p className="text-zinc-700 dark:text-gray-300 mb-6">
                Join us in our mission to transform healthcare through the power of community feedback. Your experience
                matters, and together, we can build a healthcare system that truly works for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

