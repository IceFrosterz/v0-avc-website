import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Check email configuration
    const emailConfig = {
      host: process.env.EMAIL_HOST ? "✓ Set" : "✗ Missing",
      port: process.env.EMAIL_PORT ? "✓ Set" : "✗ Missing",
      secure: process.env.EMAIL_SECURE ? "✓ Set" : "✗ Missing",
      user: process.env.EMAIL_USER ? "✓ Set" : "✗ Missing",
      password: process.env.EMAIL_PASSWORD ? "✓ Set (hidden)" : "✗ Missing",
    }

    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === "development"

    // Get server information
    const serverInfo = {
      nodeVersion: process.version,
      environment: process.env.NODE_ENV,
      platform: process.platform,
    }

    return NextResponse.json({
      success: true,
      emailConfig,
      isDevelopment,
      serverInfo,
      message: isDevelopment
        ? "Note: In development mode, emails are logged to console instead of being sent"
        : "Email configuration check complete",
    })
  } catch (error) {
    console.error("Error checking email configuration:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error checking email configuration",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
