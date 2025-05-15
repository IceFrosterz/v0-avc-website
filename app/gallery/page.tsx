"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Instagram,
  ChevronDown,
  ChevronUp,
  X,
  Camera,
  Calendar,
  Users,
  Download,
  Share2,
  Search,
  Upload,
  Copy,
  Facebook,
  Twitter,
} from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

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
      // Other photos...
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

// Utility function to create shareable links
const createShareLink = (platform: string, photo: GalleryItem) => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(`Check out this photo from Alliance Volleyball Club: ${photo.title}`)
  const image = encodeURIComponent(photo.image)

  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${url}&text=${title}`
    case "whatsapp":
      return `https://api.whatsapp.com/send?text=${title} ${url}`
    case "email":
      return `mailto:?subject=${title}&body=Check out this photo: ${url}`
    default:
      return url
  }
}

type PhotoUpload = {
  file: File | null
  title: string
  team: string
  album: string
  competitionType: string
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
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [photoUpload, setPhotoUpload] = useState<PhotoUpload>({
    file: null,
    title: "",
    team: "",
    album: "",
    competitionType: "",
  })
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const { toast } = useToast()

  // Ref for intersection observer
  const observer = useRef<IntersectionObserver | null>(null)
  const lastPhotoElementRef = useCallback((node: Element | null) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Load more images if needed (placeholder for pagination)
        console.log("Load more images")
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  // Toggle expanded state for an album/date
  const toggleAlbumExpanded = (albumKey: string) => {
    setExpandedAlbums((prev) => ({
      ...prev,
      [albumKey]: !prev[albumKey],
    }))
  }

  // Filter gallery items based on selected filters and search query
  const getFilteredItems = () => {
    const filteredItems: GalleryItem[] = []
    const searchTerms = searchQuery
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0)

    // Collect all items
    Object.entries(galleryData).forEach(([year, yearData]) => {
      if (filters.year === "all" || filters.year === year) {
        Object.values(yearData).forEach((albumItems) => {
          albumItems.forEach((item) => {
            if (
              (filters.team === "all" || item.tags.team === filters.team) &&
              (filters.competitionType === "all" || item.tags.competitionType === filters.competitionType)
            ) {
              // Search filter
              if (searchQuery === "") {
                filteredItems.push(item)
              } else {
                // Check if any search term matches
                const matchesSearch = searchTerms.some(
                  (term) =>
                    item.title.toLowerCase().includes(term) ||
                    item.tags.team.toLowerCase().includes(term) ||
                    item.tags.competitionType.toLowerCase().includes(term) ||
                    item.photographer.name.toLowerCase().includes(term) ||
                    item.album.toLowerCase().includes(term) ||
                    item.year.toLowerCase().includes(term),
                )

                if (matchesSearch) {
                  filteredItems.push(item)
                }
              }
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

  // Handle file selection for upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPhotoUpload((prev) => ({ ...prev, file }))

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle photo upload
  const handlePhotoUpload = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !photoUpload.file ||
      !photoUpload.title ||
      !photoUpload.team ||
      !photoUpload.album ||
      !photoUpload.competitionType
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields and select an image to upload.",
        variant: "destructive",
      })
      return
    }

    // This would be where we would actually upload the file to the server
    // For now, just show a success message and reset the form
    toast({
      title: "Photo Uploaded",
      description: "Your photo has been submitted for approval.",
      variant: "default",
    })

    // Reset form
    setPhotoUpload({
      file: null,
      title: "",
      team: "",
      album: "",
      competitionType: "",
    })
    setFilePreview(null)
    setShowUploadForm(false)
  }

  // Handle image download
  const handleDownloadImage = (image: GalleryItem) => {
    // Create a temporary link to download the image
    const link = document.createElement("a")
    link.href = image.image
    link.download = `alliance-volleyball-${image.id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Started",
      description: "Your photo is downloading.",
      variant: "default",
    })
  }

  // Handle copy link to clipboard
  const handleCopyLink = (image: GalleryItem) => {
    // Create a shareable link that includes the image ID
    const shareableLink = `${window.location.origin}/gallery?photo=${image.id}`
    navigator.clipboard.writeText(shareableLink)

    toast({
      title: "Link Copied",
      description: "Photo link copied to clipboard.",
      variant: "default",
    })
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

        {/* Search and Upload Controls */}
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

          <Button onClick={() => setShowUploadForm(true)} className="bg-amber-500 text-black hover:bg-amber-600">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
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
                {Object.keys(galleryData).map((year) => (
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
                {allTeams.map((team) => (
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
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6 bg-gradient-to-r from-gray-900 to-black">
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
            <div className="space-y-6 md:space-y-8">
              {Object.entries(galleryData).map(([year, yearData]) => (
                <div key={year}>
                  <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 border-b border-amber-500/30 pb-2 text-white">
                    {year}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(yearData).map(([album, items]) => {
                      const filteredItems = items.filter((item) => {
                        // Apply team and competition type filters
                        const passesTeamFilter = filters.team === "all" || item.tags.team === filters.team
                        const passesCompTypeFilter =
                          filters.competitionType === "all" || item.tags.competitionType === filters.competitionType

                        // Apply search filter if query exists
                        let passesSearchFilter = true
                        if (searchQuery) {
                          const searchTerms = searchQuery
                            .toLowerCase()
                            .split(" ")
                            .filter((term) => term.length > 0)
                          passesSearchFilter = searchTerms.some(
                            (term) =>
                              item.title.toLowerCase().includes(term) ||
                              item.tags.team.toLowerCase().includes(term) ||
                              item.tags.competitionType.toLowerCase().includes(term) ||
                              item.photographer.name.toLowerCase().includes(term) ||
                              item.album.toLowerCase().includes(term) ||
                              item.year.toLowerCase().includes(term),
                          )
                        }

                        return passesTeamFilter && passesCompTypeFilter && passesSearchFilter
                      })

                      if (filteredItems.length === 0) return null

                      // Group photos by date
                      const photosByDate = groupPhotosByDate(filteredItems)

                      return (
                        <div key={album} className="mb-4">
                          <h3 className="text-lg font-semibold mb-2 flex items-center text-white">
                            <span className="mr-2">{album}</span>
                            <Badge className="bg-amber-500 text-black">{filteredItems.length} photos</Badge>
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
                                    <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden shadow-md mb-2">
                                      <Image
                                        src={featurePhoto.image || "/placeholder.svg"}
                                        alt={featurePhoto.title}
                                        fill
                                        className="object-cover cursor-pointer transition-transform hover:scale-[1.02]"
                                        onClick={() => setSelectedImage(featurePhoto)}
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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

                                      {/* Action buttons over the image */}
                                      <div className="absolute top-1 right-1 flex space-x-1">
                                        <Button
                                          size="icon"
                                          variant="secondary"
                                          className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleDownloadImage(featurePhoto)
                                          }}
                                        >
                                          <Download className="h-3 w-3" />
                                          <span className="sr-only">Download</span>
                                        </Button>

                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button
                                              size="icon"
                                              variant="secondary"
                                              className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <Share2 className="h-3 w-3" />
                                              <span className="sr-only">Share</span>
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent>
                                            <DropdownMenuItem
                                              onClick={() => {
                                                window.open(createShareLink("facebook", featurePhoto), "_blank")
                                              }}
                                              className="cursor-pointer"
                                            >
                                              <Facebook className="h-4 w-4 mr-2" />
                                              Facebook
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => {
                                                window.open(createShareLink("twitter", featurePhoto), "_blank")
                                              }}
                                              className="cursor-pointer"
                                            >
                                              <Twitter className="h-4 w-4 mr-2" />
                                              Twitter
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => {
                                                handleCopyLink(featurePhoto)
                                              }}
                                              className="cursor-pointer"
                                            >
                                              <Copy className="h-4 w-4 mr-2" />
                                              Copy Link
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
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
                                        {photos.slice(1).map((item, index) => (
                                          <div
                                            key={item.id}
                                            className="aspect-square relative rounded-sm overflow-hidden shadow-sm group"
                                            ref={index === photos.length - 2 ? lastPhotoElementRef : null}
                                          >
                                            <Image
                                              src={item.image || "/placeholder.svg"}
                                              alt={item.title}
                                              fill
                                              className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                              onClick={() => setSelectedImage(item)}
                                              loading="lazy"
                                            />

                                            {/* Hover overlay with actions */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                              <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  handleDownloadImage(item)
                                                }}
                                              >
                                                <Download className="h-3 w-3" />
                                                <span className="sr-only">Download</span>
                                              </Button>

                                              <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                  <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    <Share2 className="h-3 w-3" />
                                                    <span className="sr-only">Share</span>
                                                  </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                  <DropdownMenuItem
                                                    onClick={() => {
                                                      window.open(createShareLink("facebook", item), "_blank")
                                                    }}
                                                    className="cursor-pointer"
                                                  >
                                                    <Facebook className="h-4 w-4 mr-2" />
                                                    Facebook
                                                  </DropdownMenuItem>
                                                  <DropdownMenuItem
                                                    onClick={() => {
                                                      window.open(createShareLink("twitter", item), "_blank")
                                                    }}
                                                    className="cursor-pointer"
                                                  >
                                                    <Twitter className="h-4 w-4 mr-2" />
                                                    Twitter
                                                  </DropdownMenuItem>
                                                  <DropdownMenuItem
                                                    onClick={() => {
                                                      handleCopyLink(item)
                                                    }}
                                                    className="cursor-pointer"
                                                  >
                                                    <Copy className="h-4 w-4 mr-2" />
                                                    Copy Link
                                                  </DropdownMenuItem>
                                                </DropdownMenuContent>
                                              </DropdownMenu>
                                            </div>
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

          {/* Year-specific tabs - content structure is similar to the "all" tab but filtered by year */}
          {Object.entries(galleryData).map(([year, yearData]) => (
            <TabsContent key={year} value={year}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(yearData).map(([album, items]) => {
                  const filteredItems = items.filter((item) => {
                    // Apply team and competition type filters
                    const passesTeamFilter = filters.team === "all" || item.tags.team === filters.team
                    const passesCompTypeFilter =
                      filters.competitionType === "all" || item.tags.competitionType === filters.competitionType

                    // Apply search filter if query exists
                    let passesSearchFilter = true
                    if (searchQuery) {
                      const searchTerms = searchQuery
                        .toLowerCase()
                        .split(" ")
                        .filter((term) => term.length > 0)
                      passesSearchFilter = searchTerms.some(
                        (term) =>
                          item.title.toLowerCase().includes(term) ||
                          item.tags.team.toLowerCase().includes(term) ||
                          item.tags.competitionType.toLowerCase().includes(term) ||
                          item.photographer.name.toLowerCase().includes(term) ||
                          item.album.toLowerCase().includes(term) ||
                          item.year.toLowerCase().includes(term),
                      )
                    }

                    return passesTeamFilter && passesCompTypeFilter && passesSearchFilter
                  })

                  if (filteredItems.length === 0) return null

                  // Group photos by date
                  const photosByDate = groupPhotosByDate(filteredItems)

                  return (
                    <div key={album} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center text-white">
                        <span className="mr-2">{album}</span>
                        <Badge className="bg-amber-500 text-black">{filteredItems.length} photos</Badge>
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
                                <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden shadow-md mb-2">
                                  <Image
                                    src={featurePhoto.image || "/placeholder.svg"}
                                    alt={featurePhoto.title}
                                    fill
                                    className="object-cover cursor-pointer transition-transform hover:scale-[1.02]"
                                    onClick={() => setSelectedImage(featurePhoto)}
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                  <div className="absolute bottom-0 left-0 right-0 p-2">
                                    <h5 className="text-white font-medium text-xs md:text-sm line-clamp-1">
                                      {featurePhoto.title}
                                    </h5>
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <Camera className="h-3 w-3 text-amber-400" />
                                      <span className="text-xs text-gray-300">{featurePhoto.photographer.name}</span>
                                    </div>
                                  </div>

                                  {/* Action buttons over the image */}
                                  <div className="absolute top-1 right-1 flex space-x-1">
                                    <Button
                                      size="icon"
                                      variant="secondary"
                                      className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDownloadImage(featurePhoto)
                                      }}
                                    >
                                      <Download className="h-3 w-3" />
                                      <span className="sr-only">Download</span>
                                    </Button>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          size="icon"
                                          variant="secondary"
                                          className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Share2 className="h-3 w-3" />
                                          <span className="sr-only">Share</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            window.open(createShareLink("facebook", featurePhoto), "_blank")
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <Facebook className="h-4 w-4 mr-2" />
                                          Facebook
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            window.open(createShareLink("twitter", featurePhoto), "_blank")
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <Twitter className="h-4 w-4 mr-2" />
                                          Twitter
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            handleCopyLink(featurePhoto)
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <Copy className="h-4 w-4 mr-2" />
                                          Copy Link
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
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
                                    {photos.slice(1).map((item, index) => (
                                      <div
                                        key={item.id}
                                        className="aspect-square relative rounded-sm overflow-hidden shadow-sm group"
                                        ref={index === photos.length - 2 ? lastPhotoElementRef : null}
                                      >
                                        <Image
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.title}
                                          fill
                                          className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                          onClick={() => setSelectedImage(item)}
                                          loading="lazy"
                                        />

                                        {/* Hover overlay with actions */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                          <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              handleDownloadImage(item)
                                            }}
                                          >
                                            <Download className="h-3 w-3" />
                                            <span className="sr-only">Download</span>
                                          </Button>

                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-6 w-6 bg-black/50 hover:bg-black/70 border-0 text-white"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                <Share2 className="h-3 w-3" />
                                                <span className="sr-only">Share</span>
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                              <DropdownMenuItem
                                                onClick={() => {
                                                  window.open(createShareLink("facebook", item), "_blank")
                                                }}
                                                className="cursor-pointer"
                                              >
                                                <Facebook className="h-4 w-4 mr-2" />
                                                Facebook
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                onClick={() => {
                                                  window.open(createShareLink("twitter", item), "_blank")
                                                }}
                                                className="cursor-pointer"
                                              >
                                                <Twitter className="h-4 w-4 mr-2" />
                                                Twitter
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                onClick={() => {
                                                  handleCopyLink(item)
                                                }}
                                                className="cursor-pointer"
                                              >
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copy Link
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>
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

        {/* Image Lightbox with download and share options */}
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-5xl p-1 md:p-0 bg-black/95 border-gray-800">
              <button
                className="absolute right-2 top-2 md:right-4 md:top-4 rounded-full bg-black/70 p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
              </button>

              <div className="relative w-full h-[50vh] md:h-[70vh] bg-black rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-4 bg-black text-white">
                <h3 className="text-lg md:text-xl font-semibold text-white">{selectedImage.title}</h3>
                <p className="text-xs md:text-sm text-gray-300 mt-1">{formatDate(selectedImage.date)}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className="bg-amber-500 text-black">{selectedImage.tags.team}</Badge>
                  <Badge className="bg-blue-500 text-white">{selectedImage.year}</Badge>
                  <Badge className="bg-green-500 text-black">{selectedImage.tags.competitionType}</Badge>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs md:text-sm text-gray-300">
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

                <DialogFooter className="mt-4 gap-2 flex-row justify-end">
                  <Button
                    className="bg-amber-500 text-black hover:bg-amber-600"
                    onClick={() => handleDownloadImage(selectedImage)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-white text-white hover:bg-white/10">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          window.open(createShareLink("facebook", selectedImage), "_blank")
                        }}
                        className="cursor-pointer"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          window.open(createShareLink("twitter", selectedImage), "_blank")
                        }}
                        className="cursor-pointer"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleCopyLink(selectedImage)
                        }}
                        className="cursor-pointer"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Photo Upload Dialog */}
        <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
          <DialogContent className="max-w-md bg-gray-900 text-white border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-white">Upload Photo</h3>

            <form onSubmit={handlePhotoUpload} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo-upload" className="text-gray-300">
                  Photo
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors hover:bg-gray-800 ${
                    filePreview ? "border-amber-500 bg-gray-800" : "border-gray-600"
                  }`}
                  onClick={() => document.getElementById("photo-upload")?.click()}
                >
                  {filePreview ? (
                    <div className="relative w-full h-40">
                      <Image src={filePreview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                      <p className="text-sm text-gray-400">Click to select or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or JPEG up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={photoUpload.title}
                  onChange={(e) => setPhotoUpload({ ...photoUpload, title: e.target.value })}
                  placeholder="Enter a descriptive title"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Team */}
              <div className="space-y-2">
                <Label htmlFor="team" className="text-gray-300">
                  Team
                </Label>
                <select
                  id="team"
                  className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                  value={photoUpload.team}
                  onChange={(e) => setPhotoUpload({ ...photoUpload, team: e.target.value })}
                  required
                >
                  <option value="">Select Team</option>
                  {allTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>

              {/* Album */}
              <div className="space-y-2">
                <Label htmlFor="album" className="text-gray-300">
                  Album
                </Label>
                <select
                  id="album"
                  className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                  value={photoUpload.album}
                  onChange={(e) => setPhotoUpload({ ...photoUpload, album: e.target.value })}
                  required
                >
                  <option value="">Select Album</option>
                  {Object.entries(galleryData)
                    .flatMap(([_, yearData]) => Object.keys(yearData))
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((album) => (
                      <option key={album} value={album}>
                        {album}
                      </option>
                    ))}
                </select>
              </div>

              {/* Competition Type */}
              <div className="space-y-2">
                <Label htmlFor="competitionType" className="text-gray-300">
                  Competition Type
                </Label>
                <select
                  id="competitionType"
                  className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                  value={photoUpload.competitionType}
                  onChange={(e) => setPhotoUpload({ ...photoUpload, competitionType: e.target.value })}
                  required
                >
                  <option value="">Select Competition Type</option>
                  {allCompetitionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadForm(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-500 text-black hover:bg-amber-600">
                  Upload
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* No Results Message */}
        {getFilteredItems().length === 0 && (
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
