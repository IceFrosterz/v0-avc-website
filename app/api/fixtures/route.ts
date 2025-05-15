import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "fixtures"

    switch (type) {
      case "fixtures":
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
        return NextResponse.json(fixtures)

      case "teams":
        const teams = await sql`
          SELECT DISTINCT team_slug as value, team as label
          FROM fixtures
          ORDER BY team
        `
        return NextResponse.json([{ value: "all-teams", label: "All Teams" }, ...teams])

      case "locations":
        const locations = await sql`
          SELECT DISTINCT 
            REGEXP_REPLACE(location, '\\d+.*', '') as value,
            REGEXP_REPLACE(location, '\\d+.*', '') as value
          FROM fixtures
          ORDER BY value
        `
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

        const formattedLocations = [
          { value: "all-locations", label: "All Locations" },
          ...(locations as { value: string }[]).map((loc) => ({
            value: loc.value.trim(),
            label: locationMap[loc.value.trim()] || loc.value.trim(),
          })),
        ]
        return NextResponse.json(formattedLocations)

      case "rounds":
        const rounds = await sql`
          SELECT DISTINCT 
            round, 
            MIN(fixture_date) as min_date
          FROM fixtures
          GROUP BY round
          ORDER BY round
        `
        const formattedRounds = (rounds as { round: number; min_date: Date }[]).map((r) => ({
          round: r.round,
          date: new Date(r.min_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          shortDate: new Date(r.min_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        }))
        return NextResponse.json(formattedRounds)

      default:
        return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
    }
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
