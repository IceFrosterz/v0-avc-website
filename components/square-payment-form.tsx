"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

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
  const [isSquareScriptLoaded, setIsSquareScriptLoaded] = useState(false)
  const [isSquareInitialized, setIsSquareInitialized] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [squareError, setSquareError] = useState<string | null>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)

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
    script.onerror = (e) => {
      console.error("Failed to load Square Web Payments SDK", e)
      setSquareError("Failed to load payment system. Please try again later.")
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
    if (!isSquareScriptLoaded || isSquareInitialized || !cardContainerRef.current) return

    const initializeSquare = async () => {
      try {
        console.log("Initializing Square payments...")

        // Get application ID and location ID from server
        const response = await fetch("/api/square/config")
        if (!response.ok) {
          throw new Error("Failed to get Square configuration")
        }

        const { applicationId, locationId } = await response.json()
        console.log("Square config received:", { applicationId, locationId })

        if (!applicationId || !locationId) {
          throw new Error("Invalid Square configuration")
        }

        // @ts-ignore - Square is loaded via script
        if (!window.Square) {
          throw new Error("Square SDK not loaded")
        }

        // @ts-ignore - Square is loaded via script
        const payments = window.Square.payments(applicationId, locationId)
        console.log("Square payments initialized")

        // Create card payment
        const card = await payments.card()
        await card.attach("#card-container")
        console.log("Card payment form attached")

        setPaymentForm(card)
        setIsSquareInitialized(true)
        setSquareError(null)

        console.log("Square Payments fully initialized")
      } catch (error) {
        console.error("Error initializing Square Payments:", error)
        setSquareError(error.message || "Failed to initialize payment system")
        toast({
          title: "Payment Error",
          description: error.message || "Failed to initialize payment system. Please try again later.",
          variant: "destructive",
        })
        onPaymentError(error)
      }
    }

    initializeSquare()
  }, [isSquareScriptLoaded, isSquareInitialized, toast, onPaymentError])

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    if (!paymentForm) {
      toast({
        title: "Payment Error",
        description: "Payment system not initialized. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsProcessingPayment(true)

    try {
      console.log("Tokenizing payment...")

      // Create payment token
      const result = await paymentForm.tokenize()
      console.log("Tokenization result:", result)

      if (result.status === "OK") {
        console.log("Payment tokenized successfully, processing payment...")

        // Process payment on the server using the direct endpoint
        const response = await fetch("/api/square/process-payment-direct", {
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
        console.log("Payment processing result:", paymentResult)

        if (paymentResult.success) {
          onPaymentSuccess(paymentResult.paymentId)
        } else {
          throw new Error(paymentResult.message || "Payment processing failed")
        }
      } else {
        console.error("Tokenization failed:", result)
        throw new Error(result.errors?.[0]?.message || "Failed to process payment")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setSquareError(error.message || "There was an error processing your payment")
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
      onPaymentError(error)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
        <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>

        {squareError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="text-sm">{squareError}</p>
          </div>
        )}

        {/* Square card container */}
        <div id="card-container" ref={cardContainerRef} className="mb-4 min-h-[100px] border rounded-md p-2"></div>

        <Button
          className="w-full"
          onClick={handlePaymentSubmit}
          disabled={!isSquareInitialized || isSubmitting || isProcessingPayment}
        >
          {isProcessingPayment || isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </Card>
  )
}
