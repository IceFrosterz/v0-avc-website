"use client"

import { useEffect } from "react"

export default function InstagramFeed() {
  useEffect(() => {
    // Create and append the Behold widget script
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://w.behold.so/widget.js"
    document.head.appendChild(script)

    return () => {
      // Clean up script when component unmounts
      document.head.removeChild(script)
    }
  }, [])

  return (
    <section className="py-16 bg-gray-900">
      <div className="container">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">@alliancevolleyball.club</h2>
          <p className="text-gray-400 text-center max-w-2xl mb-6">
            Follow us on Instagram for the latest photos, videos, and updates from Alliance Volleyball Club.
          </p>
        </div>

        {/* Behold Widget */}
        <div className="w-full">
          <behold-widget feed-id="VrfTcExpKkJcSSFJMGXu"></behold-widget>
        </div>
      </div>
    </section>
  )
}
