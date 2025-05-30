import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("Processing Square payment...")

    const { sourceId, amount, currency = "AUD" } = await request.json()
    console.log("Payment request:", { sourceId: sourceId ? "PRESENT" : "MISSING", amount, currency })

    if (!sourceId || !amount) {
      console.error("Missing required payment information")
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    // Validate Square credentials
    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    const locationId = process.env.SQUARE_LOCATION_ID
    const environment = process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox"

    if (!accessToken || !locationId) {
      console.error("Missing Square credentials")
      return NextResponse.json(
        { success: false, message: "Payment processing is not configured correctly" },
        { status: 500 },
      )
    }

    console.log("Initializing Square client with environment:", environment)

    try {
      // Dynamically import the Square SDK to avoid bundling issues
      const { default: squarePackage } = await import("square")

      // Initialize Square client
      const squareClient = new squarePackage.Client({
        accessToken,
        environment,
      })

      // Convert amount to cents (Square requires amount in smallest currency unit)
      const amountInCents = Math.round(amount * 100)
      console.log("Amount in cents:", amountInCents)

      // Create a unique idempotency key for this payment
      const idempotencyKey = crypto.randomUUID()

      console.log("Sending payment request to Square API...")

      // Process the payment
      const payment = await squareClient.paymentsApi.createPayment({
        sourceId,
        idempotencyKey,
        amountMoney: {
          amount: BigInt(amountInCents),
          currency,
        },
        locationId,
      })

      console.log("Payment successful:", payment.result)

      return NextResponse.json({
        success: true,
        paymentId: payment.result.payment?.id || "UNKNOWN",
        message: "Payment processed successfully",
      })
    } catch (squareError) {
      console.error("Square API Error:", squareError)

      // Handle Square API errors
      if (squareError.result && squareError.result.errors) {
        const errors = squareError.result.errors.map((e) => e.detail).join(", ")
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
