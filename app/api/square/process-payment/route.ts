import { type NextRequest, NextResponse } from "next/server"
import { Client } from "square"

// Initialize Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox",
})

export async function POST(request: NextRequest) {
  try {
    const { sourceId, amount, currency = "AUD" } = await request.json()

    if (!sourceId || !amount) {
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    // Convert amount to cents (Square requires amount in smallest currency unit)
    const amountInCents = Math.round(amount * 100)

    // Create a unique idempotency key for this payment
    const idempotencyKey = crypto.randomUUID()

    // Process the payment
    const payment = await squareClient.paymentsApi.createPayment({
      sourceId,
      idempotencyKey,
      amountMoney: {
        amount: amountInCents,
        currency,
      },
      locationId: process.env.SQUARE_LOCATION_ID,
    })

    console.log("Payment successful:", payment.result)

    return NextResponse.json({
      success: true,
      paymentId: payment.result.payment.id,
      message: "Payment processed successfully",
    })
  } catch (error) {
    console.error("Error processing Square payment:", error)

    // Handle Square API errors
    let errorMessage = "Payment processing failed"
    if (error.errors && error.errors.length > 0) {
      errorMessage = error.errors.map((e) => e.detail).join(", ")
    }

    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}
