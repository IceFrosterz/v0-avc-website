"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Play } from "lucide-react"

// Sample gallery data
const galleryItems = {
  photos: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=600&width=800`,
    alt: `Match photo ${i + 1}`,
    category: i % 3 === 0 ? "matches" : i % 3 === 1 ? "training" : "events",
  })),
  videos: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    thumbnail: `/placeholder.svg?height=600&width=800`,
    title: `Volleyball highlight video ${i + 1}`,
    duration: "2:34",
    category: i % 2 === 0 ? "matches" : "training",
  })),
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore photos and videos from our matches, training sessions, and special events.
        </p>
      </div>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-gray-800">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="flex justify-center mb-8 bg-gray-800">
              <TabsTrigger value="all">All Photos</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.photos.map((photo) => (
                <PhotoItem key={photo.id} photo={photo} onClick={() => setSelectedImage(photo)} />
              ))}
            </TabsContent>

            <TabsContent value="matches" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.photos
                .filter((photo) => photo.category === "matches")
                .map((photo) => (
                  <PhotoItem key={photo.id} photo={photo} onClick={() => setSelectedImage(photo)} />
                ))}
            </TabsContent>

            <TabsContent value="training" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.photos
                .filter((photo) => photo.category === "training")
                .map((photo) => (
                  <PhotoItem key={photo.id} photo={photo} onClick={() => setSelectedImage(photo)} />
                ))}
            </TabsContent>

            <TabsContent value="events" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.photos
                .filter((photo) => photo.category === "events")
                .map((photo) => (
                  <PhotoItem key={photo.id} photo={photo} onClick={() => setSelectedImage(photo)} />
                ))}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="videos">
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="flex justify-center mb-8 bg-gray-800">
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="matches">Match Highlights</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.videos.map((video) => (
                <VideoItem key={video.id} video={video} />
              ))}
            </TabsContent>

            <TabsContent value="matches" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.videos
                .filter((video) => video.category === "matches")
                .map((video) => (
                  <VideoItem key={video.id} video={video} />
                ))}
            </TabsContent>

            <TabsContent value="training" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.videos
                .filter((video) => video.category === "training")
                .map((video) => (
                  <VideoItem key={video.id} video={video} />
                ))}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Image Lightbox */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function PhotoItem({ photo, onClick }) {
  return (
    <div className="aspect-square overflow-hidden rounded-lg cursor-pointer" onClick={onClick}>
      <Image
        src={photo.src || "/placeholder.svg"}
        alt={photo.alt}
        width={400}
        height={400}
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
      />
    </div>
  )
}

function VideoItem({ video }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-lg overflow-hidden cursor-pointer group relative">
          <div className="aspect-video relative">
            <Image
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center">
                <Play className="h-8 w-8 text-black" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <h3 className="mt-2 font-medium">{video.title}</h3>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          <p className="text-white">Video player would be embedded here</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
