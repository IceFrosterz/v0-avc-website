import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-sbe2FgICvGHaQMoNnCoWkKpI1VfyWb.jpg?height=1200&width=1800"
            alt="Volleyball team"
            fill
            priority
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Alliance Volleyball Club</h1>
          <p className="text-xl max-w-3xl mx-auto">Developing excellence in volleyball and character since 2024</p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our History</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Alliance Volleyball Club was founded in 2024 in the eastern suburbs of Victoria by a group of
                  dedicated players and coaches, united by a shared passion for the sport and a vision to grow a strong,
                  values-driven volleyball community.
                </p>
                <p>
                  In just a short time, we've established ourselves as a competitive force in the region, proudly
                  competing in the Victorian State League and fielding teams across various age groups and divisions.
                </p>
                <p>
                  Our club is built on Christian values, and we're committed to fostering an environment that
                  prioritizes integrity, respect, compassion, and child safety—on and off the court.
                </p>
                <p>
                  Guided by our leadership team, including President Paul Wong and a dedicated committee, Alliance VC
                  continues to grow while staying true to our mission of excellence, development, and community.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-QF-2024-9plVKMAHsKoDaFcAVFIeFJjKvvMrgq.jpg?height=800&width=600" alt="Club history" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">P</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-white">Passion</h3>
                <p className="text-center text-muted-foreground">
                  We believe in fostering a deep love for the game of volleyball. Our passion drives us to continually
                  improve and excel in everything we do.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">E</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-white">Excellence</h3>
                <p className="text-center text-muted-foreground">
                  We strive for excellence in all aspects of our club, from coaching and player development to
                  organization and communication.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">C</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-white">Community</h3>
                <p className="text-center text-muted-foreground">
                  We're more than just teams; we're a community. We value the relationships built through volleyball and
                  the support we provide to one another.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Grounds Section */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Training Grounds</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-white">
              <p className="mb-6 text-gray-400">
                Alliance Volleyball Club trains at various locations across Melbourne's eastern suburbs, providing
                convenient access for all our members:
              </p>
              <ul className="space-y-4 mb-6 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full p-1 mt-1"></span>
                  <span>Mullum Mullum Stadium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full p-1 mt-1"></span>
                  <span>Mount Waverley Secondary College (Junior Campus)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full p-1 mt-1"></span>
                  <span>Templestowe College</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full p-1 mt-1"></span>
                  <span>Nunawading Christian College</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 rounded-full p-1 mt-1"></span>
                  <span>Ringwood Sports Centre</span>
                </li>
              </ul>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Contact Us For Training Times</Button>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Mullum+Mullum"
                  alt="Mullum Mullum Stadium"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Mt+Waverley"
                  alt="Mount Waverley Secondary College"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Templestowe"
                  alt="Templestowe College"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Ringwood"
                  alt="Ringwood Sports Centre"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-amber-500">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:info@alliancevc.com" className="text-gray-300 hover:text-amber-500">
                      info@alliancevc.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-amber-500">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <p className="text-lg font-medium">Interactive Map Would Be Embedded Here</p>
        </div>
      </section>
    </div>
  )
}
