"use client"

import { useState } from "react"
import { CalendarDays, MapPin, Clock, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { teamsData } from "@/lib/teams-data"

// Generate dates for rounds (Saturdays from March 29 to August 9)
const generateRoundDates = () => {
  const startDate = new Date("2025-03-29")
  const dates = []

  for (let i = 0; i < 18; i++) {
    const roundDate = new Date(startDate)
    roundDate.setDate(startDate.getDate() + i * 7)
    dates.push({
      round: i + 1,
      date: roundDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    })
  }

  return dates
}

const roundDates = generateRoundDates()

// Generate fixtures for all teams
const generateFixtures = () => {
  const fixtures = {}

  // Group teams by category
  const menTeams = teamsData.filter((team) => team.slug.startsWith("mens-"))
  const womenTeams = teamsData.filter((team) => team.slug.startsWith("womens-"))
  const youthTeams = teamsData.filter((team) => team.slug.startsWith("boys-") || team.slug.startsWith("girls-"))

  // Generate fixtures for each category
  fixtures.mens = generateCategoryFixtures(menTeams, "Alliance Sports Center")
  fixtures.womens = generateCategoryFixtures(womenTeams, "Alliance Sports Center")
  fixtures.youth = generateCategoryFixtures(youthTeams, "Youth Sports Complex")

  return fixtures
}

// Helper to generate fixtures for a category of teams
const generateCategoryFixtures = (teams, defaultLocation) => {
  const fixtures = []

  teams.forEach((team) => {
    // Generate 18 rounds of fixtures for each team
    for (let round = 1; round <= 18; round++) {
      // Find opponent (just cycle through other teams)
      const opponentIndex = round % (teams.length - 1)
      const opponent = teams.find((t) => t.id !== team.id && t.id % teams.length === opponentIndex)

      if (opponent) {
        fixtures.push({
          id: `${team.id}-${round}`,
          team: team.name,
          teamSlug: team.slug,
          opponent: opponent.name,
          round: round,
          date: roundDates[round - 1].date,
          time: `${7 + (round % 3)}:00 PM`,
          location: defaultLocation,
          isHome: round % 2 === 0,
        })
      }
    }
  })

  return fixtures
}

// Generate ladder data
const generateLadder = () => {
  const ladder = {
    mens: [],
    womens: [],
    youth: [],
  }

  // Group teams by category
  const menTeams = teamsData.filter((team) => team.slug.startsWith("mens-"))
  const womenTeams = teamsData.filter((team) => team.slug.startsWith("womens-"))
  const youthTeams = teamsData.filter((team) => team.slug.startsWith("boys-") || team.slug.startsWith("girls-"))

  // Generate random stats for men's teams
  menTeams.forEach((team) => {
    ladder.mens.push(generateTeamStats(team))
  })

  // Generate random stats for women's teams
  womenTeams.forEach((team) => {
    ladder.womens.push(generateTeamStats(team))
  })

  // Generate random stats for youth teams
  youthTeams.forEach((team) => {
    ladder.youth.push(generateTeamStats(team))
  })

  // Sort each ladder by points (descending)
  ladder.mens.sort((a, b) => b.points - a.points)
  ladder.womens.sort((a, b) => b.points - a.points)
  ladder.youth.sort((a, b) => b.points - a.points)

  return ladder
}

// Helper to generate random stats for a team
const generateTeamStats = (team) => {
  const played = Math.floor(Math.random() * 18) + 1
  const won = Math.floor(Math.random() * played)
  const lost = played - won
  const pointsFor = won * 25 + lost * Math.floor(Math.random() * 20)
  const pointsAgainst = lost * 25 + won * Math.floor(Math.random() * 20)

  return {
    id: team.id,
    name: team.name,
    slug: team.slug,
    played,
    won,
    lost,
    pointsFor,
    pointsAgainst,
    pointsDiff: pointsFor - pointsAgainst,
    points: won * 3,
  }
}

// Generate fixtures and ladder data
const fixtures = generateFixtures()
const ladder = generateLadder()

// All team options for filtering
const teamOptions = [
  { value: "all", label: "All Teams" },
  ...teamsData.map((team) => ({
    value: team.slug,
    label: team.name,
  })),
]

// Helper function to convert team name to value format
const teamNameToValue = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")
}

