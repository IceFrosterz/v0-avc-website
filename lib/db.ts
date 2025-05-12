import { neon } from "@neondatabase/serverless"

// Create a SQL client with the connection string
const sql = neon(process.env.DATABASE_URL!)

// Helper function for direct SQL queries using the correct syntax
export async function executeQuery(queryText: string, params: any[] = []) {
  try {
    console.log("Executing query:", queryText, "with params:", params)
    // Use sql.query for parameterized queries
    const result = await sql.query(queryText, params)
    console.log("Query result:", result)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Export the sql client for direct use with tagged template literals
export { sql }
