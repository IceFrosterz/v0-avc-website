import Image from "next/image"
import { Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { achievements } from "@/lib/data"

export default function AchievementsPage() {
  // Group achievements by year and sort in descending order
  const achievementsByYear = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.year]) {
      acc[achievement.year] = []
    }
    acc[achievement.year].push(achievement)
    return acc
  }, {})

  const sortedYears = Object.keys(achievementsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AVC Achievements</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of Alliance Volleyball Club's accomplishments, victories, and milestones throughout the years.
        </p>
      </div>

      <div className="space-y-16">
        {sortedYears.map((year) => (
          <div key={year} className="space-y-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-amber-500" />
              <h2 className="text-3xl font-bold">{year}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {achievementsByYear[year].map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  {achievement.image && (
                    <div className="aspect-video relative">
                      <Image
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{achievement.title}</CardTitle>
                      <Badge
                        className={
                          achievement.category === "VVL"
                            ? "bg-amber-500 text-black"
                            : achievement.category === "Tournament"
                              ? "bg-slate-500"
                              : "bg-emerald-500 text-black"
                        }
                      >
                        {achievement.category}
                      </Badge>
                    </div>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
