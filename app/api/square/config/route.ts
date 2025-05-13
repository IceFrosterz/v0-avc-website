import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return the Square configuration
    return NextResponse.json({
      applicationId: process.env.SQUARE_APP_ID,
      locationId: process.env.SQUARE_LOCATION_ID,
      environment: process.env.SQUARE_ENVIRONMENT || "sandbox",
    })
  } catch (error) {
    console.error("Error fetching Square configuration:", error)
    return NextResponse.json({ error: "Failed to get Square configuration" }, { status: 500 })
  }
}
