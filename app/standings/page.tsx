"use client"

import { useState, useEffect } from "react"
import { getTeamStandings, getDivisions, type TeamStanding } from "../actions/standings-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ArrowUpDown, Trophy, Medal } from "lucide-react"

export default function StandingsPage() {
  const [standings, setStandings] = useState<TeamStanding[]>([])
  const [divisions, setDivisions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDivision, setSelectedDivision] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"points" | "winPercentage" | "played">("points")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [standingsData, divisionsData] = await Promise.all([getTeamStandings(), getDivisions()])
        setStandings(standingsData)
        setDivisions(divisionsData)
        setError(null)
      } catch (err) {
        console.error("Error fetching standings data:", err)
        setError("Failed to load standings data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter standings by division
  const filteredStandings =
    selectedDivision === "all" ? standings : standings.filter((team) => team.division === selectedDivision)

  // Sort standings
  const sortedStandings = [...filteredStandings].sort((a, b) => {
    const multiplier = sortOrder === "desc" ? 1 : -1

    if (sortBy === "points") {
      return (b.points - a.points) * multiplier
    } else if (sortBy === "winPercentage") {
      return (b.winPercentage - a.winPercentage) * multiplier
    } else {
      return (b.played - a.played) * multiplier
    }
  })

  // Handle sort click
  const handleSort = (column: "points" | "winPercentage" | "played") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  // Render result badge
  const renderResultBadge = (result: string) => {
    if (result === "W") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">W</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">L</Badge>
    }
  }

  // Determine team rank and add visual indicator
  const getTeamRank = (index: number, team: TeamStanding) => {
    if (index === 0) {
      return (
        <div className="flex items-center">
          <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
          <span>1st</span>
        </div>
      )
    } else if (index === 1) {
      return (
        <div className="flex items-center">
          <Medal className="h-4 w-4 text-gray-400 mr-1" />
          <span>2nd</span>
        </div>
      )
    } else if (index === 2) {
      return (
        <div className="flex items-center">
          <Medal className="h-4 w-4 text-amber-700 mr-1" />
          <span>3rd</span>
        </div>
      )
    } else {
      return <span>{index + 1}th</span>
    }
  }

  // Get team color class based on team name
  const getTeamColorClass = (team: string) => {
    if (team.includes("Gold")) {
      return "border-l-4 border-yellow-500"
    } else if (team.includes("Black")) {
      return "border-l-4 border-gray-800"
    } else if (team.includes("White")) {
      return "border-l-4 border-gray-300"
    }
    return ""
  }

  // Calculate win streak
  const getWinStreak = (results: string[]) => {
    let streak = 0
    const isWinStreak = results[0] === "W"

    for (let i = 0; i < results.length; i++) {
      if ((isWinStreak && results[i] === "W") || (!isWinStreak && results[i] === "L")) {
        streak++
      } else {
        break
      }
    }

    return {
      count: streak,
      type: isWinStreak ? "W" : "L",
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Team Standings</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      <Tabs defaultValue="standings" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="stats">Team Stats</TabsTrigger>
        </TabsList>

        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <Select value={selectedDivision} onValueChange={setSelectedDivision}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select Division" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Divisions</SelectItem>
              {divisions.map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="standings">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {selectedDivision === "all" ? "All Teams" : selectedDivision} Standings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Rank</th>
                        <th className="text-left py-3 px-2">Team</th>
                        <th className="text-center py-3 px-2">
                          <button
                            onClick={() => handleSort("played")}
                            className="flex items-center justify-center w-full"
                          >
                            P
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-center py-3 px-2">W</th>
                        <th className="text-center py-3 px-2">L</th>
                        <th className="text-center py-3 px-2">Sets</th>
                        <th className="text-center py-3 px-2">
                          <button
                            onClick={() => handleSort("points")}
                            className="flex items-center justify-center w-full"
                          >
                            Pts
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-center py-3 px-2">
                          <button
                            onClick={() => handleSort("winPercentage")}
                            className="flex items-center justify-center w-full"
                          >
                            Win %
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-center py-3 px-2">Last 5</th>
                        <th className="text-center py-3 px-2">Streak</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedStandings.map((team, index) => {
                        const streak = getWinStreak(team.lastFive)
                        return (
                          <tr key={team.team} className={`border-b hover:bg-gray-50 ${getTeamColorClass(team.team)}`}>
                            <td className="py-3 px-2">{getTeamRank(index, team)}</td>
                            <td className="py-3 px-2">
                              <Link href={`/teams/${team.teamSlug}`} className="font-medium hover:underline">
                                {team.team}
                              </Link>
                            </td>
                            <td className="text-center py-3 px-2">{team.played}</td>
                            <td className="text-center py-3 px-2 text-green-600 font-medium">{team.won}</td>
                            <td className="text-center py-3 px-2 text-red-600 font-medium">{team.lost}</td>
                            <td className="text-center py-3 px-2">
                              {team.setsWon}-{team.setsLost}
                            </td>
                            <td className="text-center py-3 px-2 font-bold">{team.points}</td>
                            <td className="text-center py-3 px-2">{team.winPercentage.toFixed(1)}%</td>
                            <td className="text-center py-3 px-2">
                              <div className="flex justify-center gap-1">
                                {team.lastFive.map((result, i) => (
                                  <div key={i}>{renderResultBadge(result)}</div>
                                ))}
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              {streak.count > 0 && (
                                <Badge
                                  className={`${
                                    streak.type === "W" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {streak.type}
                                  {streak.count}
                                </Badge>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && sortedStandings.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No standings data available for the selected division.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {selectedDivision === "all" ? "All Teams" : selectedDivision} Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedStandings.map((team) => (
                    <Card key={team.team} className={`overflow-hidden ${getTeamColorClass(team.team)}`}>
                      <CardHeader className="pb-2">
                        <Link href={`/teams/${team.teamSlug}`} className="font-bold text-lg hover:underline">
                          {team.team}
                        </Link>
                        <p className="text-sm text-gray-500">{team.division}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Played</p>
                            <p className="text-xl font-bold">{team.played}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Points</p>
                            <p className="text-xl font-bold">{team.points}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Win %</p>
                            <p className="text-xl font-bold">{team.winPercentage.toFixed(1)}%</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-green-50 rounded p-2 text-center">
                            <p className="text-xs text-gray-600">Wins</p>
                            <p className="text-lg font-bold text-green-600">{team.won}</p>
                          </div>
                          <div className="bg-red-50 rounded p-2 text-center">
                            <p className="text-xs text-gray-600">Losses</p>
                            <p className="text-lg font-bold text-red-600">{team.lost}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs text-gray-500 mb-1">Last 5 matches</p>
                          <div className="flex gap-1">
                            {team.lastFive.map((result, i) => (
                              <div key={i} className="flex-1">
                                {renderResultBadge(result)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!loading && sortedStandings.length === 0 && (
                <div className="text-center py-8 text-gray-500">No statistics available for the selected division.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Points system: Win = 3 points, Loss = 1 point</p>
        <p className="mt-1">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}
