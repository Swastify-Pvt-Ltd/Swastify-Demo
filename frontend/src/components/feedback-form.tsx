"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useTheme } from "next-themes"

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email" }).optional().or(z.literal("")),
  occupation: z.string().optional(),
  experience: z.string().min(10, {
    message: "Your experience must be at least 10 characters.",
  }),
})

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submissionCount, setSubmissionCount] = useState(128) // Example count
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      occupation: "",
      experience: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Insert data into Supabase
      const { error: supabaseError } = await supabase.from("feedback").insert([
        {
          name: values.name || null,
          email: values.email || null,
          occupation: values.occupation || null,
          experience: values.experience,
        },
      ])

      if (supabaseError) throw new Error(supabaseError.message)

      setIsSuccess(true)
      setSubmissionCount((prev) => prev + 1)

      // Show success toast
      toast.success("Feedback submitted successfully", {
        description: "Thank you for sharing your healthcare experience.",
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset()
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      console.error("Error submitting feedback:", err)

      // Show error toast
      toast.error("Submission failed", {
        description: "There was a problem submitting your feedback. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // If not mounted yet, return a placeholder to avoid hydration issues
  if (!mounted) {
    return (
      <section id="feedback-form" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">{/* Placeholder content */}</div>
        </div>
      </section>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <section
      id="feedback-form"
      className={`w-full py-16 md:py-24 relative ${
        isDark ? "bg-gradient-to-b from-zinc-900 to-zinc-950" : "bg-gradient-to-b from-white to-gray-100"
      }`}
    >
      {/* Abstract background shapes */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full ${
          isDark
            ? "bg-gradient-to-br from-light-green/10 to-deep-green/10"
            : "bg-gradient-to-br from-deep-green/10 to-light-green/10"
        } blur-3xl`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-96 h-96 rounded-full ${
          isDark
            ? "bg-gradient-to-tr from-deep-green/5 to-light-green/5"
            : "bg-gradient-to-tr from-light-green/5 to-deep-green/5"
        } blur-3xl`}
      ></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>
            Share Your Healthcare Experience
          </h2>
          <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-zinc-700"}`}>
            Be part of something truly extraordinary. Join thousands of others already helping us build better
            healthcare solutions.
          </p>

          {isSuccess ? (
            <div
              className={`${
                isDark ? "bg-navy-light/30 border-light-green/20" : "bg-white border-deep-green/20"
              } backdrop-blur-md rounded-xl p-8 border text-center shadow-lg`}
            >
              <CheckCircle2 className={`h-16 w-16 mx-auto mb-4 ${isDark ? "text-light-green" : "text-deep-green"}`} />
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Thank You!</h3>
              <p className={`mb-6 ${isDark ? "text-gray-300" : "text-zinc-700"}`}>
                Your feedback has been submitted successfully. We appreciate your contribution to improving healthcare.
              </p>
              <div className={`flex items-center justify-center gap-1 ${isDark ? "text-gray-300" : "text-zinc-600"}`}>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-deep-green flex items-center justify-center text-white text-xs">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-light-green flex items-center justify-center text-navy text-xs">
                    AS
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    MK
                  </div>
                </div>
                <span className="ml-2">{submissionCount}+ people have shared their experiences</span>
              </div>
            </div>
          ) : (
            <div
              className={`${
                isDark ? "bg-navy-light/30 border-light-green/20" : "bg-white border-deep-green/20"
              } backdrop-blur-md rounded-xl p-8 border shadow-lg`}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>Name (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className={`${
                                isDark
                                  ? "bg-navy-lighter/50 border-light-green/20 focus:border-light-green focus:ring-light-green/20 text-white placeholder:text-gray-400"
                                  : "bg-gray-50 border-deep-green/20 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900 placeholder:text-gray-500"
                              }`}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-300" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>Email (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              type="email"
                              {...field}
                              className={`${
                                isDark
                                  ? "bg-navy-lighter/50 border-light-green/20 focus:border-light-green focus:ring-light-green/20 text-white placeholder:text-gray-400"
                                  : "bg-gray-50 border-deep-green/20 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900 placeholder:text-gray-500"
                              }`}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-300" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>Occupation (optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className={`${
                                isDark
                                  ? "bg-navy-lighter/50 border-light-green/20 focus:border-light-green focus:ring-light-green/20 text-white"
                                  : "bg-gray-50 border-deep-green/20 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900"
                              }`}
                            >
                              <SelectValue placeholder="Select your occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={`${
                              isDark
                                ? "bg-navy-light border-light-green/20 text-white"
                                : "bg-white border-deep-green/20 text-zinc-900"
                            }`}
                          >
                            <SelectItem value="healthcare-professional">Healthcare Professional</SelectItem>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="caregiver">Caregiver</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 dark:text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                          Your Experience / Problem <span className="text-red-500 dark:text-red-300">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please share your healthcare experience or challenge..."
                            rows={6}
                            {...field}
                            className={`${
                              isDark
                                ? "bg-navy-lighter/50 border-light-green/20 focus:border-light-green focus:ring-light-green/20 text-white placeholder:text-gray-400"
                                : "bg-gray-50 border-deep-green/20 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900 placeholder:text-gray-500"
                            } resize-none`}
                          />
                        </FormControl>
                        <FormDescription className={isDark ? "text-gray-400" : "text-zinc-600"}>
                          Please be specific about the challenges you've faced.
                        </FormDescription>
                        <FormMessage className="text-red-500 dark:text-red-300" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className={`w-full ${
                      isDark
                        ? "bg-light-green hover:bg-light-green/90 text-navy"
                        : "bg-gradient-to-r from-deep-green to-deep-green/90 hover:from-deep-green/90 hover:to-deep-green text-white"
                    } font-medium py-6 rounded-md shadow-md text-lg transition-colors duration-300`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </Form>

              <div
                className={`mt-6 flex items-center justify-center gap-1 ${isDark ? "text-gray-300" : "text-zinc-600"}`}
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-deep-green flex items-center justify-center text-white text-xs">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-light-green flex items-center justify-center text-navy text-xs">
                    AS
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    MK
                  </div>
                </div>
                <span className="ml-2">{submissionCount}+ people have shared their experiences</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

