import { Loader2 } from "lucide-react"

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container py-6 md:py-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-white">Photo Gallery</h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Browse our collection of photos from tournaments, matches, and club events.
          </p>
        </div>

        {/* Loading skeleton for search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-3 mb-4">
          <div className="relative flex-grow max-w-full md:max-w-md">
            <div className="h-10 bg-gray-800 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Loading skeleton for filters */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 md:p-4 rounded-lg mb-4 md:mb-6 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
            <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="h-4 w-12 bg-gray-700 rounded animate-pulse mb-1"></div>
              <div className="h-10 bg-gray-800 rounded-md animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 w-12 bg-gray-700 rounded animate-pulse mb-1"></div>
              <div className="h-10 bg-gray-800 rounded-md animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 w-16 bg-gray-700 rounded animate-pulse mb-1"></div>
              <div className="h-10 bg-gray-800 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          <span className="ml-2 text-lg text-gray-300">Loading gallery...</span>
        </div>
      </div>
    </div>
  )
}
