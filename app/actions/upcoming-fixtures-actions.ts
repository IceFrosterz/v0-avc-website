"use server"

import { sql } from "@/lib/db"
import type { Fixture } from "./fixtures-actions"

export async function getUpcomingFixtures(limit = 4): Promise<Fixture[]> {
  try {
    // Get current date
    const now = new Date()

    // Calculate start of current week (Sunday)
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    // Calculate end of current week (Saturday)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 13) // Show matches for the next two weeks
    endOfWeek.setHours(23, 59, 59, 999)

    const fixtures = await sql`
      SELECT 
        id, 
        team, 
        team_slug as "teamSlug", 
        opponent, 
        round, 
        TO_CHAR(fixture_date, 'Month DD, YYYY') as date,
        TO_CHAR(fixture_time, 'HH12:MI AM') as time,
        location, 
        result, 
        completed
      FROM fixtures
      WHERE 
        completed = false AND
        fixture_date >= ${startOfWeek.toISOString()} AND 
        fixture_date <= ${endOfWeek.toISOString()}
      ORDER BY fixture_date ASC, fixture_time ASC
      LIMIT ${limit}
    `

    return fixtures as Fixture[]
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}
