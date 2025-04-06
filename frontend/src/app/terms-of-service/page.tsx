import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Terms of Service | Swastify - Healthcare Feedback Platform",
  description: "Read the terms and conditions for using the Swastify healthcare feedback platform.",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-light-green/20 dark:bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-green-900">
      <Header />

      <section className="w-full py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-zinc-900 dark:text-white">Terms of Service</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-zinc-700 dark:text-gray-300">
                These Terms of Service ("Terms") govern your use of{" "}
                <strong className="text-deep-green dark:text-light-green">Swastify</strong>. By accessing and using our
                platform, you agree to comply with these Terms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-gray-300">
                <li>You agree to provide accurate and truthful feedback on Swastify's platform.</li>
                <li>You will not submit harmful, offensive, or illegal content.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Feedback Data</h2>
              <p className="text-zinc-700 dark:text-gray-300">
                By submitting feedback, you grant Swastify the right to use that feedback to improve the platform. Your
                feedback is stored securely in our Supabase database.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Limitations of Liability</h2>
              <p className="text-zinc-700 dark:text-gray-300">
                Swastify is not responsible for any damages, losses, or issues that may arise from using the platform.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Changes to Terms</h2>
              <p className="text-zinc-700 dark:text-gray-300">
                We may update these Terms of Service from time to time. Any updates will be posted on this page, and the
                most recent version will be indicated by the date of the update.
              </p>

              <p className="text-zinc-700 dark:text-gray-300 mt-8">
                By using Swastify, you agree to abide by these Terms of Service.
              </p>

              <div className="border-t border-gray-200 dark:border-zinc-800 mt-8 pt-4">
                <p className="text-zinc-500 dark:text-gray-400 text-sm">Last updated: April 6, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

