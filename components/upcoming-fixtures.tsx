import Link from "next/link"
import { MapPin, Clock, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUpcomingFixtures } from "@/app/actions/upcoming-fixtures-actions"

// Team colors for visual distinction
const teamColors: Record<string, { border: string; bg: string; text: string }> = {
  "mens-sl1m-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "mens-sl1m-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "mens-sl2m-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "mens-sl2m-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "mens-sl2m-white": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "mens-sl3m-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "mens-sl3m-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "womens-sl1w-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "womens-sl1w-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "womens-sl2w-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "womens-sl2w-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "womens-sl2w-white": {
    border: "border-l-gray-400",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "womens-sl3w-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "womens-sl3w-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "boys-u17-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "boys-u17-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
  "girls-u17-gold": {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    text: "text-amber-900",
  },
  "girls-u17-black": {
    border: "border-l-gray-800",
    bg: "bg-gradient-to-r from-gray-50 to-white",
    text: "text-gray-900",
  },
}

// Default colors for teams without specific colors
const defaultTeamColors = {
  border: "border-l-gray-400",
  bg: "bg-white",
  text: "text-gray-900",
}

export async function UpcomingFixtures() {
  const fixtures = await getUpcomingFixtures(4)

  if (fixtures.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          <span className="inline-block pb-2 border-b-2 border-amber-500">Upcoming Matches</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fixtures.map((fixture) => {
            const teamColor = teamColors[fixture.teamSlug] || defaultTeamColors

            return (
              <Card
                key={fixture.id}
                className={`overflow-hidden border-l-4 ${teamColor.border} bg-gradient-to-r from-gray-900 to-black hover:shadow-lg transition-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-white">{fixture.team}</h3>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-amber-700 to-amber-600 text-amber-100 border-amber-500"
                    >
                      Round {fixture.round}
                    </Badge>
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

        <div className="text-center mt-6">
          <Link
            href="/fixtures"
            className="inline-block px-6 py-3 bg-amber-500 text-black font-bold rounded-md hover:bg-amber-600 transition-colors"
          >
            View All Fixtures
          </Link>
        </div>
      </div>
    </section>
  )
}
