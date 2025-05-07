import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { getTeamsByCategory } from "@/lib/teams-data"

export default function TeamsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Teams</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Alliance Volleyball Club fields competitive teams across multiple divisions for men, women, and youth players.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="all">All Teams</TabsTrigger>
          <TabsTrigger value="mens">Men's</TabsTrigger>
          <TabsTrigger value="womens">Women's</TabsTrigger>
          <TabsTrigger value="youth">Youth</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Men's Teams</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTeamsByCategory("mens").map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Women's Teams</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTeamsByCategory("womens").map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Youth Teams</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTeamsByCategory("youth").map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Special Teams</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTeamsByCategory("all")
                .filter(
                  (team) =>
                    !team.name.includes("Men's") && !team.name.includes("Women's") && !team.name.includes("U17"),
                )
                .map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="mens">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getTeamsByCategory("mens").map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="womens">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getTeamsByCategory("womens").map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="youth">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getTeamsByCategory("youth").map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TeamCard({ team }) {
  // Ensure coaches and achievements exist with default values
  const coaches = team.coaches || []
  const achievements = team.achievements || []
  const schedule = team.schedule || "Schedule information not available"

  // Use a fallback image URL directly
  const imageUrl = team.image || "/placeholder.svg?height=600&width=800"

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image src={imageUrl || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">
            Coach: {coaches.length > 0 ? coaches[0].name : "Coach information not available"}
          </p>
          <p className="text-muted-foreground">{team.description || "Team description not available"}</p>
        </div>
        <div>
          <p className="font-medium">Schedule:</p>
          <p className="text-muted-foreground">{schedule}</p>
        </div>
        <div>
          <p className="font-medium">Achievements:</p>
          {achievements.length > 0 ? (
            <ul className="list-disc list-inside text-muted-foreground">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No achievements listed yet</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/teams/${team.slug}`} className="flex items-center justify-center gap-2">
            View Team Details
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
