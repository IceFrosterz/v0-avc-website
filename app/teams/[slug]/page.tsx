import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getTeamBySlug, getTeamPlayers, getTeamCoaches } from "@/app/actions/team-actions"

function PlayerCard({ player, teamSlug }) {
  // Check if this is a U17 team or JPLM team
  const isU17Team = teamSlug?.includes("u17")
  const isJPLMTeam = teamSlug?.includes("jplm")
  const shouldHidePhotos = isU17Team || isJPLMTeam || !player.photo

  if (shouldHidePhotos) {
    return (
      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {player.name}
              {player.is_captain && <Trophy className="h-4 w-4 text-amber-500" />}
            </h3>
            <div className="bg-amber-500 text-black text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {player.number}
            </div>
          </div>
          <p className="text-muted-foreground mt-1">{player.position || "Position not specified"}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800">
      <div className="aspect-[3/4] relative">
        <Image
          src={player.photo || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(player.name)}`}
          alt={player.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
          {player.number}
        </div>
        {player.is_captain && (
          <div className="absolute top-2 left-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded">
            CAPTAIN
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          {player.name}
          {player.is_captain && <Trophy className="h-4 w-4 text-amber-500" />}
        </h3>
        <p className="text-muted-foreground">{player.position || "Position not specified"}</p>
      </CardContent>
    </Card>
  )
}

function CoachCard({ coach, isJPLMTeam }) {
  if (isJPLMTeam || !coach.photo) {
    return (
      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <h3 className="font-bold text-lg">{coach.name}</h3>
          <Badge className="bg-amber-500 text-black mb-2">{coach.role}</Badge>
          {coach.bio && <p className="text-muted-foreground text-sm mt-2">{coach.bio}</p>}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800">
      <div className="aspect-square relative">
        <Image
          src={coach.photo || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(coach.name)}`}
          alt={coach.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{coach.name}</h3>
        <Badge className="bg-amber-500 text-black mb-2">{coach.role}</Badge>
        {coach.bio && <p className="text-muted-foreground text-sm mt-2">{coach.bio}</p>}
      </CardContent>
    </Card>
  )
}

export default async function TeamPage({ params }: { params: { slug: string } }) {
  const team = await getTeamBySlug(params.slug)
  const { slug } = params

  if (!team) {
    notFound()
  }

  // Fetch players and coaches from the database
  const players = await getTeamPlayers(team.id)
  const coaches = await getTeamCoaches(team.id)

  const isU17Team = team.division === "u17"
  const isJPLMTeam = team.division === "jplm"
  const shouldHideTeamPhoto = isU17Team || isJPLMTeam || !team.has_photos || !team.image

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/teams" className="flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-4">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Teams</span>
        </Link>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {!shouldHideTeamPhoto && (
            <div className="w-full md:w-1/3 lg:w-1/4 relative aspect-video md:aspect-square rounded-lg overflow-hidden">
              <Image
                src={team.image || `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(team.name)}`}
                alt={team.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{team.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{team.description || "Team description not available"}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="players" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="coaches">Coaches</TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          <h2 className="text-2xl font-semibold mb-6">Team Roster</h2>
          {players.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} teamSlug={params.slug} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No players listed yet.</p>
          )}
        </TabsContent>

        <TabsContent value="coaches">
          <h2 className="text-2xl font-semibold mb-6">Coaching Staff</h2>
          {coaches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {coaches.map((coach) => (
                <CoachCard key={coach.id} coach={coach} isJPLMTeam={isJPLMTeam} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No coaches listed yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
