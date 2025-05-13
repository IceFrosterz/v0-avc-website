import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("Processing Square payment directly...")

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

    // Convert amount to cents (Square requires amount in smallest currency unit)
    const amountInCents = Math.round(amount * 100)
    console.log("Amount in cents:", amountInCents)

    // Create a unique idempotency key for this payment
    const idempotencyKey = crypto.randomUUID()

    // Determine the base URL based on environment
    const baseUrl =
      environment === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com"

    console.log("Sending payment request directly to Square API...")

    // Make a direct API call to Square
    const response = await fetch(`${baseUrl}/v2/payments`, {
      method: "POST",
      headers: {
        "Square-Version": "2023-09-25",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: idempotencyKey,
        amount_money: {
          amount: amountInCents,
          currency,
        },
        location_id: locationId,
      }),
    })

    const result = await response.json()
    console.log("Square API response:", result)

    if (!response.ok) {
      const errorMessage = result.errors ? result.errors.map((e) => e.detail).join(", ") : "Payment processing failed"

      return NextResponse.json({ success: false, message: errorMessage }, { status: response.status })
    }

    return NextResponse.json({
      success: true,
      paymentId: result.payment?.id || "UNKNOWN",
      message: "Payment processed successfully",
    })
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
