"use server"

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export type GalleryItem = {
  id: string
  title: string
  image: string
  album: string
  year: string
  date: string
  tags: {
    team: string
    competitionType: string
  }
  photographer: {
    name: string
    instagram?: string
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const result = await sql`
      SELECT 
        id,
        title,
        image,
        album,
        year,
        date,
        team,
        competition_type,
        photographer_name,
        photographer_instagram
      FROM gallery_items
      ORDER BY date DESC, created_at DESC
    `

    return result.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      image: item.image,
      album: item.album,
      year: item.year.toString(),
      date: item.date,
      tags: {
        team: item.team,
        competitionType: item.competition_type,
      },
      photographer: {
        name: item.photographer_name,
        instagram: item.photographer_instagram || undefined,
      },
    }))
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }
}

export async function getGalleryItemsByFilters(filters: {
  year?: string
  team?: string
  competitionType?: string
}): Promise<GalleryItem[]> {
  try {
    const whereConditions: string[] = []

    if (filters.year && filters.year !== "all") {
      whereConditions.push(`year = '${filters.year}'`)
    }

    if (filters.team && filters.team !== "all") {
      whereConditions.push(`team = '${filters.team}'`)
    }

    if (filters.competitionType && filters.competitionType !== "all") {
      whereConditions.push(`competition_type = '${filters.competitionType}'`)
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : ""

    const result = await sql`
      SELECT 
        id,
        title,
        image,
        album,
        year,
        date,
        team,
        competition_type,
        photographer_name,
        photographer_instagram
      FROM gallery_items
      ${whereClause ? sql.unsafe(whereClause) : sql``}
      ORDER BY date DESC, created_at DESC
    `

    return result.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      image: item.image,
      album: item.album,
      year: item.year.toString(),
      date: item.date,
      tags: {
        team: item.team,
        competitionType: item.competition_type,
      },
      photographer: {
        name: item.photographer_name,
        instagram: item.photographer_instagram || undefined,
      },
    }))
  } catch (error) {
    console.error("Error fetching filtered gallery items:", error)
    return []
  }
}

export async function getUniqueGalleryValues(): Promise<{
  teams: string[]
  competitionTypes: string[]
  years: string[]
  albums: string[]
}> {
  try {
    const [teams, competitionTypes, years, albums] = await Promise.all([
      sql`SELECT DISTINCT team FROM gallery_items WHERE team IS NOT NULL ORDER BY team`,
      sql`SELECT DISTINCT competition_type FROM gallery_items WHERE competition_type IS NOT NULL ORDER BY competition_type`,
      sql`SELECT DISTINCT year FROM gallery_items WHERE year IS NOT NULL ORDER BY year DESC`,
      sql`SELECT DISTINCT album FROM gallery_items WHERE album IS NOT NULL ORDER BY album`,
    ])

    return {
      teams: teams.map((row: any) => row.team),
      competitionTypes: competitionTypes.map((row: any) => row.competition_type),
      years: years.map((row: any) => row.year.toString()),
      albums: albums.map((row: any) => row.album),
    }
  } catch (error) {
    console.error("Error fetching unique gallery values:", error)
    return {
      teams: [],
      competitionTypes: [],
      years: [],
      albums: [],
    }
  }
}
