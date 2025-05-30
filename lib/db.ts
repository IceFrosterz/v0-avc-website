import { neon } from "@neondatabase/serverless"

// Create a SQL client with the connection string
let sql: any

try {
  // Check if DATABASE_URL is defined
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not defined")
    // Create a mock SQL function for development
    sql = async (query: string, params: any[] = []) => {
      console.warn("Using mock SQL client. Database operations will not work.")
      console.log("Query:", query, "Params:", params)
      return []
    }
  } else {
    sql = neon(process.env.DATABASE_URL)
  }
} catch (error) {
  console.error("Error initializing database connection:", error)
  // Create a mock SQL function as fallback
  sql = async (query: string, params: any[] = []) => {
    console.warn("Using mock SQL client due to connection error. Database operations will not work.")
    console.log("Query:", query, "Params:", params)
    return []
  }
}

// Helper function for direct SQL queries using the correct syntax
export async function executeQuery(queryText: string, params: any[] = []) {
  try {
    console.log("Executing query:", queryText, "with params:", params)
    // Use sql.query for parameterized queries
    const result = await sql.query(queryText, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Export the sql client for direct use with tagged template literals
export { sql }
