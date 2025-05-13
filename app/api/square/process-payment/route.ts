import { type NextRequest, NextResponse } from "next/server"
import { ApiError, Client } from "square"

export async function POST(request: NextRequest) {
  try {
    const { sourceId, amount, currency = "AUD" } = await request.json()

    if (!sourceId || !amount) {
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    // Initialize Square client
    const squareClient = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN || "",
      environment: process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox",
    })

    // Convert amount to cents (Square requires amount in smallest currency unit)
    const amountInCents = Math.round(amount * 100)

    // Create a unique idempotency key for this payment
    const idempotencyKey = crypto.randomUUID()

    try {
      // Process the payment
      const payment = await squareClient.paymentsApi.createPayment({
        sourceId,
        idempotencyKey,
        amountMoney: {
          amount: BigInt(amountInCents),
          currency,
        },
        locationId: process.env.SQUARE_LOCATION_ID || "",
      })

      console.log("Payment successful:", payment.result)

      return NextResponse.json({
        success: true,
        paymentId: payment.result.payment?.id,
        message: "Payment processed successfully",
      })
    } catch (squareError) {
      console.error("Square API Error:", squareError)

      if (squareError instanceof ApiError) {
        const errors = squareError.result?.errors?.map((e) => e.detail).join(", ") || "Payment processing failed"
        return NextResponse.json({ success: false, message: errors }, { status: 500 })
      }

      throw squareError // Re-throw if not a Square API error
    }
  } catch (error) {
    console.error("Error processing Square payment:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Payment processing failed",
      },
      { status: 500 },
    )
  }
}
