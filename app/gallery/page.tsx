"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, ChevronDown, ChevronUp, X } from "lucide-react"

// Define the gallery data structure
type GalleryItem = {
  id: string
  title: string
  image: string
  album: string
  year: string
  date: string // Added date field for grouping by day
  tags: {
    team: string
    competitionType: string
  }
  photographer: {
    name: string
    instagram?: string
  }
}

// Sample gallery data organized by year and album
const galleryData: Record<string, Record<string, GalleryItem[]>> = {
  "2024": {
    "Volleyball Victoria League": [
      {
        id: "vvl-2024-1",
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-sbe2FgICvGHaQMoNnCoWkKpI1VfyWb.jpg?height=800&width=1200&text=Warrnambool+Tournament+2024+1",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-12", // Added date
        tags: {
          team: "Alliance Gold SL1M",
          competitionType: "State League",
        },
        photographer: {
          name: "Issac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        id: "vvl-2024-2",
        title: "Alliance Black competing in Week 13",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-3-Black-2024-3RfMwn7WtXDQ7VF8fSeYOwYrjEqwPq.jpg?height=800&width=1200&text=Warrnambool+Tournament+2024+2",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-07-06", // Same date as previous photo
        tags: {
          team: "Alliance Black SL3M",
          competitionType: "State League",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
    ],
  },
  "2025": {
    "Seaside Volleyball Tournament": [
      {
        id: "svt-2025-1",
        title: "After Winning a Point",
        image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%281%29-O42KSDdq5M9F8XXdwQAvKayPArSL5Z.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
        album: "Seaside Volleyball Tournament",
        year: "2025",
        date: "2025-03-09", // Added date
        tags: {
          team: "Tournament Team",
          competitionType: "Tournament",
        },
        photographer: {
          name: "Mike Johnson",
          instagram: "mikejphoto",
        },
      },
      {
        id: "svt-2025-2",
        title: "Group Photo",
        image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%282%29-hiQ4MQq2QeUjjeHuAQf2NonaBu5mKS.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
        album: "Seaside Volleyball Tournament",
        year: "2025",
        date: "2025-03-09", // Added date
        tags: {
          team: "Tournament Team",
          competitionType: "Tournament",
        },
        photographer: {
          name: "Mike Johnson",
          instagram: "mikejphoto",
        },
      },
      {
        id: "svt-2025-3",
        title: "Supporting each other!",
        image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%283%29-CQDiXpm4GIWKhhhzjQTVoc2N2DlijG.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
        album: "Seaside Volleyball Tournament",
        year: "2025",
        date: "2025-03-09", // Added date
        tags: {
          team: "Tournament Team",
          competitionType: "Tournament",
        },
        photographer: {
          name: "Mike Johnson",
          instagram: "mikejphoto",
        },
      },
    ],
    "Ballarat Tournament": [
      {
        id: "bt-2025-1",
        title: "One-handed Set",
        image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%283%29-EOBrOd9QQw4ADyUnU94gKZ4UDjyCyW.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+1",
        album: "Ballarat Tournament",
        year: "2025",
        date: "2025-03-22", // Added date
        tags: {
          team: "Alliance Gold SL3M",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        id: "bt-2025-2",
        title: "Team Cheering",
        image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%281%29-hDyIWvLv12FjG6tLf9q4zABM14JjAz.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+2",
        album: "Ballarat Tournament",
        year: "2025",
        date: "2025-03-22", // Added date
        tags: {
          team: "Alliance Gold SL3M",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        id: "bt-2025-3",
        title: "Winning a Point",
        image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%282%29-NJ4cOZ7ifqgXoefrlnBVSS8FUeuggD.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+3",
        album: "Ballarat Tournament",
        year: "2025",
        date: "2025-03-22", // Added date
        tags: {
          team: "Alliance Gold SL3M",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
    ],
  },
}

// Get all unique teams and competition types for filters
const allTeams = Array.from(
  new Set(
    Object.values(galleryData)
      .flatMap((yearData) => Object.values(yearData))
      .flatMap((albumData) => albumData.map((item) => item.tags.team)),
  ),
)

const allCompetitionTypes = Array.from(
  new Set(
    Object.values(galleryData)
      .flatMap((yearData) => Object.values(yearData))
      .flatMap((albumData) => albumData.map((item) => item.tags.competitionType)),
  ),
)

// Group photos by date
const groupPhotosByDate = (photos: GalleryItem[]) => {
  const groupedPhotos: Record<string, GalleryItem[]> = {}

  photos.forEach((photo) => {
    if (!groupedPhotos[photo.date]) {
      groupedPhotos[photo.date] = []
    }
    groupedPhotos[photo.date].push(photo)
  })

  return groupedPhotos
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filters, setFilters] = useState({
    year: "all",
    team: "all",
    competitionType: "all",
  })
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({})

  // Toggle expanded state for a date
  const toggleDateExpanded = (date: string) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }))
  }

  // Filter gallery items based on selected filters
  const getFilteredItems = () => {
    const filteredItems: GalleryItem[] = []

    // Collect all items
    Object.entries(galleryData).forEach(([year, yearData]) => {
      if (filters.year === "all" || filters.year === year) {
        Object.values(yearData).forEach((albumItems) => {
          albumItems.forEach((item) => {
            if (
              (filters.team === "all" || item.tags.team === filters.team) &&
              (filters.competitionType === "all" || item.tags.competitionType === filters.competitionType)
            ) {
              filteredItems.push(item)
            }
          })
        })
      }
    })

    return filteredItems
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      year: "all",
      team: "all",
      competitionType: "all",
    })
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of photos from tournaments, matches, and social events.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">Filter Gallery</h2>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="all">All Years</option>
              {Object.keys(galleryData).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Team</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
              value={filters.team}
              onChange={(e) => setFilters({ ...filters, team: e.target.value })}
            >
              <option value="all">All Teams</option>
              {allTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Competition Type</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
              value={filters.competitionType}
              onChange={(e) => setFilters({ ...filters, competitionType: e.target.value })}
            >
              <option value="all">All Types</option>
              {allCompetitionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All Photos</TabsTrigger>
          <TabsTrigger value="2024">2024</TabsTrigger>
          <TabsTrigger value="2025">2025</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-12">
            {Object.entries(galleryData).map(([year, yearData]) => (
              <div key={year}>
                <h2 className="text-2xl font-bold mb-6">{year}</h2>
                {Object.entries(yearData).map(([album, items]) => {
                  const filteredItems = items.filter(
                    (item) =>
                      (filters.team === "all" || item.tags.team === filters.team) &&
                      (filters.competitionType === "all" || item.tags.competitionType === filters.competitionType),
                  )

                  if (filteredItems.length === 0) return null

                  // Group photos by date
                  const photosByDate = groupPhotosByDate(filteredItems)

                  return (
                    <div key={album} className="mb-10">
                      <h3 className="text-xl font-semibold mb-4">{album}</h3>

                      {/* Display photos grouped by date */}
                      {Object.entries(photosByDate).map(([date, photos]) => (
                        <div key={date} className="mb-8">
                          <div
                            className="flex items-center gap-2 mb-4 cursor-pointer"
                            onClick={() => toggleDateExpanded(date)}
                          >
                            <h4 className="text-lg font-medium">{formatDate(date)}</h4>
                            <Badge className="bg-amber-500 text-black">{photos.length} photos</Badge>
                            {expandedDates[date] ? (
                              <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {/* Always show first 4 photos */}
                            {photos.slice(0, 4).map((item) => (
                              <GalleryCard key={item.id} item={item} onClick={() => setSelectedImage(item)} />
                            ))}

                            {/* Show remaining photos if expanded */}
                            {expandedDates[date] && photos.length > 4 && (
                              <>
                                {photos.slice(4).map((item) => (
                                  <GalleryCard key={item.id} item={item} onClick={() => setSelectedImage(item)} />
                                ))}
                              </>
                            )}
                          </div>

                          {/* Show "View More" button if there are more than 4 photos */}
                          {photos.length > 4 && !expandedDates[date] && (
                            <div className="mt-4 text-center">
                              <Button
                                variant="outline"
                                onClick={() => toggleDateExpanded(date)}
                                className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
                              >
                                View {photos.length - 4} More Photos
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          {/* Show "Show Less" button if expanded */}
                          {expandedDates[date] && photos.length > 4 && (
                            <div className="mt-4 text-center">
                              <Button
                                variant="outline"
                                onClick={() => toggleDateExpanded(date)}
                                className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
                              >
                                Show Less
                                <ChevronUp className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </TabsContent>

        {Object.entries(galleryData).map(([year, yearData]) => (
          <TabsContent key={year} value={year}>
            <div className="space-y-10">
              {Object.entries(yearData).map(([album, items]) => {
                const filteredItems = items.filter(
                  (item) =>
                    (filters.team === "all" || item.tags.team === filters.team) &&
                    (filters.competitionType === "all" || item.tags.competitionType === filters.competitionType),
                )

                if (filteredItems.length === 0) return null

                // Group photos by date
                const photosByDate = groupPhotosByDate(filteredItems)

                return (
                  <div key={album}>
                    <h3 className="text-xl font-semibold mb-4">{album}</h3>

                    {/* Display photos grouped by date */}
                    {Object.entries(photosByDate).map(([date, photos]) => (
                      <div key={date} className="mb-8">
                        <div
                          className="flex items-center gap-2 mb-4 cursor-pointer"
                          onClick={() => toggleDateExpanded(date)}
                        >
                          <h4 className="text-lg font-medium">{formatDate(date)}</h4>
                          <Badge className="bg-amber-500 text-black">{photos.length} photos</Badge>
                          {expandedDates[date] ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {/* Always show first 4 photos */}
                          {photos.slice(0, 4).map((item) => (
                            <GalleryCard key={item.id} item={item} onClick={() => setSelectedImage(item)} />
                          ))}

                          {/* Show remaining photos if expanded */}
                          {expandedDates[date] && photos.length > 4 && (
                            <>
                              {photos.slice(4).map((item) => (
                                <GalleryCard key={item.id} item={item} onClick={() => setSelectedImage(item)} />
                              ))}
                            </>
                          )}
                        </div>

                        {/* Show "View More" button if there are more than 4 photos */}
                        {photos.length > 4 && !expandedDates[date] && (
                          <div className="mt-4 text-center">
                            <Button
                              variant="outline"
                              onClick={() => toggleDateExpanded(date)}
                              className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
                            >
                              View {photos.length - 4} More Photos
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        {/* Show "Show Less" button if expanded */}
                        {expandedDates[date] && photos.length > 4 && (
                          <div className="mt-4 text-center">
                            <Button
                              variant="outline"
                              onClick={() => toggleDateExpanded(date)}
                              className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
                            >
                              Show Less
                              <ChevronUp className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Image Lightbox */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{formatDate(selectedImage.date)}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-amber-500 text-black">{selectedImage.tags.team}</Badge>
                <Badge className="bg-blue-500 text-white">{selectedImage.year}</Badge>
                <Badge className="bg-green-500 text-black">{selectedImage.tags.competitionType}</Badge>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Photo by: {selectedImage.photographer.name}</span>
                {selectedImage.photographer.instagram && (
                  <a
                    href={`https://instagram.com/${selectedImage.photographer.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-amber-500 hover:text-amber-400"
                  >
                    <Instagram className="h-4 w-4" />@{selectedImage.photographer.instagram}
                  </a>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* No Results Message */}
      {getFilteredItems().length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No gallery items match your filters.</p>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

function GalleryCard({ item, onClick }) {
  return (
    <div className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group" onClick={onClick}>
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-medium">{item.title}</h3>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="bg-amber-500/30 border-amber-500/50">
            {item.tags.team}
          </Badge>
          <Badge variant="outline" className="bg-green-500/30 border-green-500/50">
            {item.tags.competitionType}
          </Badge>
        </div>
        <div className="mt-2 text-xs text-gray-300">Photo by: {item.photographer.name}</div>
      </div>
    </div>
  )
}
