"use server"

import { sql } from "@/lib/db"

export type Player = {
  id: number
  name: string
  number: string
  position: string | null
  is_captain: boolean
  photo: string | null
}

export type Coach = {
  id: number
  name: string
  role: string
  bio: string | null
  photo: string | null
}

export type Team = {
  id: number
  name: string
  slug: string
  image: string | null
  description: string | null
  category: string
  division: string | null
  color: string | null
  has_photos: boolean
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  try {
    const teams = await sql`
      SELECT * FROM team_data WHERE slug = ${slug} LIMIT 1
    `

    if (teams.length === 0) {
      return null
    }

    return teams[0] as Team
  } catch (error) {
    console.error("Error fetching team by slug:", error)
    return null
  }
}

export async function getTeamPlayers(teamId: number): Promise<Player[]> {
  try {
    const players = await sql`
      SELECT * FROM player_data 
      WHERE team_id = ${teamId}
      ORDER BY is_captain DESC, CAST(number AS INTEGER) ASC, name ASC
    `

    return players as Player[]
  } catch (error) {
    console.error("Error fetching team players:", error)
    return []
  }
}

export async function getTeamCoaches(teamId: number): Promise<Coach[]> {
  try {
    const coaches = await sql`
      SELECT * FROM coaches 
      WHERE team_id = ${teamId}
      ORDER BY 
        CASE 
          WHEN role ILIKE '%head%' THEN 1 
          WHEN role ILIKE '%assistant%' THEN 2 
          ELSE 3 
        END,
        name ASC
    `

    return coaches as Coach[]
  } catch (error) {
    console.error("Error fetching team coaches:", error)
    return []
  }
}

export async function getTeamsByCategory(category: string): Promise<Team[]> {
  try {
    let teams

    if (category === "all") {
      teams = await sql`
        SELECT * FROM team_data
        ORDER BY 
          CASE category 
            WHEN 'mens' THEN 1 
            WHEN 'womens' THEN 2 
            WHEN 'youth' THEN 3 
          END,
          CASE division 
            WHEN 'sl1' THEN 1 
            WHEN 'sl2' THEN 2 
            WHEN 'sl3' THEN 3 
            WHEN 'jplm' THEN 4 
            WHEN 'u17' THEN 5 
          END,
          color
      `
    } else {
      teams = await sql`
        SELECT * FROM team_data
        WHERE category = ${category}
        ORDER BY 
          CASE division 
            WHEN 'sl1' THEN 1 
            WHEN 'sl2' THEN 2 
            WHEN 'sl3' THEN 3 
            WHEN 'jplm' THEN 4 
            WHEN 'u17' THEN 5 
          END,
          color
      `
    }

    return teams as Team[]
  } catch (error) {
    console.error("Error fetching teams by category:", error)
    return []
  }
}

export async function getAllTeams(): Promise<Team[]> {
  try {
    const teams = await sql`
      SELECT * FROM team_data
      ORDER BY 
        CASE category 
          WHEN 'mens' THEN 1 
          WHEN 'womens' THEN 2 
          WHEN 'youth' THEN 3 
        END,
        CASE division 
          WHEN 'sl1' THEN 1 
          WHEN 'sl2' THEN 2 
          WHEN 'sl3' THEN 3 
          WHEN 'jplm' THEN 4 
          WHEN 'u17' THEN 5 
        END,
        color
    `

    return teams as Team[]
  } catch (error) {
    console.error("Error fetching all teams:", error)
    return []
  }
}
