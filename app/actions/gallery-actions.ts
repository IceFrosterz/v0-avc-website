"use server"

import { executeQuery } from "@/lib/db"

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

// Fetch all gallery items
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const result = await executeQuery(`
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
      ORDER BY date DESC
    `)

    // Transform database results to match the GalleryItem type
    return result.map((item: any) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      album: item.album,
      year: item.year,
      date: item.date,
      tags: {
        team: item.team,
        competitionType: item.competition_type,
      },
      photographer: {
        name: item.photographer_name,
        instagram: item.photographer_instagram,
      },
    }))
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }
}

// Get all unique years
export async function getGalleryYears(): Promise<string[]> {
  try {
    const result = await executeQuery(`
      SELECT DISTINCT year FROM gallery_items ORDER BY year DESC
    `)
    return result.map((row: any) => row.year)
  } catch (error) {
    console.error("Error fetching gallery years:", error)
    return []
  }
}

// Get all unique teams
export async function getGalleryTeams(): Promise<string[]> {
  try {
    const result = await executeQuery(`
      SELECT DISTINCT team FROM gallery_items ORDER BY team
    `)
    return result.map((row: any) => row.team)
  } catch (error) {
    console.error("Error fetching gallery teams:", error)
    return []
  }
}

// Get all unique competition types
export async function getGalleryCompetitionTypes(): Promise<string[]> {
  try {
    const result = await executeQuery(`
      SELECT DISTINCT competition_type FROM gallery_items ORDER BY competition_type
    `)
    return result.map((row: any) => row.competition_type)
  } catch (error) {
    console.error("Error fetching gallery competition types:", error)
    return []
  }
}

// Get filtered gallery items
export async function getFilteredGalleryItems(
  year = "all",
  team = "all",
  competitionType = "all",
  searchQuery = "",
): Promise<GalleryItem[]> {
  try {
    let query = `
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
      WHERE 1=1
    `
    const params: any[] = []

    if (year !== "all") {
      query += ` AND year = $${params.length + 1}`
      params.push(year)
    }

    if (team !== "all") {
      query += ` AND team = $${params.length + 1}`
      params.push(team)
    }

    if (competitionType !== "all") {
      query += ` AND competition_type = $${params.length + 1}`
      params.push(competitionType)
    }

    if (searchQuery) {
      query += ` AND (
        title ILIKE $${params.length + 1} OR
        team ILIKE $${params.length + 1} OR
        competition_type ILIKE $${params.length + 1} OR
        photographer_name ILIKE $${params.length + 1} OR
        album ILIKE $${params.length + 1} OR
        year ILIKE $${params.length + 1}
      )`
      params.push(`%${searchQuery}%`)
    }

    query += ` ORDER BY date DESC`

    const result = await executeQuery(query, params)

    // Transform database results to match the GalleryItem type
    return result.map((item: any) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      album: item.album,
      year: item.year,
      date: item.date,
      tags: {
        team: item.team,
        competitionType: item.competition_type,
      },
      photographer: {
        name: item.photographer_name,
        instagram: item.photographer_instagram,
      },
    }))
  } catch (error) {
    console.error("Error fetching filtered gallery items:", error)
    return []
  }
}

// Add a new gallery item
export async function addGalleryItem(
  item: Omit<GalleryItem, "id">,
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const id = `gallery-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

    await executeQuery(
      `
      INSERT INTO gallery_items (
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
      [
        id,
        item.title,
        item.image,
        item.album,
        item.year,
        item.date,
        item.tags.team,
        item.tags.competitionType,
        item.photographer.name,
        item.photographer.instagram || null,
      ],
    )

    return { success: true, id }
  } catch (error) {
    console.error("Error adding gallery item:", error)
    return { success: false, error: "Failed to add gallery item" }
  }
}
