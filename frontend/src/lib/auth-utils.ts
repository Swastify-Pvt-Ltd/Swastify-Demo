// Validate the session token
export function validateSessionToken(token: string): boolean {
    // In a real application, you would validate the signature using the secret
    // For now, we'll just check if the token exists and is properly formatted
    return Boolean(token && token.length === 64 && /^[a-f0-9]+$/i.test(token))
  }
  
  