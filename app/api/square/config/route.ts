import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get Square credentials from environment variables
    const applicationId = process.env.SQUARE_APP_ID
    const locationId = process.env.SQUARE_LOCATION_ID

    // Validate credentials
    if (!applicationId || !locationId) {
      console.error("Missing Square credentials:", { applicationId, locationId })
      return NextResponse.json({ error: "Square payment configuration is incomplete" }, { status: 500 })
    }

    // Return credentials to client
    return NextResponse.json({
      applicationId,
      locationId,
    })
  } catch (error) {
    console.error("Error retrieving Square configuration:", error)
    return NextResponse.json({ error: "Failed to retrieve payment configuration" }, { status: 500 })
  }
}
