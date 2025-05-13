import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This middleware now only handles CORS for API routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only apply CORS headers to API routes
  if (pathname.startsWith("/api/")) {
    // Create a response object
    const response = NextResponse.next()

    // Set CORS headers
    response.headers.set("Access-Control-Allow-Credentials", "true")
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-key",
    )

    return response
  }

  // For all other routes, just continue normally
  return NextResponse.next()
}

// Configure the middleware to only run on API routes
export const config = {
  matcher: "/api/:path*",
}
