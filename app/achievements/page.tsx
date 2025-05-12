import Image from "next/image"
import { Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample achievements data
const achievements = [
  {
    id: "vvl-2024-1",
    title: "VVL Champions - Reserve Men's 2",
    year: 2024,
    description: "Men's team won gold in the Volleyball Victoria League State League 2 Men.",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-2024-j3IVMZgsXHmD87RVU6RVAMwK8Ks21N.jpg?height=400&width=600&text=VVL+2024+1",
    category: "VVL",
  },
  {
    id: "vvl-2024-2",
    title: "VVL Runner's Up - Reserve Men's 2",
    year: 2024,
    description: "Men's team won silver in the Volleyball Victoria League State League 2 Men.",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-Runners-Up-2024-UU1YYusQoCz7RvqQpgKnlpPHtQ1C50.jpg?height=400&width=600&text=VVL+2024+1",
    category: "VVL",
  },
  {
    id: "vvl-2024-3",
    title: "VVL Runner's Up - Reserve Men's 3",
    year: 2024,
    description: "Men's team won silver in the Volleyball Victoria League State League 3 Men.",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-3-Runners-Up-7DNyzwCuRDoTcajn0B9PFxHbd1i1LZ.jpeg?height=400&width=600&text=VVL+2024+2",
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
                        src={achievement.image}
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
