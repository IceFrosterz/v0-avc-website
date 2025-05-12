import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail } from "@/lib/email"

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

    // Send confirmation email
    const emailResult = await sendOrderConfirmationEmail(orderData)

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: "Confirmation email sent successfully",
        messageId: emailResult.messageId,
      })
    } else {
      throw new Error("Failed to send confirmation email")
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send confirmation email", error: error.message },
      { status: 500 },
    )
  }
}
