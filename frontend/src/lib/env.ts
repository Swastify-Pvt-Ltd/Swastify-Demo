// Environment variable type definitions and validation

// Define types for environment variables
export interface EnvVariables {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_SESSION_SECRET?: string
    NEXT_PUBLIC_ADMIN_USERNAME?: string
    NEXT_PUBLIC_ADMIN_PASSWORD?: string
  }
  
  // Get and validate environment variables
  export function getEnvVariables(): EnvVariables {
    const env: Partial<EnvVariables> = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SESSION_SECRET: process.env.NEXT_PUBLIC_SESSION_SECRET,
      NEXT_PUBLIC_ADMIN_USERNAME: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
      NEXT_PUBLIC_ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
    }
  
    // Log warnings for missing variables
    if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase environment variables are not set. Some features may not work correctly.")
    }
  
    if (!env.NEXT_PUBLIC_SESSION_SECRET) {
      console.warn("SESSION_SECRET is not set. Using default value for development only.")
    }
  
    if (!env.NEXT_PUBLIC_ADMIN_USERNAME || !env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      console.warn("Admin credentials are not set in environment variables. Using default values for development only.")
    }
  
    return env as EnvVariables
  }
  
  