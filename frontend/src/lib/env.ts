// Environment variable type definitions and validation

// Define types for environment variables
export interface EnvVariables {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SESSION_SECRET?: string
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
}

// Get and validate environment variables
export function getEnvVariables(): EnvVariables {
  const env: Partial<EnvVariables> = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  }

  // Check for required variables in production
  if (process.env.NODE_ENV === "production") {
    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      throw new Error("Supabase environment variables are required in production")
    }

    if (!env.SESSION_SECRET) {
      throw new Error("SESSION_SECRET is required in production for security")
    }

    if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
      throw new Error("Admin credentials are required in production")
    }
  } else {
    // Log warnings for missing variables in development
    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      console.warn("Supabase environment variables are not set. Some features may not work correctly.")
    }

    if (!env.SESSION_SECRET) {
      console.warn("SESSION_SECRET is not set. Using default value for development only.")
    }

    if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
      console.warn("Admin credentials are not set in environment variables. Using default values for development only.")
    }
  }

  return env as EnvVariables
}

