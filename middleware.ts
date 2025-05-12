import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of shop-related paths to redirect
const shopPaths = ["/shop", "/cart", "/checkout", "/products", "/confirmation"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with any of the shop paths
  const isShopPath = shopPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // If it's a shop path, redirect to home page
  if (isShopPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/shop/:path*", "/cart/:path*", "/checkout/:path*", "/products/:path*", "/confirmation/:path*"],
}
