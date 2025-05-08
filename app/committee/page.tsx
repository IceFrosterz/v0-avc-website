import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const committeeMembers = [
  {
    id: 1,
    name: "Paul Wong",
    role: "President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Paul leads the strategic direction and overall governance of the club, fostering a culture of excellence and inclusivity.",
  },
  {
    id: 2,
    name: "Caleb Lau",
    role: "Vice President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Caleb supports the President and helps oversee the operations and long-term planning of the club.",
  },
  {
    id: 3,
    name: "Eileen Zhang",
    role: "Secretary",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Eileen manages all club documentation and ensures efficient communication within the committee and members.",
  },
  {
    id: 4,
    name: "Chai Shean Ng",
    role: "Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Chai Shean is responsible for managing the club’s finances, ensuring transparency and financial health.",
  },
  {
    id: 5,
    name: "Winston Yu",
    role: "Assistant Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Winston assists in overseeing financial records and supports the Treasurer in all fiscal responsibilities.",
  },
  {
    id: 6,
    name: "Jie Zhou",
    role: "Assistant Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Jie supports the treasury team and ensures financial processes are accurately maintained.",
  },
  {
    id: 7,
    name: "Vanessa Do",
    role: "Social Media Manager",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Vanessa handles all club-related digital communications and builds our presence across social platforms.",
  },
  {
    id: 8,
    name: "Nick Bowman",
    role: "General Committee",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Nick contributes to the overall functioning of the committee and supports a variety of club initiatives.",
  },
]

export default function CommitteePage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Committee</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet the dedicated individuals who work behind the scenes to make Alliance Volleyball Club a success.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {committeeMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden bg-gray-900 border-gray-800">
            <div className="aspect-square relative">
              <Image src={member.image} alt={member.name} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{member.name}</CardTitle>
              <p className="text-amber-500 font-medium">{member.role}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
