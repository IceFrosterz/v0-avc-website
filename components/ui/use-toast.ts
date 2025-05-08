"use client"

// Simple toast hook for our application
import { useState, useCallback } from "react"

type ToastType = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

let toastCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<{ [key: number]: ToastType & { id: number } }>({})

  const toast = useCallback(({ title, description, variant = "default" }: ToastType) => {
    const id = toastCounter++

    setToasts((current) => ({
      ...current,
      [id]: { id, title, description, variant },
    }))

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((current) => {
        const { [id]: _, ...rest } = current
        return rest
      })
    }, 5000)

    return id
  }, [])

  return { toast, toasts }
}
