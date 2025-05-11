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
            <Button asChild size="lg" variant="outline" className="border-black text-yellow hover:bg-black/10">
              <Link href="/about#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
