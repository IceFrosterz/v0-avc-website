import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Get the admin API URL and API key from server-side environment variables
    const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL
    const apiKey = process.env.API_KEY

    if (!adminApiUrl || !apiKey) {
      return NextResponse.json({ success: false, message: "Missing admin API configuration" }, { status: 500 })
    }

    // Forward the order to the admin site
    const response = await fetch(adminApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { success: false, message: `Admin API error: ${errorText}` },
        { status: response.status },
      )
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error forwarding order:", error)
    return NextResponse.json({ success: false, message: "Failed to forward order" }, { status: 500 })
  }
}
