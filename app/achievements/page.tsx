import Image from "next/image"
import { Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample achievements data
const achievements = [
  {
    id: "vvl-2023",
    title: "VVL State League Championship",
    year: 2023,
    description: "Men's team won gold in the Volleyball Victoria League State League Championship.",
    image: "/placeholder.svg?height=400&width=600&text=VVL+Championship+2023",
    category: "VVL",
  },
  {
    id: "tournament-2023",
    title: "Eastern Regional Tournament",
    year: 2023,
    description: "Women's team secured silver medal at the Eastern Regional Tournament.",
    image: "/placeholder.svg?height=400&width=600&text=Eastern+Regional+2023",
    category: "Tournament",
  },
  {
    id: "award-2023",
    title: "Club of the Year",
    year: 2023,
    description: "Alliance VC recognized as Club of the Year by the Volleyball Victoria Association.",
    image: "/placeholder.svg?height=400&width=600&text=Club+Award+2023",
    category: "Award",
  },
  {
    id: "vvl-2022",
    title: "VVL State League Finals",
    year: 2022,
    description: "Both men's and women's teams reached the VVL State League Finals.",
    image: "/placeholder.svg?height=400&width=600&text=VVL+Finals+2022",
    category: "VVL",
  },
]

// Group achievements by year
const achievementsByYear = achievements.reduce((acc, achievement) => {
  if (!acc[achievement.year]) {
    acc[achievement.year] = []
  }
  acc[achievement.year].push(achievement)
  return acc
}, {})

// Sort years in descending order
const sortedYears = Object.keys(achievementsByYear).sort((a, b) => Number(b) - Number(a))

export default function AchievementsPage() {
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
                        src="/placeholder.svg?height=400&width=600"
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
