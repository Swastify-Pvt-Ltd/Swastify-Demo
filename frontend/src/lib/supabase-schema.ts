// This file defines the schema for Supabase tables to ensure type safety

export interface FeedbackSubmission {
  id?: number
  name: string | null
  email: string | null
  occupation: string | null
  experience: string
  created_at?: string
}

export interface ContactSubmission {
  id?: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  responded?: boolean
  responded_at?: string | null
}

export interface SurveyResponse {
  id?: number
  name: string | null
  occupation: string | null
  age_group: string
  has_regular_provider: string
  access_methods: string[]
  access_method_other: string | null
  access_difficulties: string
  difficulties_description: string | null
  understand_records: string
  timely_records: string
  simple_process: string
  feel_informed: string
  trust_security: string
  time_to_receive: string
  explained_access: string
  contacted_help: string
  other_contact: string | null
  make_easier: string | null
  created_at: string
}

// Define database schema for type safety
export type Database = {
  public: {
    Tables: {
      feedback: {
        Row: FeedbackSubmission
        Insert: Omit<FeedbackSubmission, "id">
        Update: Partial<FeedbackSubmission>
      }
      contact_submissions: {
        Row: ContactSubmission
        Insert: Omit<ContactSubmission, "id">
        Update: Partial<ContactSubmission>
      }
      survey_responses: {
        Row: SurveyResponse
        Insert: Omit<SurveyResponse, "id">
        Update: Partial<SurveyResponse>
      }
    }
  }
}
