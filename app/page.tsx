import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Users, Heart, Shield, Star } from "lucide-react"
import HeroCarousel from "@/components/hero-carousel"
import InstagramFeed from "@/components/instagram-feed"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Mission Statement */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-lg text-gray-400 mb-8">
              Alliance Volleyball Club is dedicated to developing skilled, confident athletes through quality coaching
              and competitive play. We foster a supportive community that values teamwork, sportsmanship, and personal
              growth both on and off the court.
            </p>
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Fixed with correct icons */}
      <section className="py-16 bg-gray-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Alliance VC</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Passion</h3>
              <p className="text-gray-400">
                We believe in fostering a deep love for the game of volleyball. Our passion drives us to continually
                improve and excel in everything we do.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Excellence</h3>
              <p className="text-gray-400">
                We strive for excellence in all aspects of our club, from coaching and player development to
                organization and communication.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Community</h3>
              <p className="text-gray-400">
                We're more than just teams; we're a community. We value the relationships built through volleyball and
                the support we provide to one another.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Child Safety</h3>
              <p className="text-gray-400">
                We uphold strict child safety practices. All staff have Working with Children Checks to ensure every
                child's experience is safe, positive, and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Matches Preview */}
      <section className="py-16 bg-black text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Upcoming Matches</h2>
            <Button asChild variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
              <Link href="/fixtures" className="flex items-center gap-2">
                View All Fixtures <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((match) => (
              <div key={match} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-500 font-medium">Men's Reserve 1</span>
                  <span className="bg-gray-800 text-xs px-2 py-1 rounded">Home</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Alliance VC vs Rival Spikers</h3>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>May 15, 2025 • 7:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>Alliance Sports Center</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold mb-4 md:mb-0 text-white">From Our Gallery</h2>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
              <Link href="/gallery" className="flex items-center gap-2">
                View Full Gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
              <div key={img} className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src={`/placeholder.svg?height=400&width=400`}
                  alt={`Gallery image ${img}`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Join Alliance VC?</h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking to compete at the highest level or just want to improve your skills, we have a place
            for you in our volleyball family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white">
              <Link href="/teams">Join a Team</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-black text-black hover:bg-black/10">
              <Link href="/about#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
