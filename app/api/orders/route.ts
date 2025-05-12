import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

// Function to ensure tables exist with correct constraints
async function ensureTablesExist() {
  try {
    // Check if customers table exists
    const customersTable = await executeQuery("SELECT to_regclass('public.customers')")
    if (!customersTable[0].to_regclass) {
      console.log("Creating customers table...")
      await executeQuery(`
        CREATE TABLE customers (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          phone VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `)
    }

    // Check if orders table exists
    const ordersTable = await executeQuery("SELECT to_regclass('public.orders')")
    if (!ordersTable[0].to_regclass) {
      console.log("Creating orders table...")
      await executeQuery(`
        CREATE TABLE orders (
          id VARCHAR(255) PRIMARY KEY,
          customer_id INTEGER REFERENCES customers(id),
          total_amount DECIMAL(10, 2) NOT NULL,
          payment_id VARCHAR(255),
          status VARCHAR(50) DEFAULT 'new',
          order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          notes TEXT
        )
      `)
    }

    // Check if order_items table exists
    const orderItemsTable = await executeQuery("SELECT to_regclass('public.order_items')")
    if (!orderItemsTable[0].to_regclass) {
      console.log("Creating order_items table...")
      // Create without foreign key constraint on product_id
      await executeQuery(`
        CREATE TABLE order_items (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(255) REFERENCES orders(id),
          product_id VARCHAR(255) NOT NULL,
          product_name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          colorway VARCHAR(50),
          jersey_name VARCHAR(255),
          jersey_number VARCHAR(10),
          team VARCHAR(50),
          size VARCHAR(10),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `)
    }

    return true
  } catch (error) {
    console.error("Error ensuring tables exist:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure tables exist
    const tablesExist = await ensureTablesExist()
    if (!tablesExist) {
      return NextResponse.json({ success: false, message: "Failed to create database tables" }, { status: 500 })
    }

    const orderData = await request.json()
    console.log("Received order data:", JSON.stringify(orderData))

    // Check if we have a valid order
    if (!orderData || !orderData.items || !orderData.customer) {
      return NextResponse.json({ success: false, message: "Invalid order data" }, { status: 400 })
    }

    // Use the provided ID or generate a new one
    const orderId = orderData.id || uuidv4()

    // First, check if customer exists or create a new one
    const { name, email, phone } = orderData.customer

    let customerId
    try {
      // Check if email already exists
      const existingCustomer = await executeQuery("SELECT id FROM customers WHERE email = $1", [email])
      console.log("Existing customer query result:", existingCustomer)

      if (existingCustomer && existingCustomer.length > 0) {
        customerId = existingCustomer[0].id
        // Update customer info
        await executeQuery("UPDATE customers SET name = $1, phone = $2 WHERE id = $3", [name, phone, customerId])
        console.log("Updated existing customer:", customerId)
      } else {
        // Insert new customer
        const newCustomer = await executeQuery(
          "INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING id",
          [name, email, phone],
        )
        customerId = newCustomer[0].id
        console.log("Created new customer:", customerId)
      }
    } catch (customerError) {
      console.error("Error handling customer:", customerError)
      return NextResponse.json(
        {
          success: false,
          message: "Error processing customer data",
          error: customerError.message,
        },
        { status: 500 },
      )
    }

    // Insert order
    try {
      await executeQuery(
        "INSERT INTO orders (id, customer_id, total_amount, payment_id, status, order_date) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          orderId,
          customerId,
          orderData.total || 0,
          orderData.paymentId || "PENDING",
          orderData.status || "new",
          new Date(),
        ],
      )
      console.log("Inserted order:", orderId)
    } catch (orderError) {
      console.error("Error inserting order:", orderError)
      return NextResponse.json(
        {
          success: false,
          message: "Error saving order data",
          error: orderError.message,
        },
        { status: 500 },
      )
    }

    // Insert order items
    try {
      for (const item of orderData.items) {
        await executeQuery(
          "INSERT INTO order_items (order_id, product_id, product_name, price, colorway, jersey_name, jersey_number, team, size) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
          [
            orderId,
            item.productId || "unknown",
            item.productName || "Unknown Product",
            item.price || 0,
            item.colorway || null,
            item.jerseyName || null,
            item.jerseyNumber || null,
            item.team || null,
            item.size || null,
          ],
        )
      }
      console.log("Inserted order items")
    } catch (itemsError) {
      console.error("Error inserting order items:", itemsError)
      return NextResponse.json(
        {
          success: false,
          message: "Error saving order items",
          error: itemsError.message,
        },
        { status: 500 },
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      orderId,
      message: "Order saved successfully",
    })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error processing order",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

// Add a GET endpoint to allow the other website to fetch orders
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get("id")
    const email = searchParams.get("email")
    const apiKey = request.headers.get("x-api-key")

    // Check API key for security
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    let query = `
      SELECT o.*, c.name as customer_name, c.email, c.phone
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
    `

    const params: any[] = []

    // Add filters if provided
    if (orderId) {
      query += " WHERE o.id = $1"
      params.push(orderId)
    } else if (email) {
      query += " WHERE c.email = $1"
      params.push(email)
    }

    query += " ORDER BY o.order_date DESC"

    const orders = await executeQuery(query, params)

    // If an order ID was specified, also fetch the order items
    if (orderId && orders.length > 0) {
      const items = await executeQuery("SELECT * FROM order_items WHERE order_id = $1", [orderId])

      return NextResponse.json({
        success: true,
        order: {
          ...orders[0],
          items,
        },
      })
    }

    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
