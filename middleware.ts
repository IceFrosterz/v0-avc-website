import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This middleware now only handles CORS for API routes
// and no longer redirects shop paths
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only apply CORS headers to API routes
  if (pathname.startsWith("/api/")) {
    // Get the origin from the request headers
    const origin = request.headers.get("origin") || ""

    // List of allowed origins
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_WEBSITE_URL || "https://alliance-volleyball-club.vercel.app",
      process.env.NEXT_PUBLIC_ADMIN_URL || "https://alliance-volleyball-orders.vercel.app",
      "http://localhost:3000",
    ]

    // Check if the origin is allowed
    const isAllowedOrigin = allowedOrigins.includes(origin)

    // Create a response object
    const response = NextResponse.next()

    // Set CORS headers
    response.headers.set("Access-Control-Allow-Credentials", "true")

    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin)
    } else {
      // If not an allowed origin, set to the default website URL
      response.headers.set(
        "Access-Control-Allow-Origin",
        process.env.NEXT_PUBLIC_WEBSITE_URL || "https://alliance-volleyball-club.vercel.app",
      )
    }

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
