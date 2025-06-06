"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  ChevronUp,
  X,
  Camera,
  Calendar,
  Users,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
  Instagram,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  getGalleryItems,
  getGalleryItemsByFilters,
  getUniqueGalleryValues,
  type GalleryItem,
} from "@/app/actions/gallery-actions"

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

// Group gallery data by year and album
const organizeGalleryData = (items: GalleryItem[]) => {
  const organized: Record<string, Record<string, GalleryItem[]>> = {}

  items.forEach((item) => {
    if (!organized[item.year]) {
      organized[item.year] = {}
    }

    if (!organized[item.year][item.album]) {
      organized[item.year][item.album] = []
    }

    organized[item.year][item.album].push(item)
  })

  return organized
}

export default function GalleryPage() {
  // State variables
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filters, setFilters] = useState({
    year: "all",
    team: "all",
    competitionType: "all",
  })
  const [expandedAlbums, setExpandedAlbums] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [galleryData, setGalleryData] = useState<Record<string, Record<string, GalleryItem[]>>>({})
  const [years, setYears] = useState<string[]>([])
  const [teams, setTeams] = useState<string[]>([])
  const [competitionTypes, setCompetitionTypes] = useState<string[]>([])
  const [albums, setAlbums] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [currentAlbumPhotos, setCurrentAlbumPhotos] = useState<GalleryItem[]>([])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Ref for the thumbnail container
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Open lightbox function
  const openLightbox = (photo: GalleryItem, photos: GalleryItem[]) => {
    setCurrentAlbumPhotos(photos)
    const index = photos.findIndex((item) => item.id === photo.id)
    setCurrentPhotoIndex(index !== -1 ? index : 0)
    setSelectedImage(photo)
  }

  const goToNextPhoto = useCallback(() => {
    if (currentAlbumPhotos.length <= 1) return
    const nextIndex = (currentPhotoIndex + 1) % currentAlbumPhotos.length
    setCurrentPhotoIndex(nextIndex)
    setSelectedImage(currentAlbumPhotos[nextIndex])
  }, [currentAlbumPhotos, currentPhotoIndex])

  const goToPrevPhoto = useCallback(() => {
    if (currentAlbumPhotos.length <= 1) return
    const prevIndex = (currentPhotoIndex - 1 + currentAlbumPhotos.length) % currentAlbumPhotos.length
    setCurrentPhotoIndex(prevIndex)
    setSelectedImage(currentAlbumPhotos[prevIndex])
  }, [currentAlbumPhotos, currentPhotoIndex])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "ArrowRight") {
        goToNextPhoto()
      } else if (e.key === "ArrowLeft") {
        goToPrevPhoto()
      } else if (e.key === "Escape") {
        setSelectedImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImage, goToNextPhoto, goToPrevPhoto])

  // Add touch swipe support
  useEffect(() => {
    if (!selectedImage) return

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      const minSwipeDistance = 50

      if (touchStartX - touchEndX > minSwipeDistance) {
        goToNextPhoto()
      } else if (touchEndX - touchStartX > minSwipeDistance) {
        goToPrevPhoto()
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [selectedImage, goToNextPhoto, goToPrevPhoto])

  // Center the active thumbnail
  const centerActiveThumbnail = useCallback(() => {
    if (!thumbnailContainerRef.current) return

    const container = thumbnailContainerRef.current
    const activeThumb = container.querySelector(`#thumbnail-${currentPhotoIndex}`) as HTMLElement

    if (!activeThumb) return

    const containerWidth = container.offsetWidth
    const thumbLeft = activeThumb.offsetLeft
    const thumbWidth = activeThumb.offsetWidth
    const scrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2
    container.scrollLeft = scrollLeft
  }, [currentPhotoIndex])

  useEffect(() => {
    if (selectedImage) {
      setTimeout(() => {
        centerActiveThumbnail()
      }, 100)
    }
  }, [currentPhotoIndex, selectedImage, centerActiveThumbnail])

  // Fetch gallery data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch all gallery items
        const items = await getGalleryItems()
        const organized = organizeGalleryData(items)
        setGalleryData(organized)

        // Fetch filter options
        const uniqueValues = await getUniqueGalleryValues()

        setYears(uniqueValues.years)
        setTeams(uniqueValues.teams)
        setCompetitionTypes(uniqueValues.competitionTypes)
        setAlbums(uniqueValues.albums)

        // Set initial filtered items
        setFilteredItems(items)
      } catch (error) {
        console.error("Error fetching gallery data:", error)
        toast({
          title: "Error",
          description: "Failed to load gallery data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Fetch filtered items when filters change
  useEffect(() => {
    const fetchFilteredItems = async () => {
      setIsLoading(true)
      try {
        const items = await getGalleryItemsByFilters({
          year: filters.year !== "all" ? filters.year : undefined,
          team: filters.team !== "all" ? filters.team : undefined,
          competitionType: filters.competitionType !== "all" ? filters.competitionType : undefined,
        })

        // Apply search query filter client-side if needed
        let filteredResults = items
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filteredResults = items.filter(
            (item) =>
              item.title.toLowerCase().includes(query) ||
              item.tags.team.toLowerCase().includes(query) ||
              item.tags.competitionType.toLowerCase().includes(query) ||
              item.album.toLowerCase().includes(query) ||
              item.photographer.name.toLowerCase().includes(query),
          )
        }

        setFilteredItems(filteredResults)
        setGalleryData(organizeGalleryData(filteredResults))
      } catch (error) {
        console.error("Error fetching filtered gallery items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilteredItems()
  }, [filters, searchQuery])

  // Toggle expanded state for an album/date
  const toggleAlbumExpanded = (albumKey: string) => {
    setExpandedAlbums((prev) => ({
      ...prev,
      [albumKey]: !prev[albumKey],
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      year: "all",
      team: "all",
      competitionType: "all",
    })
    setSearchQuery("")
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container py-6 md:py-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-white">Photo Gallery</h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Browse our collection of photos from tournaments, matches, and club events.
          </p>
        </div>

        {/* Search Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-3 mb-4">
          <div className="relative flex-grow max-w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by team, event, date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 md:p-4 rounded-lg mb-4 md:mb-6 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
            <h2 className="text-base md:text-lg font-semibold text-white">Filter Gallery</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-amber-400 border-amber-400 hover:bg-amber-400/20 hover:text-amber-300"
            >
              Reset Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Year</label>
              <select
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Team</label>
              <select
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                value={filters.team}
                onChange={(e) => setFilters({ ...filters, team: e.target.value })}
              >
                <option value="all">All Teams</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Competition Type</label>
              <select
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                value={filters.competitionType}
                onChange={(e) => setFilters({ ...filters, competitionType: e.target.value })}
              >
                <option value="all">All Types</option>
                {competitionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <span className="ml-2 text-lg text-gray-300">Loading gallery...</span>
          </div>
        )}

        {/* Gallery Content */}
        {!isLoading && (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6 bg-gradient-to-r from-gray-900 to-black">
              <TabsTrigger
                value="all"
                className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400"
              >
                All Photos
              </TabsTrigger>
              {years.slice(0, 2).map((year) => (
                <TabsTrigger
                  key={year}
                  value={year}
                  className="text-white data-[state=active]:bg-black data-[state=active]:text-amber-400"
                >
                  {year}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-6 md:space-y-8">
                {Object.entries(galleryData).map(([year, yearData]) => (
                  <div key={year}>
                    <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 border-b border-amber-500/30 pb-2 text-white">
                      {year}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(yearData).map(([album, items]) => {
                        // Group photos by date
                        const photosByDate = groupPhotosByDate(items)

                        return (
                          <div key={album} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 flex items-center text-white">
                              <span className="mr-2">{album}</span>
                              <Badge className="bg-amber-500 text-black">{items.length} photos</Badge>
                            </h3>

                            <div className="space-y-4">
                              {Object.entries(photosByDate).map(([date, photos]) => {
                                const albumKey = getAlbumKey(year, album, date)
                                const isExpanded = expandedAlbums[albumKey]

                                // Get the feature photo (first photo)
                                const featurePhoto = photos[0]

                                return (
                                  <div
                                    key={date}
                                    className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700"
                                  >
                                    {/* Date header with photo count */}
                                    <div className="bg-gradient-to-r from-gray-900 to-black p-2 flex justify-between items-center border-b border-gray-700">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3 text-amber-400" />
                                        <h4 className="text-sm font-medium text-gray-200">
                                          {new Date(date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </h4>
                                      </div>
                                      <Badge className="bg-amber-500 text-black text-xs">{photos.length} photos</Badge>
                                    </div>

                                    {/* Feature photo display */}
                                    <div className="p-2">
                                      <div
                                        className="relative aspect-[16/9] w-full rounded-md overflow-hidden shadow-md mb-2 cursor-pointer"
                                        onClick={() => openLightbox(featurePhoto, photos)}
                                      >
                                        <Image
                                          src={featurePhoto.image || "/placeholder.svg"}
                                          alt={featurePhoto.title}
                                          fill
                                          className="object-cover transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                                          loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 right-0 p-2 pointer-events-none">
                                          <h5 className="text-white font-medium text-xs md:text-sm line-clamp-1">
                                            {featurePhoto.title}
                                          </h5>
                                          <div className="flex items-center gap-1 mt-0.5">
                                            <Camera className="h-3 w-3 text-amber-400" />
                                            <span className="text-xs text-gray-300">
                                              {featurePhoto.photographer.name}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Info and action buttons */}
                                      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0">
                                        <div className="flex flex-wrap gap-1">
                                          <Badge
                                            variant="outline"
                                            className="bg-amber-900/30 text-amber-300 border-amber-700 text-xs"
                                          >
                                            <Users className="h-2.5 w-2.5 mr-1" />
                                            {featurePhoto.tags.team}
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className="bg-blue-900/30 text-blue-300 border-blue-700 text-xs"
                                          >
                                            {featurePhoto.tags.competitionType}
                                          </Badge>
                                        </div>

                                        {photos.length > 1 && (
                                          <Button
                                            onClick={() => toggleAlbumExpanded(albumKey)}
                                            variant="outline"
                                            className="text-amber-400 border-amber-600 hover:bg-amber-900/30 text-xs h-7 mt-1"
                                            size="sm"
                                          >
                                            {isExpanded ? (
                                              <>
                                                <ChevronUp className="h-3 w-3 mr-1" />
                                                Hide Photos
                                              </>
                                            ) : (
                                              <>
                                                <ChevronDown className="h-3 w-3 mr-1" />
                                                View All {photos.length} Photos
                                              </>
                                            )}
                                          </Button>
                                        )}
                                      </div>

                                      {/* Additional photos (shown when expanded) */}
                                      {isExpanded && photos.length > 1 && (
                                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                                          {photos.slice(1).map((item) => (
                                            <div
                                              key={item.id}
                                              className="aspect-square relative rounded-sm overflow-hidden shadow-sm group cursor-pointer"
                                              onClick={() => openLightbox(item, photos)}
                                            >
                                              <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
                                                loading="lazy"
                                              />
                                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Year-specific tabs */}
            {years.slice(0, 2).map((year) => (
              <TabsContent key={year} value={year}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryData[year] &&
                    Object.entries(galleryData[year]).map(([album, items]) => {
                      // Group photos by date
                      const photosByDate = groupPhotosByDate(items)

                      return (
                        <div key={album} className="mb-4">
                          <h3 className="text-lg font-semibold mb-2 flex items-center text-white">
                            <span className="mr-2">{album}</span>
                            <Badge className="bg-amber-500 text-black">{items.length} photos</Badge>
                          </h3>

                          <div className="space-y-4">
                            {Object.entries(photosByDate).map(([date, photos]) => {
                              const albumKey = getAlbumKey(year, album, date)
                              const isExpanded = expandedAlbums[albumKey]

                              // Get the feature photo (first photo)
                              const featurePhoto = photos[0]

                              return (
                                <div
                                  key={date}
                                  className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700"
                                >
                                  {/* Date header with photo count */}
                                  <div className="bg-gradient-to-r from-gray-900 to-black p-2 flex justify-between items-center border-b border-gray-700">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-3 w-3 text-amber-400" />
                                      <h4 className="text-sm font-medium text-gray-200">
                                        {new Date(date).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </h4>
                                    </div>
                                    <Badge className="bg-amber-500 text-black text-xs">{photos.length} photos</Badge>
                                  </div>

                                  {/* Feature photo display */}
                                  <div className="p-2">
                                    <div
                                      className="relative aspect-[16/9] w-full rounded-md overflow-hidden shadow-md mb-2 cursor-pointer"
                                      onClick={() => openLightbox(featurePhoto, photos)}
                                    >
                                      <Image
                                        src={featurePhoto.image || "/placeholder.svg"}
                                        alt={featurePhoto.title}
                                        fill
                                        className="object-cover transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                                      <div className="absolute bottom-0 left-0 right-0 p-2">
                                        <h5 className="text-white font-medium text-xs md:text-sm line-clamp-1">
                                          {featurePhoto.title}
                                        </h5>
                                        <div className="flex items-center gap-1 mt-0.5">
                                          <Camera className="h-3 w-3 text-amber-400" />
                                          <span className="text-xs text-gray-300">
                                            {featurePhoto.photographer.name}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Info and action buttons */}
                                    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0">
                                      <div className="flex flex-wrap gap-1">
                                        <Badge
                                          variant="outline"
                                          className="bg-amber-900/30 text-amber-300 border-amber-700 text-xs"
                                        >
                                          <Users className="h-2.5 w-2.5 mr-1" />
                                          {featurePhoto.tags.team}
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="bg-blue-900/30 text-blue-300 border-blue-700 text-xs"
                                        >
                                          {featurePhoto.tags.competitionType}
                                        </Badge>
                                      </div>

                                      {photos.length > 1 && (
                                        <Button
                                          onClick={() => toggleAlbumExpanded(albumKey)}
                                          variant="outline"
                                          className="text-amber-400 border-amber-600 hover:bg-amber-900/30 text-xs h-7 mt-1"
                                          size="sm"
                                        >
                                          {isExpanded ? (
                                            <>
                                              <ChevronUp className="h-3 w-3 mr-1" />
                                              Hide Photos
                                            </>
                                          ) : (
                                            <>
                                              <ChevronDown className="h-3 w-3 mr-1" />
                                              View All {photos.length} Photos
                                            </>
                                          )}
                                        </Button>
                                      )}
                                    </div>

                                    {/* Additional photos (shown when expanded) */}
                                    {isExpanded && photos.length > 1 && (
                                      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                                        {photos.slice(1).map((item) => (
                                          <div
                                            key={item.id}
                                            className="aspect-square relative rounded-sm overflow-hidden shadow-sm group cursor-pointer"
                                            onClick={() => openLightbox(item, photos)}
                                          >
                                            <Image
                                              src={item.image || "/placeholder.svg"}
                                              alt={item.title}
                                              fill
                                              className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
                                              loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
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
        )}

        {/* Image Lightbox with slideshow functionality */}
        <Dialog
          open={selectedImage !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedImage(null)
          }}
        >
          <DialogContent className="max-w-6xl p-0 bg-black/95 border-gray-800 overflow-hidden sm:rounded-lg w-[calc(100vw-16px)] md:w-auto mx-auto max-h-[85vh] flex flex-col">
            {/* Main image container with navigation */}
            <div className="relative w-full flex-grow flex items-center justify-center bg-black overflow-hidden min-h-[40vh] md:min-h-[45vh] max-h-[50vh] md:max-h-[55vh]">
              {/* Previous button */}
              {currentAlbumPhotos.length > 1 && (
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-black/70 p-1 md:p-2 opacity-70 hover:opacity-100 z-10 transition-opacity hover:bg-black/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevPhoto()
                  }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </button>
              )}

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: "inherit" }}>
                {selectedImage && (
                  <Image
                    src={selectedImage.image || "/placeholder.svg"}
                    alt={selectedImage.title}
                    fill
                    className="object-contain transition-opacity duration-300"
                    priority
                    sizes="(max-width: 768px) 90vw, 70vw"
                    onClick={(e) => e.stopPropagation()}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                )}
              </div>

              {/* Next button */}
              {currentAlbumPhotos.length > 1 && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-black/70 p-1 md:p-2 opacity-70 hover:opacity-100 z-10 transition-opacity hover:bg-black/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNextPhoto()
                  }}
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </button>
              )}

              {/* Photo counter */}
              {currentAlbumPhotos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1.5 rounded-full text-xs text-white font-medium">
                  {currentPhotoIndex + 1} / {currentAlbumPhotos.length}
                </div>
              )}
            </div>

            {/* Thumbnail navigation */}
            {currentAlbumPhotos.length > 1 && (
              <div className="bg-black/90 border-t border-gray-800 p-1 md:p-2 w-full overflow-hidden flex-shrink-0 max-w-full">
                <div
                  ref={thumbnailContainerRef}
                  className="flex space-x-2 md:space-x-3 w-full overflow-x-auto px-4 md:px-8 py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {currentAlbumPhotos.map((photo, index) => {
                    const isActive = index === currentPhotoIndex
                    return (
                      <button
                        key={photo.id}
                        className={`relative flex-shrink-0 rounded-sm overflow-hidden transition-all ${
                          isActive
                            ? "ring-2 ring-amber-500 scale-105"
                            : "ring-1 ring-gray-700 opacity-70 hover:opacity-100"
                        }`}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: index === 0 ? "auto" : undefined,
                          marginRight: index === currentAlbumPhotos.length - 1 ? "auto" : undefined,
                        }}
                        onClick={() => {
                          setCurrentPhotoIndex(index)
                          setSelectedImage(currentAlbumPhotos[index])
                        }}
                        id={`thumbnail-${index}`}
                      >
                        <Image
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.title}
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Photo details */}
            <div className="p-2 md:p-3 bg-black text-white flex-shrink-0 overflow-y-auto max-h-[25vh]">
              <h3 className="text-base md:text-lg font-semibold text-white">{selectedImage?.title}</h3>
              <p className="text-xs text-gray-300 mt-1">{selectedImage && formatDate(selectedImage.date)}</p>

              <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                {selectedImage && (
                  <>
                    <Badge className="bg-amber-500 text-black text-xs">{selectedImage.tags.team}</Badge>
                    <Badge className="bg-blue-500 text-white text-xs">{selectedImage.year}</Badge>
                    <Badge className="bg-green-500 text-black text-xs">{selectedImage.tags.competitionType}</Badge>
                  </>
                )}
              </div>

              <div className="mt-2 flex items-center gap-1 md:gap-2 text-xs text-gray-300">
                {selectedImage && (
                  <>
                    <span>Photo by: {selectedImage.photographer.name}</span>
                    {selectedImage.photographer.instagram && (
                      <a
                        href={`https://instagram.com/${selectedImage.photographer.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-amber-500 hover:text-amber-400"
                      >
                        <Instagram className="h-3 w-3" />@{selectedImage.photographer.instagram}
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* No Results Message */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-8 md:py-10 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-300 mb-4">No gallery items match your filters.</p>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-amber-500 text-amber-400 hover:bg-amber-900/30"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
