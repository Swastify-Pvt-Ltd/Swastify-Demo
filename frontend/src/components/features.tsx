import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Shield, Users, Clock } from "lucide-react"

export default function Features() {
  const features = [
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

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-100 to-white dark:bg-gradient-to-b dark:from-green-900 dark:to-zinc-900 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Why Share Your Experience?</h2>
          <p className="text-zinc-700 dark:text-gray-300 max-w-2xl mx-auto">
            Your feedback is the foundation for building better healthcare solutions. Here&apos;s how your input makes a
            difference:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/80 dark:bg-zinc-900/30 border-gray-200 dark:border-zinc-800/30 hover:border-deep-green/50 dark:hover:border-light-green/50 hover:shadow-lg dark:hover:shadow-zinc-900/30 transition-colors duration-300 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-zinc-900 dark:text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-700 dark:text-gray-300 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

