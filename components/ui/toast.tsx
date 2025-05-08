"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Toast({
  title,
  description,
  variant = "default",
  onDismiss,
}: {
  title: string
  description?: string
  variant?: "default" | "destructive"
  onDismiss: () => void
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onDismiss, 300) // Allow animation to complete
    }, 5000)

    return () => clearTimeout(timeout)
  }, [onDismiss])

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 w-full max-w-md p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        variant === "destructive" ? "bg-destructive text-white" : "bg-background border",
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {description && <p className="text-sm opacity-80 mt-1">{description}</p>}
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onDismiss, 300)
          }}
          className="h-6 w-6 rounded-md inline-flex items-center justify-center"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}
