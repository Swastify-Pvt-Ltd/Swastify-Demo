"use client"

import { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"

// Update the form schema to simplify the validation and avoid the error
const formSchema = z.object({
  // Section 1
  name: z.string().optional(),
  occupation: z.string().optional(),
  ageGroup: z.string().optional(),
  hasRegularProvider: z.string().optional(),

  // Section 2
  accessMethods: z.array(z.string()).optional(),
  accessMethodOther: z.string().optional(),
  accessDifficulties: z.string().optional(),
  difficultiesDescription: z.string().optional(),
  understandRecords: z.string().optional(),
  timelyRecords: z.string().optional(),
  simpleProcess: z.string().optional(),
  feelInformed: z.string().optional(),
  trustSecurity: z.string().optional(),
  timeToReceive: z.string().optional(),

  // Section 3
  explainedAccess: z.string().optional(),
  contactedHelp: z.string().optional(),
  otherContact: z.string().optional(),
  makeEasier: z.string().optional(),
})

// Create a type for the form values
type FormValues = z.infer<typeof formSchema>

// Create a type for the form field names
type FormFieldType = keyof FormValues

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [accessOtherSpecified, setAccessOtherSpecified] = useState(false)
  const [contactOtherSpecified, setContactOtherSpecified] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      occupation: "",
      ageGroup: "",
      hasRegularProvider: "",
      accessMethods: [],
      accessMethodOther: "",
      accessDifficulties: "",
      difficultiesDescription: "",
      understandRecords: "",
      timelyRecords: "",
      simpleProcess: "",
      feelInformed: "",
      trustSecurity: "",
      timeToReceive: "",
      explainedAccess: "",
      contactedHelp: "",
      otherContact: "",
      makeEasier: "",
    },
  })

  const watchAccessDifficulties = form.watch("accessDifficulties")
  const watchAccessMethods = form.watch("accessMethods")
  const watchContactedHelp = form.watch("contactedHelp")

  useEffect(() => {
    if (watchAccessMethods?.includes("Other")) {
      setAccessOtherSpecified(true)
    } else {
      setAccessOtherSpecified(false)
    }
  }, [watchAccessMethods])

  useEffect(() => {
    if (watchContactedHelp === "Other") {
      setContactOtherSpecified(true)
    } else {
      setContactOtherSpecified(false)
    }
  }, [watchContactedHelp])

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent theme flash by hiding content until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-green"></div>
        </div>
      </div>
    )
  }

  // Update the onSubmit function to properly map the form fields to database columns
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Map form values to database column names (camelCase to snake_case)
      const dbValues = {
        name: values.name || null,
        occupation: values.occupation || null,
        age_group: values.ageGroup,
        has_regular_provider: values.hasRegularProvider,
        access_methods: values.accessMethods,
        access_method_other: values.accessMethodOther || null,
        access_difficulties: values.accessDifficulties,
        difficulties_description: values.difficultiesDescription || null,
        understand_records: values.understandRecords,
        timely_records: values.timelyRecords,
        simple_process: values.simpleProcess,
        feel_informed: values.feelInformed,
        trust_security: values.trustSecurity,
        time_to_receive: values.timeToReceive,
        explained_access: values.explainedAccess,
        contacted_help: values.contactedHelp,
        other_contact: values.otherContact || null,
        make_easier: values.makeEasier || null,
        created_at: new Date().toISOString(),
      }

      console.log("Submitting survey data:", dbValues)

      // Insert data into Supabase with detailed error handling
      const { error } = await supabase.from("survey_responses").insert([dbValues])

      if (error) {
        console.error("Supabase error details:", error)
        throw new Error(`Failed to submit survey: ${error.message} (Code: ${error.code})`)
      }

      setIsSuccess(true)

      toast.success("Survey submitted successfully", {
        description: "Thank you for your valuable feedback.",
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset()
        setIsSuccess(false)
        setCurrentStep(1)
      }, 3000)
    } catch (err) {
      console.error("Error submitting survey:", err)

      toast.error("Submission failed", {
        description:
          err instanceof Error ? err.message : "There was a problem submitting your survey. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Replace the nextStep function with this updated version that uses toast messages
  const nextStep = () => {
    const fieldsToValidate: Record<number, { field: FormFieldType; label: string }[]> = {
      1: [
        { field: "ageGroup", label: "age group" },
        { field: "hasRegularProvider", label: "regular healthcare provider" },
      ],
      2: [
        { field: "accessMethods", label: "access methods" },
        { field: "accessDifficulties", label: "difficulties accessing records" },
        { field: "understandRecords", label: "understanding of records" },
        { field: "timelyRecords", label: "timeliness of records" },
        { field: "simpleProcess", label: "simplicity of process" },
        { field: "feelInformed", label: "feeling informed" },
        { field: "trustSecurity", label: "trust in security" },
        { field: "timeToReceive", label: "time to receive records" },
      ],
      3: [
        { field: "explainedAccess", label: "doctor explanation" },
        { field: "contactedHelp", label: "who you contacted" },
      ],
    }

    const currentFieldsToValidate = fieldsToValidate[currentStep]

    // Check for empty required fields
    const emptyFields = currentFieldsToValidate.filter(({ field }) => {
      const value = form.getValues(field)
      if (Array.isArray(value)) {
        return !value.length
      }
      return !value
    })

    // Special case for difficultiesDescription
    if (
      currentStep === 2 &&
      form.getValues("accessDifficulties") === "Yes" &&
      !form.getValues("difficultiesDescription")
    ) {
      toast.error("Please describe the difficulties you've experienced")
      return
    }

    if (emptyFields.length > 0) {
      const fieldLabels = emptyFields.map((f) => f.label).join(", ")
      toast.error(`Please fill in the following: ${fieldLabels}`)
      return
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Submit form on last step
      onSubmit(form.getValues())
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const isDark = resolvedTheme === "dark"

  // Helper function to check if a field has an error
  const fieldHasError = (name: FormFieldType) => {
    const fieldState = form.getFieldState(name)
    return fieldState.invalid
  }

  // Get step title based on current step
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information"
      case 2:
        return "Accessing Medical Records"
      case 3:
        return "Communication & Support"
      default:
        return ""
    }
  }

  // Define rating fields for type safety
  const ratingFields: { name: FormFieldType; label: string }[] = [
    {
      name: "understandRecords",
      label: "I can easily understand my medical records",
    },
    {
      name: "timelyRecords",
      label: "I receive my records in a timely manner",
    },
    { name: "simpleProcess", label: "The request process is simple" },
    { name: "feelInformed", label: "I feel informed about access" },
    {
      name: "trustSecurity",
      label: "I trust the security of the systems",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />

      <section className="w-full py-4 md:py-8 relative">
        <div className="container mx-auto px-3 md:px-6">
          <div className="max-w-2xl mx-auto" ref={formRef}>
            {/* Simplified mobile-friendly header */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Healthcare Records Survey</h1>
                <span className="bg-deep-green/10 dark:bg-light-green/20 text-deep-green dark:text-light-green px-2 py-1 rounded-full text-xs font-medium">
                  {currentStep}/{totalSteps}
                </span>
              </div>
              <Progress value={progress} className="h-1.5 mt-2 bg-gray-200 dark:bg-zinc-700" />
            </div>

            {isSuccess ? (
              <div
                className={`${isDark ? "bg-zinc-900/50 border-light-green/20" : "bg-white border-deep-green/20"} rounded-lg p-6 border shadow-sm text-center`}
              >
                <CheckCircle2 className={`h-16 w-16 mx-auto mb-4 ${isDark ? "text-light-green" : "text-deep-green"}`} />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>Thank You!</h3>
                <p className={`mb-4 ${isDark ? "text-gray-300" : "text-zinc-700"}`}>
                  Your survey has been submitted successfully. Your feedback is valuable in helping us improve
                  healthcare record access.
                </p>
              </div>
            ) : (
              <div
                className={`${isDark ? "bg-zinc-900/50 border-zinc-800/50" : "bg-white border-gray-200/50"} rounded-lg p-4 border shadow-sm`}
              >
                <Form {...form}>
                  <form className="space-y-4">
                    {/* Step title - simplified for mobile */}
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-deep-green/10 dark:bg-light-green/20 flex items-center justify-center text-deep-green dark:text-light-green font-medium mr-2 text-sm">
                        {currentStep}
                      </div>
                      <h2 className={`text-lg font-medium ${isDark ? "text-white" : "text-zinc-900"}`}>
                        {getStepTitle()}
                      </h2>
                    </div>

                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                  Your Name (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your name"
                                    {...field}
                                    className={`border ${isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200"}`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                  Your Occupation (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your occupation"
                                    {...field}
                                    className={`border ${isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200"}`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="ageGroup"
                          render={({ field }) => (
                            <FormItem className="space-y-2" data-invalid={fieldHasError("ageGroup")}>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                What is your age group? <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={Array.isArray(field.value) ? field.value[0] : field.value}
                                  className={`grid grid-cols-2 gap-2 ${fieldHasError("ageGroup") ? "border border-red-500 dark:border-red-400 rounded-md p-2" : ""}`}
                                >
                                  {[
                                    "Under 18",
                                    "18–24",
                                    "25–34",
                                    "35–44",
                                    "45–54",
                                    "55–64",
                                    "65+",
                                    "Prefer not to say",
                                  ].map((age) => (
                                    <FormItem
                                      key={age}
                                      className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                        field.value === age ? (isDark ? "bg-zinc-800" : "bg-gray-100") : ""
                                      } p-2 transition-colors duration-200`}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={age} />
                                      </FormControl>
                                      <FormLabel
                                        className={`font-normal cursor-pointer text-sm ${isDark ? "text-white" : "text-zinc-900"}`}
                                      >
                                        {age}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hasRegularProvider"
                          render={({ field }) => (
                            <FormItem className="space-y-2" data-invalid={fieldHasError("hasRegularProvider")}>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                Do you have a regular healthcare provider? <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={Array.isArray(field.value) ? field.value[0] : field.value}
                                  className={`flex gap-4 ${fieldHasError("hasRegularProvider") ? "border border-red-500 dark:border-red-400 rounded-md p-2" : ""}`}
                                >
                                  {["Yes", "No"].map((option) => (
                                    <FormItem
                                      key={option}
                                      className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                        field.value === option ? (isDark ? "bg-zinc-800" : "bg-gray-100") : ""
                                      } p-2 transition-colors duration-200`}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option} />
                                      </FormControl>
                                      <FormLabel
                                        className={`font-normal cursor-pointer ${isDark ? "text-white" : "text-zinc-900"}`}
                                      >
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="accessMethods"
                          render={({ field }) => (
                            <FormItem data-invalid={fieldHasError("accessMethods")}>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                How do you usually access your medical records? <span className="text-red-500">*</span>
                              </FormLabel>
                              <div
                                className={`grid grid-cols-1 gap-2 ${fieldHasError("accessMethods") ? "border border-red-500 dark:border-red-400 rounded-md p-2" : ""}`}
                              >
                                {[
                                  "Patient portal (online)",
                                  "Printed copies from the doctor",
                                  "Email from clinic",
                                  "Phone request",
                                  "I don't access them",
                                  "Other",
                                ].map((method) => (
                                  <FormItem
                                    key={method}
                                    className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                      field.value?.includes(method) ? (isDark ? "bg-zinc-800" : "bg-gray-100") : ""
                                    } p-2 transition-colors duration-200`}
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(method)}
                                        onCheckedChange={(checked) => {
                                          const updatedValue = checked
                                            ? [...(field.value || []), method]
                                            : (field.value || []).filter((value) => value !== method)
                                          field.onChange(updatedValue)
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      className={`font-normal cursor-pointer ${isDark ? "text-white" : "text-zinc-900"}`}
                                    >
                                      {method}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </div>
                              <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1" />
                            </FormItem>
                          )}
                        />

                        {accessOtherSpecified && (
                          <FormField
                            control={form.control}
                            name="accessMethodOther"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                  Please specify other method
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Other access method"
                                    {...field}
                                    className={`border ${isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200"}`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name="accessDifficulties"
                          render={({ field }) => (
                            <FormItem className="space-y-2" data-invalid={fieldHasError("accessDifficulties")}>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                Have you faced difficulties accessing your records?{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={Array.isArray(field.value) ? field.value[0] : field.value}
                                  className={`flex gap-4 ${fieldHasError("accessDifficulties") ? "border border-red-500 dark:border-red-400 rounded-md p-2" : ""}`}
                                >
                                  {["Yes", "No"].map((option) => (
                                    <FormItem
                                      key={option}
                                      className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                        field.value === option ? (isDark ? "bg-zinc-800" : "bg-gray-100") : ""
                                      } p-2 transition-colors duration-200`}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option} />
                                      </FormControl>
                                      <FormLabel
                                        className={`font-normal cursor-pointer ${isDark ? "text-white" : "text-zinc-900"}`}
                                      >
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />

                        {watchAccessDifficulties === "Yes" && (
                          <FormField
                            control={form.control}
                            name="difficultiesDescription"
                            render={({ field }) => (
                              <FormItem data-invalid={fieldHasError("difficultiesDescription")}>
                                <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                  What difficulties have you experienced? <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Please describe your difficulties"
                                    className={`resize-none ${isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200"} ${
                                      fieldHasError("difficultiesDescription")
                                        ? "border-red-500 dark:border-red-400"
                                        : ""
                                    }`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Simplified rating section for mobile */}
                        <div className={`p-3 rounded-md ${isDark ? "bg-zinc-800/50" : "bg-gray-50"}`}>
                          <p className={`font-medium mb-3 text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>
                            Rate your experience <span className="text-red-500">*</span>
                          </p>

                          {ratingFields.map((item) => (
                            <FormField
                              key={item.name}
                              control={form.control}
                              name={item.name}
                              render={({ field }) => (
                                <FormItem className="mb-5" data-invalid={fieldHasError(item.name)}>
                                  <div className="flex flex-col gap-1">
                                    <FormLabel className={`${isDark ? "text-white" : "text-zinc-900"} text-sm mb-2`}>
                                      {item.label}
                                    </FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={Array.isArray(field.value) ? field.value[0] : field.value}
                                        className={`flex flex-col space-y-1 ${
                                          fieldHasError(item.name)
                                            ? "border border-red-500 dark:border-red-400 rounded-md p-2"
                                            : ""
                                        }`}
                                      >
                                        {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map(
                                          (option) => (
                                            <FormItem
                                              key={option}
                                              className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                                field.value === option
                                                  ? isDark
                                                    ? "bg-zinc-700"
                                                    : "bg-gray-200"
                                                  : isDark
                                                    ? "bg-zinc-800/50"
                                                    : "bg-white"
                                              } p-2 transition-colors duration-200`}
                                            >
                                              <FormControl>
                                                <RadioGroupItem value={option} />
                                              </FormControl>
                                              <FormLabel
                                                className={`font-normal cursor-pointer text-sm w-full m-0 ${isDark ? "text-white" : "text-zinc-900"}`}
                                              >
                                                {option}
                                              </FormLabel>
                                            </FormItem>
                                          ),
                                        )}
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                  <FormMessage className="text-red-500 dark:text-red-400 text-xs" />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>

                        <FormField
                          control={form.control}
                          name="timeToReceive"
                          render={({ field }) => (
                            <FormItem className="space-y-2" data-invalid={fieldHasError("timeToReceive")}>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                How long does it take to receive your records? <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className={`grid grid-cols-1 gap-2 ${
                                    fieldHasError("timeToReceive")
                                      ? "border border-red-500 dark:border-red-400 rounded-md p-2"
                                      : ""
                                  }`}
                                >
                                  {[
                                    "Immediately",
                                    "Within a day",
                                    "2–3 days",
                                    "4–7 days",
                                    "More than a week",
                                    "I've never received them",
                                  ].map((option) => (
                                    <FormItem
                                      key={option}
                                      className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                        field.value === option ? (isDark ? "bg-zinc-800" : "bg-gray-100") : ""
                                      } p-2 transition-colors duration-200`}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option} />
                                      </FormControl>
                                      <FormLabel
                                        className={`font-normal cursor-pointer ${isDark ? "text-white" : "text-zinc-900"}`}
                                      >
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="explainedAccess"
                          render={({ field }) => (
                            <FormItem className="space-y-2" data-invalid={fieldHasError("explainedAccess")}>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                Has your doctor explained how to access your records?{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className={`flex flex-wrap gap-2 ${
                                    fieldHasError("explainedAccess")
                                      ? "border border-red-500 dark:border-red-400 rounded-md p-2"
                                      : ""
                                  }`}
                                >
                                  {["Yes", "No", "I don't remember"].map((option) => (
                                    <FormItem
                                      key={option}
                                      className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                        field.value === option ? (isDark ? "bg-zinc-800" : "bg-gray-100") : ""
                                      } p-2 transition-colors duration-200`}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option} />
                                      </FormControl>
                                      <FormLabel
                                        className={`font-normal cursor-pointer ${isDark ? "text-white" : "text-zinc-900"}`}
                                      >
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="contactedHelp"
                          render={({ field }) => (
                            <FormItem className="space-y-2" data-invalid={fieldHasError("contactedHelp")}>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                If you needed help, who did you contact? <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className={`grid grid-cols-1 gap-2 ${
                                    fieldHasError("contactedHelp")
                                      ? "border border-red-500 dark:border-red-400 rounded-md p-2"
                                      : ""
                                  }`}
                                >
                                  {[
                                    "Doctor",
                                    "Front desk staff",
                                    "Tech support/IT",
                                    "I didn't contact anyone",
                                    "Other",
                                  ].map((option) => (
                                    <FormItem
                                      key={option}
                                      className={`flex items-center space-x-3 space-y-0 rounded-md cursor-pointer ${
                                        field.value === option ? (isDark ? "bg-zinc-800" : "bg-gray-100") : ""
                                      } p-2 transition-colors duration-200`}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option} />
                                      </FormControl>
                                      <FormLabel
                                        className={`font-normal cursor-pointer ${isDark ? "text-white" : "text-zinc-900"}`}
                                      >
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />

                        {contactOtherSpecified && (
                          <FormField
                            control={form.control}
                            name="otherContact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                  Please specify who you contacted
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Who did you contact?"
                                    {...field}
                                    className={`border ${isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200"}`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name="makeEasier"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={isDark ? "text-white" : "text-zinc-900"}>
                                What would make accessing your records easier?
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please share your suggestions"
                                  className={`resize-none min-h-[80px] ${isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200"}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className={`text-xs ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
                                Your suggestions help improve healthcare record access.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <div className="flex justify-between pt-3 mt-4 border-t border-gray-200 dark:border-zinc-700">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`cursor-pointer ${isDark ? "border-zinc-700 text-white" : "border-gray-300 text-zinc-700"}`}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>

                      <Button
                        type="button"
                        onClick={currentStep === totalSteps ? form.handleSubmit(onSubmit) : nextStep}
                        disabled={isSubmitting}
                        className={`cursor-pointer ${
                          isDark
                            ? "bg-light-green text-zinc-900 hover:bg-light-green/90"
                            : "bg-deep-green text-white hover:bg-deep-green/90"
                        }`}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : currentStep === totalSteps ? (
                          "Submit"
                        ) : (
                          <>
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
