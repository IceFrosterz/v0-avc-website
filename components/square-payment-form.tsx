"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

// Define props interface
interface SquarePaymentFormProps {
  amount: number
  onPaymentSuccess: (paymentId: string) => void
  onPaymentError: (error: Error) => void
  isSubmitting: boolean
}

export default function SquarePaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isSubmitting,
}: SquarePaymentFormProps) {
  const { toast } = useToast()
  const [paymentForm, setPaymentForm] = useState<any>(null)
  const [cardButton, setCardButton] = useState<HTMLElement | null>(null)
  const [isSquareScriptLoaded, setIsSquareScriptLoaded] = useState(false)
  const [isSquareInitialized, setIsSquareInitialized] = useState(false)

  // Load Square Web Payments SDK
  useEffect(() => {
    // Only load the script once
    if (document.getElementById("square-web-payments-sdk")) {
      setIsSquareScriptLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.id = "square-web-payments-sdk"
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js"
    script.onload = () => {
      console.log("Square Web Payments SDK loaded")
      setIsSquareScriptLoaded(true)
    }
    script.onerror = () => {
      console.error("Failed to load Square Web Payments SDK")
      toast({
        title: "Payment Error",
        description: "Failed to load payment system. Please try again later.",
        variant: "destructive",
      })
    }
    document.body.appendChild(script)

    // Cleanup
    return () => {
      // We don't remove the script as it might be used by other components
    }
  }, [toast])

  // Initialize Square Payments when script is loaded
  useEffect(() => {
    if (!isSquareScriptLoaded || isSquareInitialized) return

    const initializeSquare = async () => {
      try {
        // Get application ID and location ID from server
        const response = await fetch("/api/square/config")
        if (!response.ok) {
          throw new Error("Failed to get Square configuration")
        }

        const { applicationId, locationId } = await response.json()

        if (!applicationId || !locationId) {
          throw new Error("Invalid Square configuration")
        }

        // @ts-ignore - Square is loaded via script
        if (!window.Square) {
          throw new Error("Square SDK not loaded")
        }

        // @ts-ignore - Square is loaded via script
        const payments = window.Square.payments(applicationId, locationId)

        // Create card payment
        const card = await payments.card()
        await card.attach("#card-container")

        setPaymentForm(card)
        setCardButton(document.getElementById("card-button"))
        setIsSquareInitialized(true)

        console.log("Square Payments initialized")
      } catch (error) {
        console.error("Error initializing Square Payments:", error)
        toast({
          title: "Payment Error",
          description: "Failed to initialize payment system. Please try again later.",
          variant: "destructive",
        })
        onPaymentError(error)
      }
    }

    initializeSquare()
  }, [isSquareScriptLoaded, isSquareInitialized, toast, onPaymentError])

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    if (!paymentForm || !cardButton) {
      toast({
        title: "Payment Error",
        description: "Payment system not initialized. Please try again.",
        variant: "destructive",
      })
      return
    }

    try {
      cardButton.disabled = true

      // Create payment token
      const result = await paymentForm.tokenize()
      if (result.status === "OK") {
        // Process payment on the server
        const response = await fetch("/api/square/process-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: amount,
            currency: "AUD",
          }),
        })

        const paymentResult = await response.json()

        if (paymentResult.success) {
          onPaymentSuccess(paymentResult.paymentId)
        } else {
          throw new Error(paymentResult.message || "Payment processing failed")
        }
      } else {
        throw new Error(result.errors[0].message)
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
      onPaymentError(error)
    } finally {
      if (cardButton) {
        cardButton.disabled = false
      }
    }
  }

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
        <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>

        {/* Square card container */}
        <div id="card-container" className="mb-4 min-h-[100px] border rounded-md p-2"></div>

        <Button
          id="card-button"
          className="w-full"
          onClick={handlePaymentSubmit}
          disabled={!isSquareInitialized || isSubmitting}
        >
          {isSubmitting ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </Button>
      </div>
    </Card>
  )
}
