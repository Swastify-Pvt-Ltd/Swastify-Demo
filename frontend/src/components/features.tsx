import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HeartPulse,
  Shield,
  Users,
  Clock,
  FileText,
  Calendar,
  Database,
  History,
  Award,
} from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: <FileText className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Seamless Medical Records",
    description: "Access your complete medical records instantly and securely from anywhere, anytime.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Appointment Management",
    description: "Schedule, reschedule, or cancel appointments with ease through our intuitive interface.",
  },
  {
    icon: <Database className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Content Management",
    description: "Efficiently organize and manage all your healthcare documents in one centralized location.",
  },
  {
    icon: <History className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Medical History",
    description: "Track your complete medical history with chronological timelines and detailed reports.",
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Improve Patient Care",
    description: "Your feedback helps us identify critical gaps in healthcare delivery and patient experience.",
  },
  {
    icon: <Shield className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Secure & Anonymous",
    description: "Share your experience with confidence. All submissions can be anonymous and are securely stored.",
  },
  {
    icon: <Users className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Community Driven",
    description: "Join thousands of others sharing their healthcare experiences to drive meaningful change.",
  },
  {
    icon: <Clock className="h-10 w-10 text-deep-green dark:text-light-green" />,
    title: "Real-time Solutions",
    description: "We're actively building solutions based on the feedback we receive from users like you.",
  },
]

export default function Features() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-100 to-white dark:from-zinc-900 dark:to-zinc-950 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Why Choose Swastify?</h2>
          <p className="text-zinc-700 dark:text-gray-300 max-w-2xl mx-auto">
            Our comprehensive healthcare platform is designed to transform your healthcare experience. Here&apos;s what we offer:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 hover:border-deep-green/50 dark:hover:border-light-green/50 shadow-md hover:shadow-lg transition-all duration-300 h-full"
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-zinc-900 dark:text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-zinc-700 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnerships & Certifications Section */}
        <div className="relative mt-24 pt-16">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 max-w-4xl">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-zinc-700"></div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Trusted Partnerships
            </h2>
            <p className="text-zinc-700 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              We&apos;re proud to be recognized and certified by leading organizations
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-32">
            {/* MSME Logo */}
            <div className="text-center">
              <div className="relative bg-white dark:bg-white rounded-lg p-4 inline-block">
                <div className="relative h-28 w-56 sm:h-36 sm:w-72 md:h-44 md:w-88">
                  <Image src="/images/msme-logo.png" alt="MSME Certified" fill className="object-contain" />
                </div>
              </div>
              <p className="text-base mt-4 font-medium text-zinc-700 dark:text-gray-300">MSME Certified</p>
            </div>

            {/* Microsoft for Startups */}
            <div className="text-center">
              <div className="relative bg-white dark:bg-white rounded-lg p-4 inline-block">
                <div className="relative h-28 w-56 sm:h-36 sm:w-72 md:h-44 md:w-88">
                  <Image
                    src="/images/microsoft-startups.jpg"
                    alt="Microsoft for Startups Partner"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <p className="text-base mt-4 font-medium text-zinc-700 dark:text-gray-300">
                Microsoft for Startups Partner
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4">
              <Award className="h-5 w-5 text-deep-green dark:text-light-green" />
              <span className="text-base font-medium text-zinc-900 dark:text-white">
                Committed to excellence in healthcare innovation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
