import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail } from "@/lib/email"

// Make sure we're not filtering out any orders based on price or type

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Validate order data
    if (!orderData || !orderData.customer || !orderData.customer.email) {
      return NextResponse.json(
        { success: false, message: "Invalid order data or missing customer email" },
        { status: 400 },
      )
    }

    // Send confirmation email regardless of order type
    const emailResult = await sendOrderConfirmationEmail(orderData)

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: "Confirmation email sent successfully",
        messageId: emailResult.messageId,
      })
    } else {
      // In preview environments, we'll still return success
      const isPreviewEnvironment = process.env.NODE_ENV === "development"
      if (isPreviewEnvironment) {
        console.log("Preview environment: Would have sent email to", orderData.customer.email)
        return NextResponse.json({
          success: true,
          message: "Preview mode: Email would be sent in production",
          preview: true,
        })
      }

      throw new Error(emailResult.error || "Failed to send confirmation email")
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error)

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
      { success: false, message: "Failed to send confirmation email", error: error.message },
      { status: 500 },
    )
  }
}
