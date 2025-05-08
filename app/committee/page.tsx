import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Linkedin } from "lucide-react"

// Sample committee data
const committeeMembers = [
  {
    id: 1,
    name: "Paul Wong",
    role: "President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Paul leads the strategic direction and overall governance of the club, fostering a culture of excellence and inclusivity.",
    contact: {
      email: "paul.wong@alliancevc.com",
      phone: "+1 (123) 456-7890",
      linkedin: "paulwong",
    },
  },
  {
    id: 2,
    name: "Caleb Lau",
    role: "Vice President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Caleb supports the President and helps oversee the operations and long-term planning of the club.",
    contact: {
      email: "caleb.lau@alliancevc.com",
      phone: "+1 (123) 456-7891",
      linkedin: "caleblau",
    },
  },
  {
    id: 3,
    name: "Eileen Zhang",
    role: "Secretary",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Eileen manages all club documentation and ensures efficient communication within the committee and members.",
    contact: {
      email: "eileen.zhang@alliancevc.com",
      phone: "+1 (123) 456-7892",
      linkedin: "eileenzhang",
    },
  },
  {
    id: 4,
    name: "Chai Shean Ng",
    role: "Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Chai Shean is responsible for managing the club's finances, ensuring transparency and financial health.",
    contact: {
      email: "chaishean.ng@alliancevc.com",
      phone: "+1 (123) 456-7893",
      linkedin: "chaisheanng",
    },
  },
  {
    id: 5,
    name: "Winston Yu",
    role: "Assistant Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Winston assists in overseeing financial records and supports the Treasurer in all fiscal responsibilities.",
    contact: {
      email: "winston.yu@alliancevc.com",
      phone: "+1 (123) 456-7894",
      linkedin: "winstonyu",
    },
  },
  {
    id: 6,
    name: "Jie Zhou",
    role: "Assistant Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Jie supports the treasury team and ensures financial processes are accurately maintained.",
    contact: {
      email: "jie.zhou@alliancevc.com",
      phone: "+1 (123) 456-7895",
      linkedin: "jiezhou",
    },
  },
  {
    id: 7,
    name: "Vanessa Do",
    role: "Social Media Manager",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Vanessa handles all club-related digital communications and builds our presence across social platforms.",
    contact: {
      email: "vanessa.do@alliancevc.com",
      phone: "+1 (123) 456-7896",
      linkedin: "vanessado",
    },
  },
  {
    id: 8,
    name: "Nick Bowman",
    role: "General Committee",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Nick contributes to the overall functioning of the committee and supports a variety of club initiatives.",
    contact: {
      email: "nick.bowman@alliancevc.com",
      phone: "+1 (123) 456-7897",
      linkedin: "nickbowman",
    },
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
              <Image src="/placeholder.svg?height=400&width=400" alt={member.name} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{member.name}</CardTitle>
              <p className="text-amber-500 font-medium">{member.role}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{member.bio}</p>
              <div className="space-y-2">
                <a
                  href={`mailto:${member.contact.email}`}
                  className="flex items-center gap-2 text-sm hover:text-amber-500"
                >
                  <Mail className="h-4 w-4" />
                  {member.contact.email}
                </a>
                <a
                  href={`tel:${member.contact.phone}`}
                  className="flex items-center gap-2 text-sm hover:text-amber-500"
                >
                  <Phone className="h-4 w-4" />
                  {member.contact.phone}
                </a>
                <a
                  href={`https://linkedin.com/in/${member.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-amber-500"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
