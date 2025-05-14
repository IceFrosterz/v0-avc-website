"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

// Define the Fixture type
interface Fixture {
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

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [teams, setTeams] = useState<{ name: string; slug: string }[]>([])

  // Fetch fixtures from the API
  useEffect(() => {
    const fetchFixtures = async () => {
      setLoading(true)
      try {
        const url = selectedTeam === "all" ? "/api/fixtures" : `/api/fixtures?team=${selectedTeam}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch fixtures")
        }

        const data = await response.json()
        setFixtures(data)

        // Extract unique teams for the filter dropdown
        if (selectedTeam === "all") {
          const uniqueTeams = Array.from(
            new Set(
              data.map((fixture: Fixture) =>
                JSON.stringify({
                  name: fixture.team,
                  slug: fixture.teamSlug,
                }),
              ),
            ),
          ).map((team) => JSON.parse(team))

          setTeams(uniqueTeams)
        }
      } catch (error) {
        console.error("Error fetching fixtures:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFixtures()
  }, [selectedTeam])

  // Group fixtures by round
  const fixturesByRound = fixtures.reduce(
    (acc, fixture) => {
      const round = fixture.round
      if (!acc[round]) {
        acc[round] = []
      }
      acc[round].push(fixture)
      return acc
    },
    {} as Record<number, Fixture[]>,
  )

  // Sort rounds in ascending order
  const sortedRounds = Object.keys(fixturesByRound)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Fixtures</h1>

      {/* Team filter */}
      <div className="mb-8 max-w-xs mx-auto">
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team.slug} value={team.slug}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        // Loading skeleton
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-10 w-40 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : fixtures.length === 0 ? (
        // No fixtures found
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700">No fixtures found</h2>
          <p className="text-gray-500 mt-2">
            {selectedTeam !== "all"
              ? "Try selecting a different team or check back later."
              : "Check back later for upcoming fixtures."}
          </p>
        </div>
      ) : (
        // Display fixtures grouped by round
        <div className="space-y-12">
          {sortedRounds.map((round) => (
            <div key={round}>
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-gold-500 pb-2">Round {round}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fixturesByRound[round].map((fixture) => (
                  <Card
                    key={fixture.id}
                    className={`overflow-hidden border-2 ${
                      fixture.completed
                        ? fixture.result && fixture.result.startsWith("3")
                          ? "border-green-500"
                          : "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="bg-black text-white p-4">
                        <h3 className="font-bold text-lg">{fixture.team}</h3>
                        <p className="text-gold-500 font-semibold">vs {fixture.opponent}</p>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Date:</span>
                          <span>{fixture.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Time:</span>
                          <span>{fixture.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Location:</span>
                          <span>{fixture.location}</span>
                        </div>
                        {fixture.completed && (
                          <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                            <span>Result:</span>
                            <span
                              className={
                                fixture.result && fixture.result.startsWith("3") ? "text-green-600" : "text-red-600"
                              }
                            >
                              {fixture.result}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
