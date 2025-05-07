import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Linkedin } from "lucide-react"

// Sample committee data
const committeeMembers = [
  {
    id: 1,
    name: "James Wilson",
    role: "Chairperson",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Former national team player with over 20 years of volleyball experience. James has been leading Alliance VC since its founding in 2015.",
    contact: {
      email: "james.wilson@alliancevc.com",
      phone: "+1 (123) 456-7890",
      linkedin: "jameswilson",
    },
  },
  {
    id: 2,
    name: "Emma Thompson",
    role: "Vice Chairperson",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Emma brings her experience as a former professional player and coach to help guide the strategic direction of the club.",
    contact: {
      email: "emma.thompson@alliancevc.com",
      phone: "+1 (123) 456-7891",
      linkedin: "emmathompson",
    },
  },
  {
    id: 3,
    name: "Robert Davis",
    role: "Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "With a background in finance and a passion for volleyball, Robert ensures the club's financial health and sustainability.",
    contact: {
      email: "robert.davis@alliancevc.com",
      phone: "+1 (123) 456-7892",
      linkedin: "robertdavis",
    },
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Secretary",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Sarah handles all administrative aspects of the club, ensuring smooth operations and effective communication.",
    contact: {
      email: "sarah.johnson@alliancevc.com",
      phone: "+1 (123) 456-7893",
      linkedin: "sarahjohnson",
    },
  },
  {
    id: 5,
    name: "Michael Brown",
    role: "Head Coach Representative",
    image: "/placeholder.svg?height=400&width=400",
    bio: "As the representative for all coaches, Michael ensures that coaching standards remain high across all teams.",
    contact: {
      email: "michael.brown@alliancevc.com",
      phone: "+1 (123) 456-7894",
      linkedin: "michaelbrown",
    },
  },
  {
    id: 6,
    name: "Jennifer Lee",
    role: "Events Coordinator",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Jennifer organizes all club events, tournaments, and social gatherings, creating a strong community atmosphere.",
    contact: {
      email: "jennifer.lee@alliancevc.com",
      phone: "+1 (123) 456-7895",
      linkedin: "jenniferlee",
    },
  },
  {
    id: 7,
    name: "David Martinez",
    role: "Youth Development Officer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "David oversees all youth programs, ensuring that young players receive the best possible volleyball education.",
    contact: {
      email: "david.martinez@alliancevc.com",
      phone: "+1 (123) 456-7896",
      linkedin: "davidmartinez",
    },
  },
  {
    id: 8,
    name: "Lisa Taylor",
    role: "Sponsorship Manager",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Lisa builds and maintains relationships with sponsors and partners, securing financial support for the club.",
    contact: {
      email: "lisa.taylor@alliancevc.com",
      phone: "+1 (123) 456-7897",
      linkedin: "lisataylor",
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
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
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
