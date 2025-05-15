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

// Team colors for visual distinction
const teamColors: Record<string, string> = {
  "mens-sl1m-gold": "bg-amber-100 border-amber-300",
  "mens-sl1m-black": "bg-gray-100 border-gray-300",
  "mens-sl2m-gold": "bg-amber-100 border-amber-300",
  "mens-sl2m-black": "bg-gray-100 border-gray-300",
  "mens-sl2m-white": "bg-slate-50 border-slate-200",
  "mens-sl3m-gold": "bg-amber-100 border-amber-300",
  "mens-sl3m-black": "bg-gray-100 border-gray-300",
  "womens-sl1w-gold": "bg-amber-100 border-amber-300",
  "womens-sl1w-black": "bg-gray-100 border-gray-300",
  "womens-sl2w-gold": "bg-amber-100 border-amber-300",
  "womens-sl2w-black": "bg-gray-100 border-gray-300",
  "womens-sl2w-white": "bg-slate-50 border-slate-200",
  "womens-sl3w-gold": "bg-amber-100 border-amber-300",
  "womens-sl3w-black": "bg-gray-100 border-gray-300",
  "boys-u17-gold": "bg-amber-100 border-amber-300",
  "boys-u17-black": "bg-gray-100 border-gray-300",
  "girls-u17-gold": "bg-amber-100 border-amber-300",
  "girls-u17-black": "bg-gray-100 border-gray-300",
}

// Compact fixture component
const CompactFixture = ({ fixture }: { fixture: Fixture }) => {
  const { team, opponent, time, location, result, completed, teamSlug } = fixture
  const teamColor = teamColors[teamSlug] || "bg-white border-gray-200"

  // Determine if the result is a win or loss
  const isWin =
    completed &&
    result &&
    result.split("-").length === 2 &&
    Number.parseInt(result.split("-")[0]) > Number.parseInt(result.split("-")[1])
  const isLoss = completed && !isWin

  return (
    <div className={`border rounded-md p-2 mb-2 ${teamColor}`}>
      <div className="flex justify-between items-center">
        <div className="font-medium text-sm truncate text-gray-900">{team}</div>
        <div className="flex items-center space-x-1">
          {completed ? (
            <Badge
              variant="outline"
              className={`font-medium ${
                isWin ? "bg-green-100 text-green-800 border-green-600" : "bg-red-100 text-red-800 border-red-600"
              }`}
            >
              {result}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-gray-700">
              Upcoming
            </Badge>
          )}
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-700 mt-1">
        <div className="flex items-center">
          <span>vs {opponent}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-gray-500" />
            {time || "TBA"}
          </span>
          <span className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-gray-500" />
            {location || "TBA"}
          </span>
        </div>
      </div>
    </div>
  )
}

// Loading skeleton for fixtures
const FixturesSkeleton = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="border rounded-md p-2 mb-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between mt-2">
          <Skeleton className="h-3 w-24" />
          <div className="flex space-x-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
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

  // Group fixtures by round
  const fixturesByRound = useMemo(() => {
    const grouped: Record<string, Fixture[]> = {}

    // Initialize all rounds
    roundDates.forEach((round) => {
      grouped[round.round.toString()] = []
    })

    filteredFixtures.forEach((fixture) => {
      const roundKey = fixture.round.toString()
      if (!grouped[roundKey]) {
        grouped[roundKey] = []
      }
      grouped[roundKey].push(fixture)
    })

    return grouped
  }, [filteredFixtures, roundDates])

  // Group fixtures by team
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
            <TabsList className="grid w-full grid-cols-2 bg-gray-900">
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
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-lg">
          <div>
            <label className="text-sm font-medium mb-1 block">Team</label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                {teamOptions.map((team) => (
                  <SelectItem key={team.value} value={team.value}>
                    {team.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
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
        <Card>
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
                      className="whitespace-nowrap"
                    >
                      <span className="font-medium">R{roundInfo.round}</span>
                      <span className="ml-1 text-xs hidden sm:inline">({roundInfo.shortDate})</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Round {selectedRound}</span>
                  <span className="text-sm font-normal text-muted-foreground">{getRoundDate(selectedRound)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {fixturesByRound[selectedRound]?.length > 0 ? (
                  <div className="space-y-1">
                    {fixturesByRound[selectedRound]
                      .sort((a, b) => {
                        // Sort by time, handling null times
                        if (!a.time) return 1
                        if (!b.time) return -1
                        return a.time.localeCompare(b.time)
                      })
                      .map((fixture) => (
                        <CompactFixture key={fixture.id} fixture={fixture} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
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
                  const teamFixtures = fixturesByTeam[team.value]
                    ?.filter((fixture) => {
                      if (selectedLocation !== "all-locations") {
                        const locationWithoutNumber = fixture.location
                          ? fixture.location.replace(/\d+/g, "").trim()
                          : ""
                        return locationWithoutNumber.startsWith(selectedLocation)
                      }
                      return true
                    })
                    .sort((a, b) => a.round - b.round)

                  if (!teamFixtures || teamFixtures.length === 0) return null

                  return (
                    <Card
                      key={team.value}
                      className={teamColors[team.value] ? `border-2 ${teamColors[team.value]}` : ""}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle>{team.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="space-y-1">
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
                                <div key={fixture.id} className="border rounded-md p-2 mb-2">
                                  <div className="flex justify-between items-center">
                                    <div className="font-medium text-sm text-gray-900">Round {fixture.round}</div>
                                    <div>
                                      {fixture.completed ? (
                                        <Badge
                                          variant="outline"
                                          className={`font-medium ${
                                            isWin
                                              ? "bg-green-100 text-green-800 border-green-600"
                                              : "bg-red-100 text-red-800 border-red-600"
                                          }`}
                                        >
                                          {fixture.result}
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline" className="text-gray-700">
                                          Upcoming
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-700 mt-1">
                                    <div className="flex items-center">
                                      <span>vs {fixture.opponent}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="flex items-center">
                                        <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                        {fixture.date}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-700 mt-1">
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                      {fixture.time || "TBA"}
                                    </span>
                                    <span className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                      {fixture.location || "TBA"}
                                    </span>
                                  </div>
                                </div>
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
              }) && (
              <div className="text-center py-8 text-muted-foreground">No fixtures found with the selected filters.</div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
