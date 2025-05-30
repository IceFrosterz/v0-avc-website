"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, X, Camera, Calendar, Users, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

// Define the gallery data structure
type GalleryItem = {
  id: string
  title: string
  image: string
  album: string
  year: string
  date: string
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
        date: "2024-08-10",
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
        date: "2024-08-10",
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
        date: "2024-08-10",
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
        date: "2024-08-10",
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
        date: "2024-08-10",
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
        date: "2024-07-06",
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
        date: "2024-09-22",
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
        date: "2024-09-22",
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
        date: "2025-03-09",
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
        date: "2025-03-09",
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
        date: "2025-03-09",
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
        date: "2025-03-22",
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
        date: "2025-03-22",
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
        date: "2025-03-22",
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

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<{ album: string; year: string; photos: GalleryItem[] } | null>(
    null,
  )
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [filters, setFilters] = useState({
    year: "all",
    team: "all",
    competitionType: "all",
  })

  // Get filtered albums
  const getFilteredAlbums = () => {
    const albums: Array<{ album: string; year: string; photos: GalleryItem[]; coverPhoto: GalleryItem }> = []

    Object.entries(galleryData).forEach(([year, yearData]) => {
      if (filters.year === "all" || filters.year === year) {
        Object.entries(yearData).forEach(([album, photos]) => {
          const filteredPhotos = photos.filter(
            (item) =>
              (filters.team === "all" || item.tags.team === filters.team) &&
              (filters.competitionType === "all" || item.tags.competitionType === filters.competitionType),
          )

          if (filteredPhotos.length > 0) {
            albums.push({
              album,
              year,
              photos: filteredPhotos,
              coverPhoto: filteredPhotos[0],
            })
          }
        })
      }
    })

    return albums
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

  // Navigate photos in album explorer
  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedAlbum) return

    if (direction === "prev") {
      setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : selectedAlbum.photos.length - 1))
    } else {
      setCurrentPhotoIndex((prev) => (prev < selectedAlbum.photos.length - 1 ? prev + 1 : 0))
    }
  }

  return (
    <div className="container py-6 md:py-12">
      <div className="text-center mb-6 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Photo Gallery</h1>
        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of photos from tournaments, matches, and club events.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-gray-900 to-black p-4 md:p-6 rounded-lg mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">Filter Albums</h2>
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
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white text-sm"
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
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white text-sm"
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
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white text-sm"
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

      {/* Album Thumbnails */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6 md:mb-8 bg-gray-900">
          <TabsTrigger
            value="all"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400 text-sm"
          >
            All Albums
          </TabsTrigger>
          <TabsTrigger
            value="2024"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400 text-sm"
          >
            2024
          </TabsTrigger>
          <TabsTrigger
            value="2025"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400 text-sm"
          >
            2025
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {getFilteredAlbums().map(({ album, year, photos, coverPhoto }) => (
              <AlbumThumbnail
                key={`${year}-${album}`}
                album={album}
                year={year}
                photos={photos}
                coverPhoto={coverPhoto}
                onClick={() => {
                  setSelectedAlbum({ album, year, photos })
                  setCurrentPhotoIndex(0)
                }}
              />
            ))}
          </div>
        </TabsContent>

        {Object.keys(galleryData).map((year) => (
          <TabsContent key={year} value={year}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {getFilteredAlbums()
                .filter((album) => album.year === year)
                .map(({ album, year, photos, coverPhoto }) => (
                  <AlbumThumbnail
                    key={`${year}-${album}`}
                    album={album}
                    year={year}
                    photos={photos}
                    coverPhoto={coverPhoto}
                    onClick={() => {
                      setSelectedAlbum({ album, year, photos })
                      setCurrentPhotoIndex(0)
                    }}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Album Explorer Modal */}
      {selectedAlbum && (
        <Dialog open={!!selectedAlbum} onOpenChange={() => setSelectedAlbum(null)}>
          <DialogContent className="max-w-6xl h-[90vh] p-2 md:p-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAlbum(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Albums
                  </Button>
                </div>
                <button
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
                  onClick={() => setSelectedAlbum(null)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold">{selectedAlbum.album}</h2>
                <p className="text-sm text-gray-600">
                  {selectedAlbum.year} • {selectedAlbum.photos.length} photos
                </p>
              </div>

              {/* Main Photo Display */}
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                {/* Large Photo */}
                <div className="flex-1 relative bg-black rounded-lg overflow-hidden">
                  <Image
                    src={selectedAlbum.photos[currentPhotoIndex]?.image || "/placeholder.svg"}
                    alt={selectedAlbum.photos[currentPhotoIndex]?.title || ""}
                    fill
                    className="object-contain"
                  />

                  {/* Navigation Arrows */}
                  {selectedAlbum.photos.length > 1 && (
                    <>
                      <button
                        onClick={() => navigatePhoto("prev")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigatePhoto("next")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Photo Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentPhotoIndex + 1} / {selectedAlbum.photos.length}
                  </div>
                </div>

                {/* Photo Info & Thumbnails */}
                <div className="w-full md:w-80 flex flex-col">
                  {/* Current Photo Info */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium text-sm md:text-base mb-2">
                      {selectedAlbum.photos[currentPhotoIndex]?.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      {formatDate(selectedAlbum.photos[currentPhotoIndex]?.date || "")}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge className="bg-amber-500 text-black text-xs">
                        {selectedAlbum.photos[currentPhotoIndex]?.tags.team}
                      </Badge>
                      <Badge className="bg-blue-500 text-white text-xs">
                        {selectedAlbum.photos[currentPhotoIndex]?.tags.competitionType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Camera className="h-3 w-3" />
                      <span>{selectedAlbum.photos[currentPhotoIndex]?.photographer.name}</span>
                      {selectedAlbum.photos[currentPhotoIndex]?.photographer.instagram && (
                        <a
                          href={`https://instagram.com/${selectedAlbum.photos[currentPhotoIndex]?.photographer.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700"
                        >
                          <Instagram className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="flex-1 overflow-y-auto">
                    <h4 className="text-sm font-medium mb-2">All Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedAlbum.photos.map((photo, index) => (
                        <div
                          key={photo.id}
                          className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                            index === currentPhotoIndex
                              ? "border-amber-500 ring-2 ring-amber-200"
                              : "border-transparent hover:border-gray-300"
                          }`}
                          onClick={() => setCurrentPhotoIndex(index)}
                        >
                          <Image
                            src={photo.image || "/placeholder.svg"}
                            alt={photo.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Individual Photo Lightbox */}
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
      {getFilteredAlbums().length === 0 && (
        <div className="text-center py-10 md:py-12 bg-gray-100 rounded-lg">
          <p className="text-muted-foreground mb-4">No albums match your filters.</p>
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

// Album Thumbnail Component
function AlbumThumbnail({
  album,
  year,
  photos,
  coverPhoto,
  onClick,
}: {
  album: string
  year: string
  photos: GalleryItem[]
  coverPhoto: GalleryItem
  onClick: () => void
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Get unique dates in the album
  const uniqueDates = Array.from(new Set(photos.map((photo) => photo.date))).sort()

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Cover Photo */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={coverPhoto.image || "/placeholder.svg"} alt={album} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <Badge className="bg-amber-500 text-black text-xs">{photos.length} photos</Badge>
            <Badge className="bg-black/70 text-white text-xs">{year}</Badge>
          </div>
        </div>
      </div>

      {/* Album Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2">{album}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
          <Calendar className="h-3 w-3" />
          <span>
            {uniqueDates.length === 1
              ? formatDate(uniqueDates[0])
              : `${formatDate(uniqueDates[0])} - ${formatDate(uniqueDates[uniqueDates.length - 1])}`}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 text-xs">
            <Users className="h-3 w-3 mr-1" />
            {coverPhoto.tags.team}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300 text-xs">
            {coverPhoto.tags.competitionType}
          </Badge>
        </div>
      </div>
    </div>
  )
}
