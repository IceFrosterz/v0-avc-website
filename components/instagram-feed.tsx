import Image from "next/image"
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample Instagram posts data
const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=600",
    likes: 124,
    comments: 8,
    caption: "Match day! Our Men's Reserve 1 team warming up for today's game. #AllianceVC #Volleyball",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=600",
    likes: 98,
    comments: 5,
    caption: "Congratulations to our Women's Reserve 2 team on their victory yesterday! #Champions #AllianceVC",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=600",
    likes: 156,
    comments: 12,
    caption: "New training equipment has arrived! Can't wait for tonight's practice. #VolleyballTraining",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=600",
    likes: 87,
    comments: 4,
    caption: "Team building day at the beach volleyball courts! #TeamSpirit #AllianceVC",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=600&width=600",
    likes: 142,
    comments: 9,
    caption: "Youth training camp starts next week! Limited spots available. #YouthVolleyball #JoinUs",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=600&width=600",
    likes: 113,
    comments: 7,
    caption: "Post-match celebration! Great teamwork today. #AllianceVC #Victory",
  },
]

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Instagram className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-white">@alliancevolleyball.club</h2>
          </div>
          <p className="text-gray-400 text-center max-w-2xl mb-6">
            Follow us on Instagram for the latest photos, videos, and updates from Alliance Volleyball Club.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white"
          >
            <a
              href="https://instagram.com/alliancevolleyball.club"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group relative aspect-square overflow-hidden rounded-md">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-4 mb-3">
                  <div className="flex items-center gap-1 text-white">
                    <Heart className="h-5 w-5 fill-white text-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <p className="text-white text-sm text-center px-4 line-clamp-3">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <a
              href="https://instagram.com/alliancevolleyball.club"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>View more on Instagram</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
