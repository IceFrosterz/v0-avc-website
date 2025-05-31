import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Check if order_items table exists
    const tableExists = await executeQuery("SELECT to_regclass('order_items')")

    if (!tableExists[0].to_regclass) {
      // Create the table if it doesn't exist
      await executeQuery(`
        CREATE TABLE order_items (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(255) REFERENCES orders(id),
          product_id VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          colorway VARCHAR(50),
          jersey_name VARCHAR(255),
          jersey_number VARCHAR(10),
          team VARCHAR(50),
          size VARCHAR(10),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `)
      return NextResponse.json({ success: true, message: "Created order_items table" })
    }

    // Check if product_name column exists
    const columnExists = await executeQuery(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'order_items' AND column_name = 'product_name'
    `)

    if (columnExists.length === 0) {
      // Add the column if it doesn't exist
      await executeQuery("ALTER TABLE order_items ADD COLUMN product_name VARCHAR(255)")
      return NextResponse.json({ success: true, message: "Added product_name column to order_items table" })
    }

    return NextResponse.json({ success: true, message: "Schema is already correct" })
  } catch (error) {
    console.error("Error fixing schema:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fix schema",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
