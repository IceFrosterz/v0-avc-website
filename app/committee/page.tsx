import { Card, CardContent } from "@/components/ui/card"

const committeeMembers = [
  {
    id: 1,
    name: "Paul Wong",
    role: "President",
  },
  {
    id: 2,
    name: "Caleb Lau",
    role: "Vice President",
  },
  {
    id: 3,
    name: "Eileen Zhang",
    role: "Secretary",
  },
  {
    id: 4,
    name: "Chai Shean Ng",
    role: "Treasurer",
  },
  {
    id: 5,
    name: "Winston Yu",
    role: "Assistant Treasurer",
  },
  {
    id: 6,
    name: "Jie Zhou",
    role: "Assistant Treasurer",
  },
  {
    id: 7,
    name: "Vanessa Do",
    role: "Social Media Manager",
  },
  {
    id: 8,
    name: "Nick Bowman",
    role: "General Committee",
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {committeeMembers.map((member) => (
          <Card key={member.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-amber-500 font-medium">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
