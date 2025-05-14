import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { corsHeaders } from "@/lib/cors"

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const teamSlug = searchParams.get("team")
    const round = searchParams.get("round")

    // Build the query
    let query = `
      SELECT 
        id, team, team_slug, opponent, round, 
        fixture_date, fixture_time, location, result, completed
      FROM fixtures
      WHERE 1=1
    `
    const params: any[] = []

    // Add filters if provided
    if (teamSlug) {
      query += ` AND team_slug = $${params.length + 1}`
      params.push(teamSlug)
    }

    if (round) {
      query += ` AND round = $${params.length + 1}`
      params.push(Number.parseInt(round))
    }

    // Add ordering
    query += ` ORDER BY round ASC, fixture_date ASC, fixture_time ASC`

    // Execute the query
    const fixtures = await executeQuery(query, params)

    // Format the dates for display
    const formattedFixtures = fixtures.map((fixture: any) => {
      // Format the date as "Month Day, Year"
      const date = new Date(fixture.fixture_date)
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })

      // Format the time as "HH:MM AM/PM"
      let formattedTime = ""
      if (fixture.fixture_time) {
        const [hours, minutes] = fixture.fixture_time.split(":")
        const hour = Number.parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const hour12 = hour % 12 || 12
        formattedTime = `${hour12}:${minutes} ${ampm}`
      }

      return {
        ...fixture,
        date: formattedDate,
        time: formattedTime,
      }
    })

    // Return the fixtures
    return NextResponse.json(formattedFixtures, {
      headers: corsHeaders,
    })
  } catch (error) {
    console.error("Error fetching fixtures:", error)
    return NextResponse.json({ error: "Failed to fetch fixtures" }, { status: 500, headers: corsHeaders })
  }
}
