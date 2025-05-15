"use server"

import { executeQuery } from "@/lib/db"

export type TeamStanding = {
  team: string
  teamSlug: string
  division: string
  played: number
  won: number
  lost: number
  forfeits: number
  disqualifications: number
  pointsFor: number
  pointsAgainst: number
  setsWon: number
  setsLost: number
  points: number
  winPercentage: number
  lastFive: string[]
}

export async function getTeamStandings(): Promise<TeamStanding[]> {
  try {
    // First, get all fixtures from the database
    const fixtures = await executeQuery(`
      SELECT 
        team, 
        team_slug, 
        opponent, 
        result, 
        completed
      FROM 
        fixtures
      WHERE 
        completed = true
    `)

    // Process fixtures to calculate standings
    const teamStats: Record<
      string,
      {
        team: string
        teamSlug: string
        division: string
        played: number
        won: number
        lost: number
        forfeits: number
        disqualifications: number
        pointsFor: number
        pointsAgainst: number
        setsWon: number
        setsLost: number
        results: string[]
      }
    > = {}

    // Process each fixture to build team statistics
    for (const fixture of fixtures) {
      const { team, team_slug, result, opponent } = fixture

      // Extract division from team name (e.g., "SL1M Black" -> "SL1M")
      const divisionMatch = team.match(/(SL\d+[MW]|JPLM|U17[BG])/)
      const division = divisionMatch ? divisionMatch[0] : "Other"

      // Initialize team if not exists
      if (!teamStats[team]) {
        teamStats[team] = {
          team,
          teamSlug: team_slug,
          division,
          played: 0,
          won: 0,
          lost: 0,
          forfeits: 0,
          disqualifications: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          setsWon: 0,
          setsLost: 0,
          results: [],
        }
      }

      // Check for forfeit or disqualification
      const isForfeit = result.toLowerCase().includes("forfeit")
      const isDisqualified = result.toLowerCase().includes("disq")

      if (isForfeit) {
        // Handle forfeit
        teamStats[team].played += 1
        teamStats[team].forfeits += 1
        teamStats[team].lost += 1
        teamStats[team].results.push("F")
      } else if (isDisqualified) {
        // Handle disqualification
        teamStats[team].played += 1
        teamStats[team].disqualifications += 1
        teamStats[team].lost += 1
        teamStats[team].results.push("D")
      } else {
        // Parse normal result (e.g., "3-0", "2-3")
        const [setsWon, setsLost] = result.split("-").map(Number)
        const isWin = setsWon > setsLost

        // Update team statistics
        teamStats[team].played += 1
        teamStats[team].won += isWin ? 1 : 0
        teamStats[team].lost += isWin ? 0 : 1
        teamStats[team].setsWon += setsWon
        teamStats[team].setsLost += setsLost
        teamStats[team].pointsFor += setsWon
        teamStats[team].pointsAgainst += setsLost
        teamStats[team].results.push(isWin ? "W" : "L")
      }
    }

    // Convert to array and calculate additional stats
    const standings: TeamStanding[] = Object.values(teamStats).map((team) => {
      // Calculate points (4 for win, 0 for loss/forfeit/disqualification)
      const points = team.won * 4

      // Calculate win percentage
      const winPercentage = team.played > 0 ? (team.won / team.played) * 100 : 0

      // Get last 5 results (most recent first)
      const lastFive = team.results.slice(-5).reverse()

      return {
        ...team,
        points,
        winPercentage,
        lastFive,
      }
    })

    // Sort by points (descending), then win percentage (descending)
    return standings.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points
      return b.winPercentage - a.winPercentage
    })
  } catch (error) {
    console.error("Error fetching team standings:", error)
    return []
  }
}

export async function getDivisions(): Promise<string[]> {
  try {
    const fixtures = await executeQuery(`
      SELECT DISTINCT team
      FROM fixtures
    `)

    // Extract unique divisions from team names
    const divisions = new Set<string>()

    for (const fixture of fixtures) {
      const divisionMatch = fixture.team.match(/(SL\d+[MW]|JPLM|U17[BG])/)
      if (divisionMatch) {
        divisions.add(divisionMatch[0])
      }
    }

    return Array.from(divisions).sort()
  } catch (error) {
    console.error("Error fetching divisions:", error)
    return []
  }
}
