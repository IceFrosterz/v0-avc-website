"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { teamOptions } from "@/lib/data"

// Get unique years from gallery items
const years = ["2023", "2024"]

// Get unique competition types from gallery items
const competitionTypes = ["VVL", "Socials", "Training", "Finals", "Tournament"]

// Sample gallery items
const galleryItems = [
  {
    id: "gallery-1",
    title: "Men's Team Victory",
    image: "/placeholder.svg?height=800&width=1200&text=Men's+Team+Victory",
    tags: {
      team: "AVC A",
      year: "2023",
      competitionType: "Finals",
    },
  },
  {
    id: "gallery-2",
    title: "Women's Team Training",
    image: "/placeholder.svg?height=800&width=1200&text=Women's+Team+Training",
    tags: {
      team: "AVC B",
      year: "2023",
      competitionType: "Training",
    },
  },
  {
    id: "gallery-3",
    title: "Social League Match",
    image: "/placeholder.svg?height=800&width=1200&text=Social+League+Match",
    tags: {
      team: "Social",
      year: "2022",
      competitionType: "Socials",
    },
  },
  {
    id: "gallery-4",
    title: "VVL Tournament",
    image: "/placeholder.svg?height=800&width=1200&text=VVL+Tournament",
    tags: {
      team: "AVC A",
      year: "2022",
      competitionType: "VVL",
    },
  },
  {
    id: "gallery-5",
    title: "Training Session",
    image: "/placeholder.svg?height=800&width=1200&text=Training+Session",
    tags: {
      team: "AVC C",
      year: "2023",
      competitionType: "Training",
    },
  },
  {
    id: "gallery-6",
    title: "Championship Match",
    image: "/placeholder.svg?height=800&width=1200&text=Championship+Match",
    tags: {
      team: "AVC A",
      year: "2023",
      competitionType: "Finals",
    },
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filters, setFilters] = useState({
    team: "All Teams",
    year: "all",
    competitionType: "all",
  })

  // Filter gallery items based on selected filters
  const filteredItems = galleryItems.filter((item) => {
    const teamMatch = filters.team === "All Teams" || item.tags.team === filters.team
    const yearMatch = filters.year === "all" || item.tags.year === filters.year
    const typeMatch = filters.competitionType === "all" || item.tags.competitionType === filters.competitionType
    return teamMatch && yearMatch && typeMatch
  })

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      team: "All Teams",
      year: "all",
      competitionType: "all",
    })
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of photos and videos from matches, tournaments, and events.
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
            <label className="block text-sm font-medium mb-2">Team</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
              value={filters.team}
              onChange={(e) => handleFilterChange("team", e.target.value)}
            >
              <option value="All Teams">All Teams</option>
              {teamOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
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
            <label className="block text-sm font-medium mb-2">Competition Type</label>
            <select
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
              value={filters.competitionType}
              onChange={(e) => handleFilterChange("competitionType", e.target.value)}
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src="/placeholder.svg?height=800&width=800"
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
                  <Badge variant="outline" className="bg-blue-500/30 border-blue-500/50">
                    {item.tags.year}
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/30 border-green-500/50">
                    {item.tags.competitionType}
                  </Badge>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">No gallery items match your filters.</p>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-amber-500 text-black">{selectedImage.tags.team}</Badge>
                <Badge className="bg-blue-500 text-white">{selectedImage.tags.year}</Badge>
                <Badge className="bg-green-500 text-black">{selectedImage.tags.competitionType}</Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
