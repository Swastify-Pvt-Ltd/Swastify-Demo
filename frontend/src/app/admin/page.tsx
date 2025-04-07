"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Eye, Search, CheckCircle, XCircle, LogOut, AlertCircle, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import Header from "@/components/header"
import Footer from "@/components/footer"
import type { FeedbackSubmission, ContactSubmission } from "@/lib/supabase-schema"

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [feedbackData, setFeedbackData] = useState<FeedbackSubmission[]>([])
  const [contactData, setContactData] = useState<ContactSubmission[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("feedback")
  const [selectedItem, setSelectedItem] = useState<FeedbackSubmission | ContactSubmission | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [blockedIPs, setBlockedIPs] = useState<{ ip: string; blockedUntil: Date }[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchData()
    fetchBlockedIPs() // Add this line
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "DELETE",
      })

      toast.success("Logged out successfully")
      router.push("/admin/login")
      router.refresh() // Refresh to update the UI based on the cookie change
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Logout failed")
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    setFetchError(null)

    try {
      console.log("Fetching feedback data...")

      // Fetch feedback data
      const { data: feedbackResults, error: feedbackError } = await supabase.from("feedback").select("*")

      if (feedbackError) {
        console.error("Feedback fetch error:", feedbackError)
        throw feedbackError
      }

      console.log("Feedback data received:", feedbackResults)
      setFeedbackData(feedbackResults || [])

      // Fetch contact data
      console.log("Fetching contact data...")
      const { data: contactResults, error: contactError } = await supabase.from("contact_submissions").select("*")

      if (contactError) {
        console.error("Contact fetch error:", contactError)
        throw contactError
      }

      console.log("Contact data received:", contactResults)
      setContactData(contactResults || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      setFetchError(error instanceof Error ? error.message : String(error) || "Failed to fetch data")
      toast.error("Failed to fetch data")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBlockedIPs = async () => {
    try {
      const response = await fetch("/api/auth/blocked-ips")
      if (!response.ok) {
        throw new Error("Failed to fetch blocked IPs")
      }
      const data = await response.json()
      setBlockedIPs(data.blockedIPs)
    } catch (error) {
      console.error("Error fetching blocked IPs:", error)
    }
  }

  const markAsResponded = async (id: number) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({
          responded: true,
          responded_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      // Update local state
      setContactData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, responded: true, responded_at: new Date().toISOString() } : item,
        ),
      )

      toast.success("Marked as responded")
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status")
    }
  }

  const filteredFeedback = feedbackData.filter(
    (item) =>
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.experience.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredContacts = contactData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const viewDetails = (item: FeedbackSubmission | ContactSubmission) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-green dark:border-light-green mx-auto"></div>
          <p className="mt-4 text-zinc-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {fetchError && (
          <div className="mb-6 p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md text-red-800 dark:text-red-300 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error fetching data:</p>
              <p className="text-sm">{fetchError}</p>
              <p className="text-sm mt-2">
                This might be due to Supabase Row Level Security (RLS) policies. Make sure you have the correct
                permissions set up.
              </p>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={fetchData}>Refresh Data</Button>
        </div>

        <div className="mb-6 p-4 border border-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 dark:border-zinc-700 rounded-md">
          <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">Supabase Connection Status</h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            API Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set (hidden)" : "Not set"}
          </p>
          <div className="mt-2">
            <Button size="sm" variant="outline" onClick={fetchData} className="text-xs">
              Test Connection
            </Button>
          </div>
        </div>

        {blockedIPs.length > 0 && (
          <div className="mb-6 p-4 border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-300">Blocked IP Addresses</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">
                  The following IP addresses are currently blocked due to too many failed login attempts:
                </p>
                <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-400">
                  {blockedIPs.map((item, index) => (
                    <li key={index}>
                      IP: {item.ip} - Blocked until: {new Date(item.blockedUntil).toLocaleString()}
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-2 text-amber-600 dark:text-amber-500">
                  Note: This list will reset if the server restarts. For persistent blocking, consider using a database.
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="feedback" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="feedback">
              Feedback
              <Badge className="ml-2 bg-deep-green dark:bg-light-green text-white dark:text-zinc-900">
                {feedbackData.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="contact">
              Contact Submissions
              <Badge className="ml-2 bg-deep-green dark:bg-light-green text-white dark:text-zinc-900">
                {contactData.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Submissions</CardTitle>
                <CardDescription>View all feedback submitted through the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Occupation</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFeedback.length > 0 ? (
                        filteredFeedback.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.created_at ? format(new Date(item.created_at), "MMM d, yyyy") : "N/A"}
                            </TableCell>
                            <TableCell>{item.name || "Anonymous"}</TableCell>
                            <TableCell>{item.email || "N/A"}</TableCell>
                            <TableCell>{item.occupation || "N/A"}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {item.experience.substring(0, 50)}
                              {item.experience.length > 50 ? "..." : ""}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => viewDetails(item)}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No feedback found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>View and manage contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts.length > 0 ? (
                        filteredContacts.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.created_at ? format(new Date(item.created_at), "MMM d, yyyy") : "N/A"}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                            <TableCell>
                              {item.responded ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                  Responded
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                >
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => viewDetails(item)}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View details</span>
                                </Button>
                                {!item.responded && (
                                  <Button variant="ghost" size="icon" onClick={() => markAsResponded(item.id!)}>
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="sr-only">Mark as responded</span>
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No contact submissions found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Details Modal */}
        {isViewModalOpen && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black/50 dark:bg-zinc-950/50"></div>
            <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-10 rounded-xl shadow-xl">
              <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {selectedTab === "feedback" ? "Feedback Details" : "Contact Submission Details"}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {selectedTab === "feedback"
                      ? `Submitted on ${selectedItem.created_at ? format(new Date(selectedItem.created_at), "MMMM d, yyyy") : "N/A"}`
                      : `Submitted on ${selectedItem.created_at ? format(new Date(selectedItem.created_at), "MMMM d, yyyy") : "N/A"}`}
                  </p>
                </div>
                <div className="p-6 space-y-4 bg-white dark:bg-zinc-800">
                  {selectedTab === "feedback" ? (
                    // Feedback details
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Name</h3>
                        <p className="text-zinc-900 dark:text-white">
                          {(selectedItem as FeedbackSubmission).name || "Anonymous"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Email</h3>
                        <p className="text-zinc-900 dark:text-white">
                          {(selectedItem as FeedbackSubmission).email || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Occupation</h3>
                        <p className="text-zinc-900 dark:text-white">
                          {(selectedItem as FeedbackSubmission).occupation || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Experience</h3>
                        <p className="whitespace-pre-wrap text-zinc-900 dark:text-white">
                          {(selectedItem as FeedbackSubmission).experience}
                        </p>
                      </div>
                    </>
                  ) : (
                    // Contact details
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Name</h3>
                        <p className="text-zinc-900 dark:text-white">{(selectedItem as ContactSubmission).name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Email</h3>
                        <p className="text-zinc-900 dark:text-white">{(selectedItem as ContactSubmission).email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Subject</h3>
                        <p className="text-zinc-900 dark:text-white">{(selectedItem as ContactSubmission).subject}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Message</h3>
                        <p className="whitespace-pre-wrap text-zinc-900 dark:text-white">
                          {(selectedItem as ContactSubmission).message}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Status</h3>
                        <div className="flex items-center text-zinc-900 dark:text-white">
                          {(selectedItem as ContactSubmission).responded ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>
                                Responded on{" "}
                                {(selectedItem as ContactSubmission).responded_at
                                  ? format(new Date((selectedItem as ContactSubmission).responded_at!), "MMMM d, yyyy")
                                  : "N/A"}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-amber-500 mr-2" />
                              <span>Awaiting response</span>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex justify-between">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </Button>
                  {selectedTab === "contact" && !(selectedItem as ContactSubmission).responded && (
                    <Button
                      onClick={() => {
                        markAsResponded((selectedItem as ContactSubmission).id!)
                        setIsViewModalOpen(false)
                      }}
                    >
                      Mark as Responded
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

