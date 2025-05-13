import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { orderId, customerEmail, customerName, orderItems, orderTotal, isFreeOrder } = await request.json()

    if (!orderId || !customerEmail || !customerName || !orderItems) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    console.log(`Sending order confirmation email for order ${orderId}`)
    console.log(`Is free order: ${isFreeOrder ? "Yes" : "No"}`)

    // Send the email
    await sendOrderConfirmationEmail({
      orderId,
      customerEmail,
      customerName,
      orderItems,
      orderTotal,
      isFreeOrder: !!isFreeOrder,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to send email" }, { status: 500 })
  }
}
