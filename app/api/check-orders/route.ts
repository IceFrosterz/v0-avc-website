import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Check if tables exist
    const tablesCheck = await executeQuery(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)

    const tables = tablesCheck.map((row: any) => row.table_name)

    // Get counts from each table
    const counts: Record<string, number> = {}

    for (const table of tables) {
      const countResult = await executeQuery(`SELECT COUNT(*) FROM ${table}`)
      counts[table] = Number.parseInt(countResult[0].count)
    }

    // Get the most recent orders
    let recentOrders = []
    if (tables.includes("orders")) {
      recentOrders = await executeQuery(`
        SELECT o.*, c.name, c.email, c.phone
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        ORDER BY o.order_date DESC
        LIMIT 5
      `)

      // For each order, get its items
      for (let i = 0; i < recentOrders.length; i++) {
        const items = await executeQuery(
          `
          SELECT * FROM order_items WHERE order_id = $1
        `,
          [recentOrders[i].id],
        )

        recentOrders[i].items = items
      }
    }

    return NextResponse.json({
      success: true,
      tables,
      counts,
      recentOrders,
    })
  } catch (error) {
    console.error("Error checking database:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
