"use server"

import { sql } from "@/lib/db"

export type Fixture = {
  id: string
  team: string
  teamSlug: string
  opponent: string
  round: number
  date: string
  time: string
  location: string
  result: string | null
  completed: boolean
}

export async function getFixtures(): Promise<Fixture[]> {
  try {
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
      ORDER BY fixture_date ASC, fixture_time ASC
    `

    return fixtures as Fixture[]
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getTeams(): Promise<{ value: string; label: string }[]> {
  try {
    const teams = await sql`
      SELECT DISTINCT team_slug as value, team as label
      FROM fixtures
      ORDER BY team
    `

    return [{ value: "all-teams", label: "All Teams" }, ...(teams as { value: string; label: string }[])]
  } catch (error) {
    console.error("Database error:", error)
    return [{ value: "all-teams", label: "All Teams" }]
  }
}

export async function getLocations(): Promise<{ value: string; label: string }[]> {
  try {
    const locations = await sql`
      SELECT DISTINCT 
        REGEXP_REPLACE(location, '\\d+.*', '') as base_location,
        REGEXP_REPLACE(location, '\\d+.*', '') as location_name
      FROM fixtures
      ORDER BY base_location
    `

    return [
      { value: "all-locations", label: "All Locations" },
      ...(locations as { value: string; label: string }[]).map((loc) => ({
        value: loc.base_location.trim(),
        label: getLocationFullName(loc.base_location.trim()),
      })),
    ]
  } catch (error) {
    console.error("Database error:", error)
    return [{ value: "all-locations", label: "All Locations" }]
  }
}

function getLocationFullName(shortName: string): string {
  const locationMap: Record<string, string> = {
    SVC: "State Volleyball Centre",
    MSAC: "Melbourne Sports and Aquatic Centre",
    LTU: "La Trobe University",
    MONASH: "Monash University",
    SPRINGERS: "Springers Leisure Centre",
    "RED ENERGY": "Red Energy Arena",
    NETS: "The Nets",
    MAZENOD: "Mazenod College",
    EMP: "Eagle Stadium",
    RINGS: "Rings",
  }

  return locationMap[shortName] || shortName
}

export async function getRoundDates(): Promise<{ round: number; date: string; shortDate: string }[]> {
  try {
    const rounds = await sql`
      SELECT DISTINCT 
        round, 
        MIN(fixture_date) as min_date
      FROM fixtures
      GROUP BY round
      ORDER BY round
    `

    return (rounds as { round: number; min_date: Date }[]).map((r) => ({
      round: r.round,
      date: new Date(r.min_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      shortDate: new Date(r.min_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }))
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}
