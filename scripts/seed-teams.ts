import { neon } from "@neondatabase/serverless"
import { teamsData } from "../lib/teams-data"

// This script seeds the team_data, player_data, and coaches tables with data from teams-data.ts

async function seedTeams() {
  // Check if DATABASE_URL is defined
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not defined")
    return
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    console.log("Starting team data seeding...")

    // Insert each team and its players/coaches
    for (const team of teamsData) {
      // Determine category from slug
      let category = "mens"
      if (team.slug.startsWith("womens-")) {
        category = "womens"
      } else if (team.slug.startsWith("boys-") || team.slug.startsWith("girls-")) {
        category = "youth"
      }

      // Determine division and color from slug
      let division = null
      let color = null

      if (team.slug.includes("sl1")) {
        division = "sl1"
      } else if (team.slug.includes("sl2")) {
        division = "sl2"
      } else if (team.slug.includes("sl3")) {
        division = "sl3"
      } else if (team.slug.includes("jplm")) {
        division = "jplm"
      } else if (team.slug.includes("u17")) {
        division = "u17"
      }

      if (team.slug.includes("-black")) {
        color = "black"
      } else if (team.slug.includes("-gold")) {
        color = "gold"
      } else if (team.slug.includes("-white")) {
        color = "white"
      }

      // Insert team
      console.log(`Inserting team: ${team.name}`)
      const [insertedTeam] = await sql`
        INSERT INTO team_data (name, slug, image, description, category, division, color, has_photos)
        VALUES (${team.name}, ${team.slug}, ${team.image || null}, ${team.description || null}, 
                ${category}, ${division}, ${color}, ${team.hasPhotos || true})
        RETURNING id
      `

      const teamId = insertedTeam.id

      // Insert coaches
      if (team.coaches && team.coaches.length > 0) {
        for (const coach of team.coaches) {
          console.log(`Inserting coach: ${coach.name} for team ${team.name}`)
          await sql`
            INSERT INTO coaches (team_id, name, role, bio)
            VALUES (${teamId}, ${coach.name}, ${coach.role}, ${coach.bio || null})
          `
        }
      }

      // Insert players
      if (team.players && team.players.length > 0) {
        for (const player of team.players) {
          console.log(`Inserting player: ${player.name} for team ${team.name}`)
          await sql`
            INSERT INTO player_data (team_id, name, number, position, is_captain)
            VALUES (${teamId}, ${player.name}, ${player.number}, ${player.position || null}, ${player.isCaptain || false})
          `
        }
      }
    }

    console.log("Team data seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding team data:", error)
  }
}

// Run the seeding function
seedTeams()
  .then(() => {
    console.log("Seeding process completed.")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Seeding process failed:", error)
    process.exit(1)
  })
