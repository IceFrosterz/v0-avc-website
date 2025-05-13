import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return Square configuration from environment variables
    return NextResponse.json({
      applicationId: process.env.SQUARE_APP_ID,
      locationId: process.env.SQUARE_LOCATION_ID,
    })
  } catch (error) {
    console.error("Error getting Square configuration:", error)
    return NextResponse.json({ success: false, message: "Failed to get Square configuration" }, { status: 500 })
  }
}
