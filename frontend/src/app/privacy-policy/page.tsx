import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Privacy Policy | Swastify - Healthcare Feedback Platform",
  description: "Learn about how Swastify collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-light-green/20 dark:bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-green-900">
      <Header />

      <section className="w-full py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-zinc-900 dark:text-white">Privacy Policy</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-zinc-700 dark:text-gray-300">
                At <strong className="text-deep-green dark:text-light-green">Swastify</strong>, we are committed to
                protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal
                information when you use our platform.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Information We Collect</h2>
              <p className="text-zinc-700 dark:text-gray-300">We collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-gray-300">
                <li>
                  <strong>Feedback Data</strong>: The feedback you submit through our platform (e.g., comments, ratings,
                  or suggestions).
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">How We Use Your Data</h2>
              <p className="text-zinc-700 dark:text-gray-300">We use the data you provide to:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-gray-300">
                <li>Improve our services.</li>
                <li>Analyze user feedback to enhance the user experience.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Data Security</h2>
              <p className="text-zinc-700 dark:text-gray-300">
                We take the security of your data seriously. Your feedback data is stored securely in our database
                (Supabase) and is protected by industry-standard encryption.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Sharing Your Data</h2>
              <p className="text-zinc-700 dark:text-gray-300">
                We do not share your data with third parties except as required by law or to improve our services.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Your Rights</h2>
              <p className="text-zinc-700 dark:text-gray-300">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-gray-300">
                <li>Access, update, or delete your data stored by us.</li>
                <li>
                  For any concerns or requests, please contact us at{" "}
                  <a
                    href="mailto:getswastify@gmail.com"
                    className="text-deep-green dark:text-light-green hover:underline"
                  >
                    getswastify@gmail.com
                  </a>
                  .
                </li>
              </ul>

              <p className="text-zinc-700 dark:text-gray-300 mt-8">
                By using Swastify, you agree to the collection and use of your data as described in this Privacy Policy.
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

