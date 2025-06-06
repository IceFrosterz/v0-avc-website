import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample sponsors data
const sponsors = [
  {
    id: "pharmacy-smart",
    name: "Pharmacy Smart & Compounding",
    logo: "/placeholder.svg?height=200&width=200&text=Pharmacy+Smart",
    description: "Providing quality pharmaceutical services and compounding solutions to the community.",
    website: "https://www.pharmacysmart.com",
  },
  {
    id: "knox-physio",
    name: "Knox Physio & Co",
    logo: "/placeholder.svg?height=200&width=200&text=Knox+Physio",
    description: "Specialized physiotherapy services for athletes and the general public.",
    website: "https://www.knoxphysio.com",
  },
]

export default function SponsorsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Sponsors</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Alliance Volleyball Club is proud to be supported by these amazing organizations who help make our club
          thrive.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id} className="overflow-hidden">
            <CardHeader>
              <div className="h-48 relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={200}
                  height={200}
                  className="object-contain max-h-40"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">{sponsor.name}</CardTitle>
              <CardDescription>{sponsor.description}</CardDescription>
            </CardContent>
            {sponsor.website && (
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Become a Sponsor</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Interested in supporting Alliance Volleyball Club? We offer various sponsorship packages that provide
          excellent exposure for your business while supporting local sports.
        </p>
        <Button asChild size="lg">
          <a href="mailto:sponsorship@alliancevc.com">Contact Us About Sponsorship</a>
        </Button>
      </div>
    </div>
  )
}
