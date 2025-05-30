"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, ChevronDown, ChevronUp, X, Camera, Calendar, Users } from "lucide-react"

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
        id: "vvl-2024-res-1-qf-1",
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-sbe2FgICvGHaQMoNnCoWkKpI1VfyWb.jpg?height=800&width=1200&text=Warrnambool+Tournament+2024+1",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10", // Added date
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
        id: "vvl-2024-res-1-qf-2",
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-2-DF7AWLO0nka8tQNjgsftv1y2prA4t9.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+2",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10", // Added date
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
        id: "vvl-2024-res-1-qf-3",
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-3-BjCP0p3yMcWJh1enxC3HzFXcCTeIEi.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+3",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10", // Added date
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
        id: "vvl-2024-res-1-qf-4",
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-4-fYngyDUzxYWHyZr11sPpGGNWDa18U0.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+4",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10", // Added date
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
        id: "vvl-2024-res-1-qf-5",
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-5-UTMOh55297NinXx0o3JB7igXSfYsVP.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+5",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10", // Added date
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
    "Australian Club Volleyball Championships": [
      {
        id: "acvc-2024-1",
        title: "Team Photo",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-ACVC-1-sWZYBcG70ND3TZ5ZmaP93X5EaTmVLx.jpeg?height=800&width=1200&text=ACVC+2024+1",
        album: "Australian Club Volleyball Championships",
        year: "2024",
        date: "2024-09-22", // Added date
        tags: {
          team: "Alliance",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "NA",
          instagram: "",
        },
      },
      {
        id: "acvc-2024-2",
        title: "Team Photo",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-ACVC-2-kfVWmIRHKMDCqDAngqlVOnH827sE5B.jpeg?height=800&width=1200&text=ACVC+2024+1",
        album: "Australian Club Volleyball Championships",
        year: "2024",
        date: "2024-09-22", // Added date
        tags: {
          team: "Alliance",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "NA",
          instagram: "",
        },
      },
    ],
  },
  "2025": {
    "Seaside Volleyball Tournament": [
      {
        id: "svt-2025-1",
        title: "After Winning a Point",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%281%29-O42KSDdq5M9F8XXdwQAvKayPArSL5Z.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
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
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%282%29-hiQ4MQq2QeUjjeHuAQf2NonaBu5mKS.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
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
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%283%29-CQDiXpm4GIWKhhhzjQTVoc2N2DlijG.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
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
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%283%29-EOBrOd9QQw4ADyUnU94gKZ4UDjyCyW.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+1",
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
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%281%29-hDyIWvLv12FjG6tLf9q4zABM14JjAz.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+2",
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
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%282%29-NJ4cOZ7ifqgXoefrlnBVSS8FUeuggD.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+3",
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
  const [expandedAlbums, setExpandedAlbums] = useState<Record<string, boolean>>({})

  // Toggle expanded state for an album/date
  const toggleAlbumExpanded = (albumKey: string) => {
    setExpandedAlbums((prev) => ({
      ...prev,
      [albumKey]: !prev[albumKey],
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

  // Generate a unique key for an album/date
  const getAlbumKey = (year: string, album: string, date: string) => {
    return `${year}-${album}-${date}`
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Photo Gallery</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of photos from tournaments, matches, and club events.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-gray-900 to-black p-4 md:p-6 rounded-lg mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">Filter Gallery</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="text-amber-400 border-amber-400 hover:bg-amber-400/20 hover:text-amber-300"
          >
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Year</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
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
            <label className="block text-sm font-medium mb-2 text-gray-200">Team</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
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
            <label className="block text-sm font-medium mb-2 text-gray-200">Competition Type</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
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
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8 bg-gray-900">
          <TabsTrigger
            value="all"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400"
          >
            All Photos
          </TabsTrigger>
          <TabsTrigger
            value="2024"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400"
          >
            2024
          </TabsTrigger>
          <TabsTrigger
            value="2025"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400"
          >
            2025
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-8 md:space-y-12">
            {Object.entries(galleryData).map(([year, yearData]) => (
              <div key={year}>
                <h2 className="text-2xl font-bold mb-4 md:mb-6 border-b border-amber-500/30 pb-2">{year}</h2>
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
                    <div key={album} className="mb-8">
                      <h3 className="text-xl font-semibold mb-3 md:mb-4 flex items-center">
                        <span className="mr-2">{album}</span>
                        <Badge className="bg-amber-500 text-black">{filteredItems.length} photos</Badge>
                      </h3>

                      <div className="space-y-6">
                        {Object.entries(photosByDate).map(([date, photos]) => {
                          const albumKey = getAlbumKey(year, album, date)
                          const isExpanded = expandedAlbums[albumKey]

                          // Get the feature photo (first photo)
                          const featurePhoto = photos[0]

                          return (
                            <div
                              key={date}
                              className="bg-gradient-to-r from-gray-100 to-white rounded-lg overflow-hidden shadow-md"
                            >
                              {/* Date header with photo count */}
                              <div className="bg-gradient-to-r from-gray-200 to-gray-100 p-3 md:p-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-amber-600" />
                                  <h4 className="text-base md:text-lg font-medium text-gray-900">{formatDate(date)}</h4>
                                </div>
                                <Badge className="bg-amber-500 text-black">{photos.length} photos</Badge>
                              </div>

                              {/* Feature photo display */}
                              <div className="p-4">
                                <div
                                  className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-md cursor-pointer mb-4"
                                  onClick={() => setSelectedImage(featurePhoto)}
                                >
                                  <Image
                                    src={featurePhoto.image || "/placeholder.svg"}
                                    alt={featurePhoto.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                                    <h5 className="text-white font-medium text-sm md:text-base">
                                      {featurePhoto.title}
                                    </h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Camera className="h-3 w-3 text-amber-400" />
                                      <span className="text-xs md:text-sm text-gray-300">
                                        {featurePhoto.photographer.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Info and action buttons */}
                                <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
                                  <div className="flex flex-wrap gap-1 md:gap-2">
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                                      <Users className="h-3 w-3 mr-1" />
                                      {featurePhoto.tags.team}
                                    </Badge>
                                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                                      {featurePhoto.tags.competitionType}
                                    </Badge>
                                  </div>

                                  {photos.length > 1 && (
                                    <Button
                                      onClick={() => toggleAlbumExpanded(albumKey)}
                                      variant="outline"
                                      className="text-amber-600 border-amber-600 hover:bg-amber-50"
                                      size="sm"
                                    >
                                      {isExpanded ? (
                                        <>
                                          <ChevronUp className="h-4 w-4 mr-1" />
                                          Hide Photos
                                        </>
                                      ) : (
                                        <>
                                          <ChevronDown className="h-4 w-4 mr-1" />
                                          View All {photos.length} Photos
                                        </>
                                      )}
                                    </Button>
                                  )}
                                </div>

                                {/* Additional photos (shown when expanded) */}
                                {isExpanded && photos.length > 1 && (
                                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {photos.slice(1).map((item) => (
                                      <div
                                        key={item.id}
                                        className="aspect-square relative rounded-md overflow-hidden cursor-pointer shadow-sm transition-transform hover:scale-102"
                                        onClick={() => setSelectedImage(item)}
                                      >
                                        <Image
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.title}
                                          fill
                                          className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Year-specific tabs */}
        {Object.entries(galleryData).map(([year, yearData]) => (
          <TabsContent key={year} value={year}>
            <div className="space-y-8">
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
                    <h3 className="text-xl font-semibold mb-3 md:mb-4 flex items-center">
                      <span className="mr-2">{album}</span>
                      <Badge className="bg-amber-500 text-black">{filteredItems.length} photos</Badge>
                    </h3>

                    <div className="space-y-6">
                      {Object.entries(photosByDate).map(([date, photos]) => {
                        const albumKey = getAlbumKey(year, album, date)
                        const isExpanded = expandedAlbums[albumKey]

                        // Get the feature photo (first photo)
                        const featurePhoto = photos[0]

                        return (
                          <div
                            key={date}
                            className="bg-gradient-to-r from-gray-100 to-white rounded-lg overflow-hidden shadow-md"
                          >
                            {/* Date header with photo count */}
                            <div className="bg-gradient-to-r from-gray-200 to-gray-100 p-3 md:p-4 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-amber-600" />
                                <h4 className="text-base md:text-lg font-medium text-gray-900">{formatDate(date)}</h4>
                              </div>
                              <Badge className="bg-amber-500 text-black">{photos.length} photos</Badge>
                            </div>

                            {/* Feature photo display */}
                            <div className="p-4">
                              <div
                                className="relative aspect-[16/9] w-full rounded-lg overflow-hidden shadow-md cursor-pointer mb-4"
                                onClick={() => setSelectedImage(featurePhoto)}
                              >
                                <Image
                                  src={featurePhoto.image || "/placeholder.svg"}
                                  alt={featurePhoto.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                                  <h5 className="text-white font-medium text-sm md:text-base">{featurePhoto.title}</h5>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Camera className="h-3 w-3 text-amber-400" />
                                    <span className="text-xs md:text-sm text-gray-300">
                                      {featurePhoto.photographer.name}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Info and action buttons */}
                              <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
                                <div className="flex flex-wrap gap-1 md:gap-2">
                                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                                    <Users className="h-3 w-3 mr-1" />
                                    {featurePhoto.tags.team}
                                  </Badge>
                                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                                    {featurePhoto.tags.competitionType}
                                  </Badge>
                                </div>

                                {photos.length > 1 && (
                                  <Button
                                    onClick={() => toggleAlbumExpanded(albumKey)}
                                    variant="outline"
                                    className="text-amber-600 border-amber-600 hover:bg-amber-50"
                                    size="sm"
                                  >
                                    {isExpanded ? (
                                      <>
                                        <ChevronUp className="h-4 w-4 mr-1" />
                                        Hide Photos
                                      </>
                                    ) : (
                                      <>
                                        <ChevronDown className="h-4 w-4 mr-1" />
                                        View All {photos.length} Photos
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>

                              {/* Additional photos (shown when expanded) */}
                              {isExpanded && photos.length > 1 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                  {photos.slice(1).map((item) => (
                                    <div
                                      key={item.id}
                                      className="aspect-square relative rounded-md overflow-hidden cursor-pointer shadow-sm transition-transform hover:scale-102"
                                      onClick={() => setSelectedImage(item)}
                                    >
                                      <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
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
          <DialogContent className="max-w-4xl p-1 md:p-6">
            <button
              className="absolute right-2 top-2 md:right-4 md:top-4 rounded-full bg-black/70 p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4 text-white" />
              <span className="sr-only">Close</span>
            </button>
            <div className="relative aspect-[4/3] w-full bg-black rounded-lg overflow-hidden">
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg md:text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{formatDate(selectedImage.date)}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-amber-500 text-black">{selectedImage.tags.team}</Badge>
                <Badge className="bg-blue-500 text-white">{selectedImage.year}</Badge>
                <Badge className="bg-green-500 text-black">{selectedImage.tags.competitionType}</Badge>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span>Photo by: {selectedImage.photographer.name}</span>
                {selectedImage.photographer.instagram && (
                  <a
                    href={`https://instagram.com/${selectedImage.photographer.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-amber-500 hover:text-amber-400"
                  >
                    <Instagram className="h-3 w-3 md:h-4 md:w-4" />@{selectedImage.photographer.instagram}
                  </a>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* No Results Message */}
      {getFilteredItems().length === 0 && (
        <div className="text-center py-10 md:py-12 bg-gray-100 rounded-lg">
          <p className="text-muted-foreground mb-4">No gallery items match your filters.</p>
          <Button
            variant="outline"
            onClick={resetFilters}
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
