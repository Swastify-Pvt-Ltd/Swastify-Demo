const SESSION_SECRET = process.env.SESSION_SECRET || "fallback-secret-for-dev-only"

/**
 * Hash a string using Web Crypto API (Edge Runtime compatible)
 * @param str String to hash
 * @returns Hex string of the hash
 */
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

/**
 * Sign a token with the session secret
 * @param token Token to sign
 * @returns Signed token in format: {token}.{signature}
 */
export async function signToken(token: string): Promise<string> {
  const signature = await hashString(token + SESSION_SECRET)
  return `${token}.${signature}`
}

/**
 * Validate a session token
 * @param signedToken The signed token to validate
 * @returns Boolean indicating if the token is valid
 */
export async function validateSessionToken(signedToken: string): Promise<boolean> {
  try {
    // Basic validation
    if (!signedToken || typeof signedToken !== "string") {
      return false
    }

    // Split token into parts
    const parts = signedToken.split(".")

    // Token should have two parts: the token itself and the signature
    if (parts.length !== 2) {
      return false
    }

    const [token, providedSignature] = parts

    // Basic token format validation
    if (!token || !providedSignature || !/^[a-f0-9]+$/i.test(token)) {
      return false
    }

    // Recreate the signature
    const expectedSignature = await hashString(token + SESSION_SECRET)

    // Compare signatures using constant-time comparison to prevent timing attacks
    return timingSafeEqual(providedSignature, expectedSignature)
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}

/**
 * Constant-time comparison of two strings to prevent timing attacks
 * @param a First string
 * @param b Second string
 * @returns Boolean indicating if strings are equal
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

/**
 * For backward compatibility with existing code
 * @param token Token to validate
 * @returns Boolean indicating if the token is valid
 */
export function validateSessionTokenSync(token: string): boolean {
  // For existing code that expects a synchronous function
  // This is less secure but maintains compatibility
  if (!token || typeof token !== "string") {
    return false
  }

  // Check if it's a signed token
  if (token.includes(".")) {
    const [rawToken] = token.split(".")
    return Boolean(rawToken && rawToken.length === 64 && /^[a-f0-9]+$/i.test(rawToken))
  }

  // Legacy format
  return Boolean(token && token.length === 64 && /^[a-f0-9]+$/i.test(token))
}

