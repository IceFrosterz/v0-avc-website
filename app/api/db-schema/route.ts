import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Get the column information for the order_items table
    const columns = await executeQuery(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'order_items'
    `)

    return NextResponse.json({
      success: true,
      orderItemsColumns: columns,
    })
  } catch (error) {
    console.error("Error fetching schema:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch schema",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
