import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { sourceId, amount, currency = "AUD" } = await request.json()

    if (!sourceId || !amount) {
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    const locationId = process.env.SQUARE_LOCATION_ID
    const environment = process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox"

    if (!accessToken || !locationId) {
      return NextResponse.json(
        { success: false, message: "Payment processing is not configured correctly" },
        { status: 500 },
      )
    }

    const amountInCents = Math.round(amount * 100)
    const idempotencyKey = crypto.randomUUID()
    const baseUrl =
      environment === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com"

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
