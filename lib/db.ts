import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

// Create a SQL client with the connection string
export const sql = neon(process.env.DATABASE_URL)

// Helper function for direct SQL queries
export async function executeQuery(queryText: string, params: any[] = []) {
  try {
    console.log("Executing query:", queryText, "with params:", params)
    const result = await sql.query(queryText, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
