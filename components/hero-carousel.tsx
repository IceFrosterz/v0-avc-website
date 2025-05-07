"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample slider data
const slides = [
  {
    id: 1,
    title: "WELCOME TO ALLIANCE VOLLEYBALL CLUB",
    subtitle: "Your Home for Competitive Volleyball in the Eastern Suburbs",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Black-Mens-FKYvFOYG7dIQDEcLkxJD0igkXNjFqs.jpg",
    cta: {
      primary: {
        text: "Our Teams",
        link: "/teams",
      },
      secondary: {
        text: "Upcoming Matches",
        link: "/fixtures",
      },
    },
  },
  {
    id: 2,
    title: "Competing at the Highest Level",
    subtitle: "Proud Club participating in the Victorian State League",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Black-Womens-tYkkMi3CEdc4OJXcK8IYx3hEej8o2w.jpg",
    cta: {
      primary: {
        text: "Register Now",
        link: "/about#contact",
      },
      secondary: {
        text: "Learn More",
        link: "/teams",
      },
    },
  },
  {
    id: 3,
    title: "Values-Driven, Safety-Focused",
    subtitle: "Guided by Integrity, Respect, and Compassion",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-White-Men-ginRvxAnCbxNRi8yfOQFFqr58FBDVq.jpg",
    cta: {
      primary: {
        text: "About Us",
        link: "/about",
      },
      // Note: This slide doesn't have a secondary CTA
    },
  },
]

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 7000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0 relative h-[80vh]">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                priority
                className="object-cover brightness-50"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="container text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    <span className="text-amber-500">{slide.title.split(" ")[0]}</span>{" "}
                    {slide.title.split(" ").slice(1).join(" ")}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{slide.subtitle}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
                      <Link href={slide.cta.primary.link}>{slide.cta.primary.text}</Link>
                    </Button>
                    {slide.cta.secondary && (
                      <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        <Link href={slide.cta.secondary.link}>{slide.cta.secondary.text}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === selectedIndex ? "bg-amber-500" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