export default function FixturesPage() {
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [selectedRound, setSelectedRound] = useState("all")
  const [activeTab, setActiveTab] = useState("fixtures")

  // Filter fixtures based on selected team and round
  const filterFixtures = (fixtures, teamValue, roundValue) => {
    let filtered = [...fixtures]

    if (teamValue !== "all") {
      filtered = filtered.filter((fixture) => fixture.teamSlug === teamValue)
    }

    if (roundValue !== "all") {
      filtered = filtered.filter((fixture) => fixture.round === Number.parseInt(roundValue))
    }

    return filtered
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Fixtures & Ladder</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay up to date with all upcoming matches for Alliance Volleyball Club teams and track their performance in
          the ladder.
        </p>
      </div>

      <Tabs defaultValue="fixtures" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
            <TabsTrigger value="ladder">Ladder</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="fixtures">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All Teams</TabsTrigger>
              <TabsTrigger value="mens">Men's Teams</TabsTrigger>
              <TabsTrigger value="womens">Women's Teams</TabsTrigger>
              <TabsTrigger value="youth">Youth Teams</TabsTrigger>
            </TabsList>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2">
              <div className="w-full sm:w-auto flex items-center gap-2 bg-background/50 p-2 rounded-md">
                <Filter className="h-4 w-4 text-amber-500" />
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="w-full md:w-[200px] border-none bg-transparent focus:ring-0">
                    <SelectValue placeholder="Filter by team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto flex items-center gap-2 bg-background/50 p-2 rounded-md">
                <CalendarDays className="h-4 w-4 text-amber-500" />
                <Select value={selectedRound} onValueChange={setSelectedRound}>
                  <SelectTrigger className="w-full md:w-[200px] border-none bg-transparent focus:ring-0">
                    <SelectValue placeholder="Filter by round" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rounds</SelectItem>
                    {roundDates.map((round) => (
                      <SelectItem key={round.round} value={round.round.toString()}>
                        Round {round.round}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all" className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">All Fixtures</h2>
              <div className="grid gap-6">
                {filterFixtures(
                  [...fixtures.mens, ...fixtures.womens, ...fixtures.youth].sort(
                    (a, b) => a.round - b.round || new Date(a.date).getTime() - new Date(b.date).getTime(),
                  ),
                  selectedTeam,
                  selectedRound,
                ).map((fixture) => (
                  <FixtureCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mens" className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">Men's Teams Fixtures</h2>
              <div className="grid gap-6">
                {filterFixtures(fixtures.mens, selectedTeam, selectedRound).map((fixture) => (
                  <FixtureCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="womens" className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">Women's Teams Fixtures</h2>
              <div className="grid gap-6">
                {filterFixtures(fixtures.womens, selectedTeam, selectedRound).map((fixture) => (
                  <FixtureCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="youth" className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">Youth Teams Fixtures</h2>
              <div className="grid gap-6">
                {filterFixtures(fixtures.youth, selectedTeam, selectedRound).map((fixture) => (
                  <FixtureCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="ladder">
          <Tabs defaultValue="mens" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="mens">Men's Ladder</TabsTrigger>
              <TabsTrigger value="womens">Women's Ladder</TabsTrigger>
              <TabsTrigger value="youth">Youth Ladder</TabsTrigger>
            </TabsList>

            <TabsContent value="mens" className="space-y-8">
              <LadderTable teams={ladder.mens} />
            </TabsContent>

            <TabsContent value="womens" className="space-y-8">
              <LadderTable teams={ladder.womens} />
            </TabsContent>

            <TabsContent value="youth" className="space-y-8">
              <LadderTable teams={ladder.youth} />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FixtureCard({ fixture }) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="bg-amber-500 text-black mb-2">Round {fixture.round}</Badge>
            <CardTitle className="text-xl">{fixture.team}</CardTitle>
          </div>
          <div className="text-right">
            <Badge className={fixture.isHome ? "bg-amber-500 text-black" : "bg-gray-700 text-gray-200"}>
              {fixture.isHome ? "Home" : "Away"}
            </Badge>
            <p className="text-lg font-semibold mt-2">
              {fixture.isHome ? "vs" : "at"} {fixture.opponent}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-amber-500" />
            <span>{fixture.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>{fixture.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-500" />
            <span>{fixture.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LadderTable({ teams }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-900">
            <th className="p-3 text-left">Pos</th>
            <th className="p-3 text-left">Team</th>
            <th className="p-3 text-center">P</th>
            <th className="p-3 text-center">W</th>
            <th className="p-3 text-center">L</th>
            <th className="p-3 text-center">PF</th>
            <th className="p-3 text-center">PA</th>
            <th className="p-3 text-center">PD</th>
            <th className="p-3 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
              <td className="p-3 font-medium">{index + 1}</td>
              <td className="p-3 font-medium">{team.name}</td>
              <td className="p-3 text-center">{team.played}</td>
              <td className="p-3 text-center">{team.won}</td>
              <td className="p-3 text-center">{team.lost}</td>
              <td className="p-3 text-center">{team.pointsFor}</td>
              <td className="p-3 text-center">{team.pointsAgainst}</td>
              <td className="p-3 text-center">{team.pointsDiff}</td>
              <td className="p-3 text-center font-bold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
