import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: "Our Mission | Swastify - Healthcare Feedback Platform",
  description:
    "Discover Swastify's mission to transform healthcare through community feedback and innovative solutions.",
}

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-light-green/20 dark:bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-green-900">
      <Header />

      <section className="w-full py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">Our Mission</h1>
              <p className="text-xl text-zinc-700 dark:text-gray-300 max-w-3xl mx-auto">
                We&apos;re on a mission to transform healthcare by connecting real experiences with innovative solutions.
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Why We Exist</h2>
              <p className="text-zinc-700 dark:text-gray-300 mb-6">
                Healthcare systems worldwide face similar challenges: rising costs, access barriers, and experiences
                that often fail to meet patients&apos; needs. At Swastify, we believe that the first step to solving these
                problems is to listen to the people who experience them firsthand.
              </p>
              <p className="text-zinc-700 dark:text-gray-300 mb-6">
                Our platform creates a space where patients, caregivers, and healthcare professionals can share their
                experiences, challenges, and ideas. We then use this collective wisdom to drive meaningful innovation in
                healthcare.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-lg shadow-md border border-gray-200/50 dark:border-zinc-800/50">
                  <h3 className="text-xl font-bold mb-4 text-deep-green dark:text-light-green flex items-center">
                    <CheckCircle2 className="h-6 w-6 mr-2" />
                    What We Do
                  </h3>
                  <ul className="space-y-3 text-zinc-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        1
                      </span>
                      <span>Collect healthcare experiences from diverse communities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        2
                      </span>
                      <span>Analyze patterns and identify critical gaps in care</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        3
                      </span>
                      <span>Develop innovative solutions to address these gaps</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        4
                      </span>
                      <span>Partner with healthcare providers to implement changes</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-lg shadow-md border border-gray-200/50 dark:border-zinc-800/50">
                  <h3 className="text-xl font-bold mb-4 text-deep-green dark:text-light-green flex items-center">
                    <CheckCircle2 className="h-6 w-6 mr-2" />
                    Our Goals
                  </h3>
                  <ul className="space-y-3 text-zinc-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        1
                      </span>
                      <span>Gather 100,000+ healthcare experiences by 2025</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        2
                      </span>
                      <span>Launch 10 innovative healthcare solutions based on community feedback</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        3
                      </span>
                      <span>Partner with 50+ healthcare organizations to implement improvements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-deep-green/20 dark:bg-light-green/20 text-deep-green dark:text-light-green rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                        4
                      </span>
                      <span>Measurably improve patient satisfaction in partner organizations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Our Impact Areas</h2>
              <p className="text-zinc-700 dark:text-gray-300 mb-6">
                Based on the feedback we&apos;ve collected so far, we&apos;re focusing our efforts on several key areas where we
                believe we can make the biggest difference:
              </p>

              <div className="space-y-6 my-8">
                <div className="border-l-4 border-deep-green dark:border-light-green pl-4 py-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Patient Communication</h3>
                  <p className="text-zinc-700 dark:text-gray-300">
                    Improving how healthcare providers communicate with patients about diagnoses, treatment options, and
                    care plans.
                  </p>
                </div>

                <div className="border-l-4 border-deep-green dark:border-light-green pl-4 py-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Care Coordination</h3>
                  <p className="text-zinc-700 dark:text-gray-300">
                    Developing better systems for coordinating care across different providers and specialties.
                  </p>
                </div>
              </div>

              <div className="bg-deep-green/10 dark:bg-light-green/10 p-6 rounded-lg my-12 border border-deep-green/20 dark:border-light-green/20 text-center">
                <h3 className="text-2xl font-bold mb-4 text-deep-green dark:text-light-green">Join Our Mission</h3>
                <p className="text-zinc-700 dark:text-gray-300 mb-6">
                  Your healthcare experience matters. By sharing your story, you&apos;re helping us identify patterns and
                  develop solutions that can improve healthcare for everyone.
                </p>
                <p className="text-zinc-700 dark:text-gray-300 font-medium">
                  Together, we can build a healthcare system that truly puts people first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

