import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllTeams, getTeamsByCategory } from "@/app/actions/team-actions"

export default async function TeamsPage() {
  // Fetch all teams from the database
  const allTeams = await getAllTeams()

  // Filter teams by category
  const mensTeams = await getTeamsByCategory("mens")
  const womensTeams = await getTeamsByCategory("womens")
  const youthTeams = await getTeamsByCategory("youth")

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Teams</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Alliance Volleyball Club fields competitive teams across multiple divisions in men's, women's, and youth
          categories.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mens">Men's</TabsTrigger>
          <TabsTrigger value="womens">Women's</TabsTrigger>
          <TabsTrigger value="youth">Youth</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mens">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mensTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="womens">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {womensTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="youth">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youthTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TeamCard({ team }) {
  const isU17Team = team.division === "u17"
  const isJPLMTeam = team.division === "jplm"
  const shouldHideTeamPhoto = isU17Team || isJPLMTeam || !team.has_photos || !team.image

  return (
    <Link href={`/teams/${team.slug}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-lg hover:border-amber-500/50">
        <div className="aspect-video relative">
          {!shouldHideTeamPhoto ? (
            <Image
              src={team.image || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(team.name)}`}
              alt={team.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-amber-500 text-center px-4">{team.name}</h3>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold">{team.name}</h3>
          <p className="text-muted-foreground line-clamp-2 mt-1">
            {team.description || "Team description not available"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
