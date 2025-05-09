"use client"

import { useState } from "react"
import { CalendarDays, MapPin, Clock, Filter, Check, XIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// SL3M Gold fixtures
const sl3mGoldFixtures = [
  {
    id: "alliance-sl3m-gold-r1-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "HEIDELBERG",
    round: 1,
    date: "March 29, 2025",
    time: "4:30 PM",
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
    date: "April 5, 2025",
    time: "2:30 PM",
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
    date: "April 12, 2025",
    time: "4:30 PM",
    location: "MSAC 3",
    result: "3-2",
    completed: true,
  },
  {
    id: "alliance-sl3m-gold-r4-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "VFUM GREEN",
    round: 4,
    date: "April 26, 2025",
    time: "10:30 AM",
    location: "SVC 14B",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r5-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "RENEGADES",
    round: 5,
    date: "May 3, 2025",
    time: "8:30 AM",
    location: "MSAC 6",
    result: "3-2",
    completed: true,
  },
  {
    id: "alliance-sl3m-gold-r7-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "MAZENOD BLACK",
    round: 7,
    date: "May 17, 2025",
    time: "8:30 AM",
    location: "MONASH 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r8-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "MONASH BLUE",
    round: 8,
    date: "May 24, 2025",
    time: "8:30 AM",
    location: "MONASH 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r10-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "YARRA RANGES",
    round: 10,
    date: "June 14, 2025",
    time: "12:30 PM",
    location: "MSAC 1",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r11-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "MORNINGTON GREEN",
    round: 11,
    date: "June 21, 2025",
    time: "4:30 PM",
    location: "MSAC 1",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r12-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "LATROBE RED",
    round: 12,
    date: "June 28, 2025",
    time: "2:30 PM",
    location: "MSAC 6",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r13-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "VIP",
    round: 13,
    date: "July 5, 2025",
    time: "10:30 AM",
    location: "MSAC 1",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r14-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "OAKLEIGH BLACK",
    round: 14,
    date: "July 12, 2025",
    time: "9:00 AM",
    location: "MAZENOD 2",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r15-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "HEIDELBERG",
    round: 15,
    date: "July 19, 2025",
    time: "8:30 AM",
    location: "NETS 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r16-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "WESTERN REGION WOLVES",
    round: 16,
    date: "July 26, 2025",
    time: "2:30 PM",
    location: "MSAC 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r17-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "DERRIMUT KNIGHTS",
    round: 17,
    date: "August 2, 2025",
    time: "1:15 PM",
    location: "SPRINGERS 1B",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-gold-r18-g1",
    team: "Alliance SL3M Gold",
    teamSlug: "mens-sl3m-gold",
    opponent: "VFUM GREEN",
    round: 18,
    date: "August 9, 2025",
    time: "8:30 AM",
    location: "MSAC 6",
    result: null,
    completed: false,
  },
]

// SL3M Black fixtures
const sl3mBlackFixtures = [
  {
    id: "alliance-sl3m-black-r1",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "KVA",
    round: 1,
    date: "March 29, 2025",
    time: "8:30 AM",
    location: "SVC 14B",
    result: "3-0",
    completed: true,
  },
  {
    id: "alliance-sl3m-black-r3",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "CARRUM DOWNS ROYALS",
    round: 3,
    date: "April 12, 2025",
    time: "8:30 AM",
    location: "SVC 14",
    result: "3-0",
    completed: true,
  },
  {
    id: "alliance-sl3m-black-r4",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "STRIVE",
    round: 4,
    date: "April 26, 2025",
    time: "8:30 AM",
    location: "SVC 14",
    result: "0-3",
    completed: true,
  },
  {
    id: "alliance-sl3m-black-r5",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "EASTSIDE HAWKS",
    round: 5,
    date: "May 3, 2025",
    time: "2:30 PM",
    location: "MSAC 6",
    result: "3-1",
    completed: true,
  },
  {
    id: "alliance-sl3m-black-r7",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "MAZENOD BLUE",
    round: 7,
    date: "May 17, 2025",
    time: "1:15 PM",
    location: "SPRINGER 4B",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r8",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "VFUM BLUE",
    round: 8,
    date: "May 24, 2025",
    time: "2:30 PM",
    location: "MSAC 6",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r9",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "SOUTH GIPPSLAND",
    round: 9,
    date: "May 31, 2025",
    time: "12:00 PM",
    location: "LTU 2",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r10",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "OAKLEIGH ORANGE",
    round: 10,
    date: "June 14, 2025",
    time: "8:30 AM",
    location: "MSAC 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r11",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "MORNINGTON WHITE",
    round: 11,
    date: "June 21, 2025",
    time: "12:30 PM",
    location: "MSAC 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r12",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "MONASH GREY",
    round: 12,
    date: "June 28, 2025",
    time: "4:30 PM",
    location: "MONASH 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r13",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "LATROBE BLACK",
    round: 13,
    date: "July 5, 2025",
    time: "12:30 PM",
    location: "MSAC 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r14",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "KVA",
    round: 14,
    date: "July 12, 2025",
    time: "11:00 AM",
    location: "MAZENOD 2",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r15",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "CARRUM DOWNS ROYALS",
    round: 15,
    date: "July 19, 2025",
    time: "9:00 AM",
    location: "MAZENOD 3",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r16",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "STRIVE",
    round: 16,
    date: "July 26, 2025",
    time: "2:30 PM",
    location: "SVC 14B",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r17",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "EASTSIDE HAWKS",
    round: 17,
    date: "August 2, 2025",
    time: "12:30 PM",
    location: "SVC 14B",
    result: null,
    completed: false,
  },
  {
    id: "alliance-sl3m-black-r18",
    team: "Alliance SL3M Black",
    teamSlug: "mens-sl3m-black",
    opponent: "MAZENOD BLUE",
    round: 18,
    date: "August 9, 2025",
    time: "3:15 PM",
    location: "SPRINGER 1A",
    result: null,
    completed: false,
  },
]

// Combine all fixtures
const allFixtures = [...sl3mGoldFixtures, ...sl3mBlackFixtures]

// All team options for filtering
const teamOptions = [
  { value: "all", label: "All Teams" },
  { value: "mens-sl3m-gold", label: "Alliance SL3M Gold" },
  { value: "mens-sl3m-black", label: "Alliance SL3M Black" },
]

export default function FixturesPage() {
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [selectedRound, setSelectedRound] = useState("all") // Default to All Rounds
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

  // Group fixtures by round
  const groupFixturesByRound = (fixtures) => {
    const grouped = {}

    fixtures.forEach((fixture) => {
      if (!grouped[fixture.round]) {
        grouped[fixture.round] = []
      }
      grouped[fixture.round].push(fixture)
    })

    return grouped
  }

  const filteredFixtures = filterFixtures(allFixtures, selectedTeam, selectedRound)
  const groupedFixtures = groupFixturesByRound(filteredFixtures)

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

          {Object.keys(groupedFixtures).length > 0 ? (
            Object.entries(groupedFixtures)
              .sort(([roundA], [roundB]) => Number.parseInt(roundA) - Number.parseInt(roundB))
              .map(([round, fixtures]) => (
                <div key={round} className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6">Round {round}</h2>
                  <div className="grid gap-6">
                    {fixtures.map((fixture) => (
                      <FixtureCard key={fixture.id} fixture={fixture} />
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No fixtures match your filter criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ladder">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Ladder Coming Soon</h2>
            <p className="text-muted-foreground">
              The ladder will be available once the season begins and match results are recorded.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FixtureCard({ fixture }) {
  // Determine if Alliance won based on the result
  // Format is "Alliance-Opponent", so we need to parse the scores
  const getMatchResult = (result) => {
    if (!result) return null

    const [allianceScore, opponentScore] = result.split("-").map(Number)

    if (allianceScore > opponentScore) {
      return { won: true, score: result }
    } else {
      return { won: false, score: result }
    }
  }

  const matchResult = fixture.completed ? getMatchResult(fixture.result) : null

  // Determine border color based on result
  const getBorderClass = () => {
    if (!fixture.completed) return "border-gray-800"
    return matchResult?.won ? "border-green-500" : "border-red-500"
  }

  return (
    <Card className={`bg-gray-900 ${getBorderClass()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="bg-amber-500 text-black mb-2">Round {fixture.round}</Badge>
            <CardTitle className="text-xl">{fixture.team}</CardTitle>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold mt-2">vs {fixture.opponent}</p>
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

        {/* Result section */}
        {fixture.completed && (
          <div
            className={`mt-4 p-3 rounded-md ${matchResult?.won ? "bg-green-900/20" : "bg-red-900/20"} flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              {matchResult?.won ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <XIcon className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">{matchResult?.won ? "Win" : "Loss"}</span>
            </div>
            <div className="text-lg font-bold">{matchResult?.score}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
