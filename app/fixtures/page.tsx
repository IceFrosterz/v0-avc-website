"use client"

import { useState } from "react"
import { CalendarDays, MapPin, Clock, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample fixture data
const fixtures = {
  mens: [
    {
      id: 1,
      team: "Men's Reserve 1",
      opponent: "City Spikers",
      date: "May 15, 2025",
      time: "7:00 PM",
      location: "Alliance Sports Center",
      isHome: true,
    },
    {
      id: 2,
      team: "Men's Reserve 1",
      opponent: "Volleyball Kings",
      date: "May 22, 2025",
      time: "8:30 PM",
      location: "Downtown Arena",
      isHome: false,
    },
    {
      id: 3,
      team: "Men's Reserve 2",
      opponent: "Net Blazers",
      date: "May 18, 2025",
      time: "6:00 PM",
      location: "Alliance Sports Center",
      isHome: true,
    },
    {
      id: 4,
      team: "Men's Reserve 2",
      opponent: "Spike Masters",
      date: "May 20, 2025",
      time: "7:30 PM",
      location: "Community Center",
      isHome: false,
    },
  ],
  womens: [
    {
      id: 5,
      team: "Women's Reserve 1",
      opponent: "Power Hitters",
      date: "May 16, 2025",
      time: "6:30 PM",
      location: "Alliance Sports Center",
      isHome: true,
    },
    {
      id: 6,
      team: "Women's Reserve 1",
      opponent: "Volleyball Queens",
      date: "May 23, 2025",
      time: "7:00 PM",
      location: "University Gym",
      isHome: false,
    },
    {
      id: 7,
      team: "Women's Reserve 2",
      opponent: "Ace Servers",
      date: "May 19, 2025",
      time: "8:00 PM",
      location: "Alliance Sports Center",
      isHome: true,
    },
    {
      id: 8,
      team: "Women's Reserve 2",
      opponent: "Net Defenders",
      date: "May 25, 2025",
      time: "6:00 PM",
      location: "Downtown Arena",
      isHome: false,
    },
  ],
  youth: [
    {
      id: 9,
      team: "Boys U17",
      opponent: "Junior Spikers",
      date: "May 17, 2025",
      time: "4:00 PM",
      location: "Youth Sports Complex",
      isHome: false,
    },
    {
      id: 10,
      team: "Girls U17",
      opponent: "Rising Stars",
      date: "May 24, 2025",
      time: "3:30 PM",
      location: "Alliance Sports Center",
      isHome: true,
    },
  ],
}

// All team options for filtering
const teamOptions = [
  { value: "all", label: "All Teams" },
  { value: "mens-reserve-1", label: "Men's Reserve 1" },
  { value: "mens-reserve-2", label: "Men's Reserve 2" },
  { value: "womens-reserve-1", label: "Women's Reserve 1" },
  { value: "womens-reserve-2", label: "Women's Reserve 2" },
  { value: "boys-u17", label: "Boys U17" },
  { value: "girls-u17", label: "Girls U17" },
]

// Helper function to convert team name to value format
const teamNameToValue = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")
}

export default function FixturesPage() {
  const [selectedTeam, setSelectedTeam] = useState("all")

  // Filter fixtures based on selected team
  const filterFixturesByTeam = (fixtures, teamValue) => {
    if (teamValue === "all") return fixtures

    return fixtures.filter((fixture) => teamNameToValue(fixture.team) === teamValue)
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Fixtures & Results</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay up to date with all upcoming matches for Alliance Volleyball Club teams. Come support our players and be
          part of the excitement!
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="all">All Teams</TabsTrigger>
            <TabsTrigger value="mens">Men's Teams</TabsTrigger>
            <TabsTrigger value="womens">Women's Teams</TabsTrigger>
            <TabsTrigger value="youth">Youth Teams</TabsTrigger>
          </TabsList>

          <div className="w-full md:w-auto flex items-center gap-2 bg-background/50 p-2 rounded-md">
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
        </div>

        <TabsContent value="all" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">All Upcoming Matches</h2>
          <div className="grid gap-6">
            {filterFixturesByTeam(
              [...fixtures.mens, ...fixtures.womens, ...fixtures.youth].sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
              ),
              selectedTeam,
            ).map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mens" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Men's Teams Fixtures</h2>
          <div className="grid gap-6">
            {filterFixturesByTeam(fixtures.mens, selectedTeam).map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="womens" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Women's Teams Fixtures</h2>
          <div className="grid gap-6">
            {filterFixturesByTeam(fixtures.womens, selectedTeam).map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="youth" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Youth Teams Fixtures</h2>
          <div className="grid gap-6">
            {filterFixturesByTeam(fixtures.youth, selectedTeam).map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
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
            <Badge className={fixture.isHome ? "bg-amber-500 text-black" : "bg-gray-700 text-gray-200"}>
              {fixture.isHome ? "Home" : "Away"}
            </Badge>
            <CardTitle className="mt-2 text-xl">{fixture.team}</CardTitle>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              {fixture.isHome ? "Alliance VC vs" : "vs"} {fixture.opponent}
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
