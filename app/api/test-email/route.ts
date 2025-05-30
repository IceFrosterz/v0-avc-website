import { type NextRequest, NextResponse } from "next/server"
import { sendTestEmail } from "@/lib/email"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    // Get email from request body
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "Valid email address is required" }, { status: 400 })
    }

    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === "development"

    // Check email configuration
    const missingConfigs = []
    if (!process.env.EMAIL_HOST) missingConfigs.push("EMAIL_HOST")
    if (!process.env.EMAIL_PORT) missingConfigs.push("EMAIL_PORT")
    if (!process.env.EMAIL_USER) missingConfigs.push("EMAIL_USER")
    if (!process.env.EMAIL_PASSWORD) missingConfigs.push("EMAIL_PASSWORD")

    if (missingConfigs.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email configuration incomplete",
          missingConfigs,
          isDevelopment,
        },
        { status: 500 },
      )
    }

    // Try to create a test connection to verify credentials
    let testConnection = false
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number.parseInt(process.env.EMAIL_PORT || "587"),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      // Verify connection configuration
      await transporter.verify()
      testConnection = true
    } catch (verifyError) {
      console.error("Email connection verification failed:", verifyError)
      return NextResponse.json(
        {
          success: false,
          message: "Email server connection failed",
          error: verifyError.message,
          isDevelopment,
        },
        { status: 500 },
      )
    }

    // Send test email
    const result = await sendTestEmail(email)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Test email sent successfully to ${email}`,
        messageId: result.messageId,
        isDevelopment,
        testConnection,
      })
    } else {
      throw new Error(result.error || "Failed to send test email")
    }
  } catch (error) {
    console.error("Error sending test email:", error)

    // In preview environments, we'll still return success
    const isPreviewEnvironment = process.env.NODE_ENV === "development"
    if (isPreviewEnvironment) {
      return NextResponse.json({
        success: true,
        message: "Preview mode: Email would be sent in production",
        preview: true,
        error: error.message,
      })
    }

    return NextResponse.json(
      { success: false, message: "Failed to send test email", error: error.message },
      { status: 500 },
    )
  }
}
