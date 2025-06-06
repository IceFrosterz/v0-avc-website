"use client"

import { useState, useEffect, useMemo } from "react"
import { MapPin, Clock, ChevronDown, ChevronUp, Calendar, Users, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getFixtures, getTeams, getLocations, getRoundDates, type Fixture } from "@/app/actions/fixtures-actions"

// Team colors for visual distinction in dark mode
const teamColors: Record<string, { border: string; bg: string; text: string }> = {
  "mens-sl1m-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "mens-sl1m-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
  "mens-sl2m-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "mens-sl2m-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
  "mens-sl2m-white": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-gray-200",
  },
  "mens-sl3m-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "mens-sl3m-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
  "womens-sl1w-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "womens-sl1w-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
  "womens-sl2w-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "womens-sl2w-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
  "womens-sl2w-white": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-gray-200",
  },
  "womens-sl3w-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "womens-sl3w-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
  "boys-u17-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "boys-u17-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
  "girls-u17-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-amber-400",
  },
  "girls-u17-black": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-900 to-black",
    text: "text-white",
  },
}

// Default colors for teams without specific colors
const defaultTeamColors = {
  border: "border-l-gray-400",
  bg: "bg-gradient-to-r from-gray-900 to-black",
  text: "text-white",
}

// Compact fixture component
const CompactFixture = ({ fixture }: { fixture: Fixture }) => {
  const { team, opponent, time, location, result, completed, teamSlug } = fixture
  const teamColor = teamColors[teamSlug] || defaultTeamColors

  // Determine if the result is a win or loss
  const isWin =
    completed &&
    result &&
    result.split("-").length === 2 &&
    Number.parseInt(result.split("-")[0]) > Number.parseInt(result.split("-")[1])
  const isLoss = completed && !isWin

  return (
    <Card
      className={`overflow-hidden border-l-4 ${teamColor.border} ${teamColor.bg} hover:shadow-md transition-shadow`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className={`font-bold ${teamColor.text}`}>{team}</h3>
          <div>
            {completed ? (
              <Badge
                variant="outline"
                className={`font-medium ${
                  isWin ? "bg-green-900 text-green-100 border-green-600" : "bg-red-900 text-red-100 border-red-600"
                }`}
              >
                {result}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-900 text-amber-100 border-amber-500">
                Upcoming
              </Badge>
            )}
          </div>
        </div>

        <p className="text-gray-300 font-medium mb-3">vs {opponent}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-amber-500" />
            <span>{time || "TBA"}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-amber-500" />
            <span className="truncate">{location || "TBA"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Loading skeleton for fixtures
const FixturesSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <Card key={i} className="overflow-hidden border-l-4 border-l-gray-300 bg-gray-900">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-5 w-32 bg-gray-700" />
            <Skeleton className="h-5 w-16 bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-40 mb-3 bg-gray-700" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-gray-700" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [teamOptions, setTeamOptions] = useState<{ value: string; label: string }[]>([])
  const [locationOptions, setLocationOptions] = useState<{ value: string; label: string }[]>([])
  const [roundDates, setRoundDates] = useState<{ round: number; date: string; shortDate: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedTeam, setSelectedTeam] = useState("all-teams")
  const [selectedLocation, setSelectedLocation] = useState("all-locations")
  const [selectedRound, setSelectedRound] = useState("1")
  const [viewMode, setViewMode] = useState("round") // "round" or "team"
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const [fixturesData, teamsData, locationsData, roundDatesData] = await Promise.all([
          getFixtures(),
          getTeams(),
          getLocations(),
          getRoundDates(),
        ])

        setFixtures(fixturesData)
        setTeamOptions(teamsData)
        setLocationOptions(locationsData)
        setRoundDates(roundDatesData)

        // Set initial selected round to the earliest available round
        if (roundDatesData.length > 0) {
          setSelectedRound(roundDatesData[0].round.toString())
        }
      } catch (error) {
        console.error("Error loading data:", error)
        setError("Failed to load fixtures. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter fixtures
  const filteredFixtures = useMemo(() => {
    return fixtures.filter((fixture) => {
      if (selectedTeam !== "all-teams" && fixture.teamSlug !== selectedTeam) {
        return false
      }
      if (selectedLocation !== "all-locations") {
        const locationWithoutNumber = fixture.location ? fixture.location.replace(/\d+/g, "").trim() : ""
        if (!locationWithoutNumber.startsWith(selectedLocation)) {
          return false
        }
      }
      return true
    })
  }, [fixtures, selectedTeam, selectedLocation])

  // Group fixtures by round and sort by time
  const fixturesByRound = useMemo(() => {
    const grouped: Record<string, Fixture[]> = {}

    // Initialize all rounds
    roundDates.forEach((round) => {
      grouped[round.round.toString()] = []
    })

    // Add filtered fixtures to their respective rounds
    filteredFixtures.forEach((fixture) => {
      const roundKey = fixture.round.toString()
      if (!grouped[roundKey]) {
        grouped[roundKey] = []
      }
      grouped[roundKey].push(fixture)
    })

    // Sort each round's fixtures by time
    Object.keys(grouped).forEach((roundKey) => {
      grouped[roundKey].sort((a, b) => {
        // Handle null or undefined times
        if (!a.time) return 1
        if (!b.time) return -1

        // Convert times to comparable format (assuming format like "10:00 AM")
        const timeA = a.time
        const timeB = b.time

        return timeA.localeCompare(timeB)
      })
    })

    return grouped
  }, [filteredFixtures, roundDates])

  // Group fixtures by team and sort by round and time
  const fixturesByTeam = useMemo(() => {
    const grouped: Record<string, Fixture[]> = {}

    teamOptions.forEach((team) => {
      if (team.value !== "all-teams") {
        grouped[team.value] = []
      }
    })

    filteredFixtures.forEach((fixture) => {
      if (grouped[fixture.teamSlug]) {
        grouped[fixture.teamSlug].push(fixture)
      }
    })

    // Sort each team's fixtures by round and then by time
    Object.keys(grouped).forEach((teamKey) => {
      grouped[teamKey].sort((a, b) => {
        // First sort by round
        if (a.round !== b.round) {
          return a.round - b.round
        }
        // Then sort by time
        if (!a.time) return 1
        if (!b.time) return -1
        return a.time.localeCompare(b.time)
      })
    })

    return grouped
  }, [filteredFixtures, teamOptions])

  // Get round date
  const getRoundDate = (round: string) => {
    const roundInfo = roundDates.find((r) => r.round === Number.parseInt(round))
    return roundInfo ? roundInfo.date : ""
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Fixtures</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Tabs defaultValue="round" className="w-full" onValueChange={setViewMode}>
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-gray-900 to-black">
              <TabsTrigger
                value="round"
                className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400"
              >
                <Calendar className="h-4 w-4 mr-2" />
                By Round
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400"
              >
                <Users className="h-4 w-4 mr-2" />
                By Team
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gradient-to-r from-gray-900 to-black p-4 rounded-lg border border-gray-700">
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-300">Team</label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {teamOptions.map((team) => (
                  <SelectItem key={team.value} value={team.value} className="focus:bg-gray-700 focus:text-white">
                    {team.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-300">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {locationOptions.map((location) => (
                  <SelectItem
                    key={location.value}
                    value={location.value}
                    className="focus:bg-gray-700 focus:text-white"
                  >
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
              onClick={() => {
                setSelectedTeam("all-teams")
                setSelectedLocation("all-locations")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {error ? (
        <Card>
          <CardContent className="py-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      ) : loading ? (
        <Card className="bg-gray-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle>Loading fixtures...</CardTitle>
          </CardHeader>
          <CardContent>
            <FixturesSkeleton />
          </CardContent>
        </Card>
      ) : (
        <Tabs value={viewMode} className="w-full">
          <TabsContent value="round" className="mt-0">
            {roundDates.length > 0 && (
              <div className="mb-4 overflow-x-auto">
                <div className="flex space-x-2 py-2">
                  {roundDates.map((roundInfo) => (
                    <Button
                      key={roundInfo.round}
                      variant={selectedRound === roundInfo.round.toString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRound(roundInfo.round.toString())}
                      className={`whitespace-nowrap ${
                        selectedRound === roundInfo.round.toString() ? "bg-amber-500 hover:bg-amber-600 text-black" : ""
                      }`}
                    >
                      <span className="font-medium">R{roundInfo.round}</span>
                      <span className="ml-1 text-xs hidden sm:inline">({roundInfo.shortDate})</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Card className="bg-gray-900 border-t-4 border-t-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-white">
                  <span>Round {selectedRound}</span>
                  <span className="text-sm font-normal text-gray-300">{getRoundDate(selectedRound)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {fixturesByRound[selectedRound]?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fixturesByRound[selectedRound].map((fixture) => (
                      <CompactFixture key={fixture.id} fixture={fixture} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-300">
                    No fixtures found for this round with the selected filters.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamOptions
                .filter((team) => team.value !== "all-teams")
                .filter((team) => selectedTeam === "all-teams" || team.value === selectedTeam)
                .map((team) => {
                  const teamFixtures = fixturesByTeam[team.value]?.filter((fixture) => {
                    if (selectedLocation !== "all-locations") {
                      const locationWithoutNumber = fixture.location ? fixture.location.replace(/\d+/g, "").trim() : ""
                      return locationWithoutNumber.startsWith(selectedLocation)
                    }
                    return true
                  })

                  if (!teamFixtures || teamFixtures.length === 0) return null

                  const teamColor = teamColors[team.value] || defaultTeamColors

                  return (
                    <Card
                      key={team.value}
                      className={`overflow-hidden border-t-4 ${teamColor.border.replace("border-l-", "border-t-")} bg-gray-900`}
                    >
                      <CardHeader className={`pb-2 ${teamColor.bg}`}>
                        <CardTitle className={teamColor.text}>{team.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[350px]">
                          <div className="p-4 space-y-4">
                            {teamFixtures.map((fixture) => {
                              // Determine if the result is a win or loss
                              const isWin =
                                fixture.completed &&
                                fixture.result &&
                                fixture.result.split("-").length === 2 &&
                                Number.parseInt(fixture.result.split("-")[0]) >
                                  Number.parseInt(fixture.result.split("-")[1])
                              const isLoss = fixture.completed && !isWin

                              return (
                                <Card
                                  key={fixture.id}
                                  className={`overflow-hidden border-l-4 ${teamColor.border} ${teamColor.bg} hover:shadow-md transition-shadow`}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                      <h3 className={`font-bold ${teamColor.text}`}>Round {fixture.round}</h3>
                                      <div>
                                        {fixture.completed ? (
                                          <Badge
                                            variant="outline"
                                            className={`font-medium ${
                                              isWin
                                                ? "bg-green-900 text-green-100 border-green-600"
                                                : "bg-red-900 text-red-100 border-red-600"
                                            }`}
                                          >
                                            {fixture.result}
                                          </Badge>
                                        ) : (
                                          <Badge
                                            variant="outline"
                                            className="bg-amber-900 text-amber-100 border-amber-500"
                                          >
                                            Upcoming
                                          </Badge>
                                        )}
                                      </div>
                                    </div>

                                    <p className="text-gray-300 font-medium mb-3">vs {fixture.opponent}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                                      <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                                        <span>{fixture.date}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                                        <span>{fixture.time || "TBA"}</span>
                                      </div>
                                      <div className="flex items-center col-span-1 sm:col-span-2">
                                        <MapPin className="h-4 w-4 mr-2 text-amber-500" />
                                        <span className="truncate">{fixture.location || "TBA"}</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  )
                })
                .filter(Boolean)}
            </div>
            {teamOptions
              .filter((team) => team.value !== "all-teams")
              .filter((team) => selectedTeam === "all-teams" || team.value === selectedTeam)
              .every((team) => {
                const teamFixtures = fixturesByTeam[team.value]?.filter((fixture) => {
                  if (selectedLocation !== "all-locations") {
                    const locationWithoutNumber = fixture.location ? fixture.location.replace(/\d+/g, "").trim() : ""
                    return locationWithoutNumber.startsWith(selectedLocation)
                  }
                  return true
                })
                return !teamFixtures || teamFixtures.length === 0
              }) && <div className="text-center py-8 text-gray-300">No fixtures found with the selected filters.</div>}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
