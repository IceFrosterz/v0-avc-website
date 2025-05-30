import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cartData = await request.json()

    console.log("Debug Cart Data:", JSON.stringify(cartData, null, 2))

    // Calculate total manually
    let calculatedTotal = 0
    if (cartData.items && Array.isArray(cartData.items)) {
      calculatedTotal = cartData.items.reduce((sum: number, item: any) => {
        const itemPrice = typeof item.price === "number" ? item.price : 0
        return sum + itemPrice
      }, 0)
    }

    return NextResponse.json({
      success: true,
      itemCount: cartData.items?.length || 0,
      reportedTotal: cartData.total,
      calculatedTotal,
      items: cartData.items?.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        type: typeof item.price,
      })),
    })
  } catch (error) {
    console.error("Error in debug cart:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
