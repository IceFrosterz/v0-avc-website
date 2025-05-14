import { executeQuery } from "../lib/db"

async function seedFixtures() {
  console.log("Seeding fixtures data...")

  // SL3M Gold fixtures
  const sl3mGoldFixtures = [
    {
      id: "alliance-sl3m-gold-r1-g1",
      team: "Alliance SL3M Gold",
      teamSlug: "mens-sl3m-gold",
      opponent: "HEIDELBERG",
      round: 1,
      date: "2025-03-29",
      time: "16:30:00",
      location: "SVC 14",
      result: "3-0",
      completed: true,
    },
    {
      id: "alliance-sl3m-gold-r2-g1",
      team: "Alliance SL3M Gold",
      teamSlug: "mens-sl3m-gold",
      opponent: "WESTERN REGION WOLVES",
      round: 2,
      date: "2025-04-05",
      time: "14:30:00",
      location: "SVC 14",
      result: null,
      completed: false,
    },
    {
      id: "alliance-sl3m-gold-r3-g1",
      team: "Alliance SL3M Gold",
      teamSlug: "mens-sl3m-gold",
      opponent: "DERRIMUT KNIGHTS",
      round: 3,
      date: "2025-04-12",
      time: "16:30:00",
      location: "MSAC 3",
      result: "3-2",
      completed: true,
    },
    // Add more fixtures as needed
  ]

  // SL3M Black fixtures
  const sl3mBlackFixtures = [
    {
      id: "alliance-sl3m-black-r1",
      team: "Alliance SL3M Black",
      teamSlug: "mens-sl3m-black",
      opponent: "KVA",
      round: 1,
      date: "2025-03-29",
      time: "08:30:00",
      location: "SVC 14B",
      result: "3-0",
      completed: true,
    },
    // Add more fixtures as needed
  ]

  // Combine all fixtures
  const allFixtures = [...sl3mGoldFixtures, ...sl3mBlackFixtures]

  // Insert fixtures into the database
  for (const fixture of allFixtures) {
    try {
      await executeQuery(
        `
        INSERT INTO fixtures (
          id, team, team_slug, opponent, round, 
          fixture_date, fixture_time, location, result, completed
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) 
        DO UPDATE SET
          team = EXCLUDED.team,
          team_slug = EXCLUDED.team_slug,
          opponent = EXCLUDED.opponent,
          round = EXCLUDED.round,
          fixture_date = EXCLUDED.fixture_date,
          fixture_time = EXCLUDED.fixture_time,
          location = EXCLUDED.location,
          result = EXCLUDED.result,
          completed = EXCLUDED.completed,
          updated_at = CURRENT_TIMESTAMP
        `,
        [
          fixture.id,
          fixture.team,
          fixture.teamSlug,
          fixture.opponent,
          fixture.round,
          fixture.date,
          fixture.time,
          fixture.location,
          fixture.result,
          fixture.completed,
        ],
      )
    } catch (error) {
      console.error(`Error inserting fixture ${fixture.id}:`, error)
    }
  }

  console.log(`Seeded ${allFixtures.length} fixtures`)
}

// Execute the seed function
seedFixtures()
  .then(() => {
    console.log("Fixtures seeding completed")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Error seeding fixtures:", error)
    process.exit(1)
  })
