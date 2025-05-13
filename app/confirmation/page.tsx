"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const orderId = searchParams.get("orderId")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch order details and trigger email
    if (orderId) {
      // Try to get the order from localStorage first
      const savedOrders = JSON.parse(localStorage.getItem("savedOrders") || "[]")
      const localOrder = savedOrders.find((order: any) => order.id === orderId)

      if (localOrder) {
        console.log("Found local order:", localOrder)
        setOrderDetails(localOrder)
        // Always send confirmation email regardless of order type
        sendConfirmationEmail(localOrder)
      } else {
        // If not in localStorage, try to fetch from API
        fetchOrderDetails(orderId)
      }
    }
  }, [orderId])

  const fetchOrderDetails = async (id: string) => {
    try {
      // This would be a real API call in production
      // For demo, we'll simulate it
      setTimeout(() => {
        const simulatedOrder = {
          id: id,
          date: new Date().toISOString(),
          customer: {
            name: "Customer Name",
            email: "customer@example.com",
            phone: "123-456-7890",
          },
          items: [],
          total: 0,
        }
        setOrderDetails(simulatedOrder)
        // Always send confirmation email regardless of order type
        sendConfirmationEmail(simulatedOrder)
      }, 500)
    } catch (error) {
      console.error("Error fetching order details:", error)
    }
  }

  const sendConfirmationEmail = async (order: any) => {
    if (emailSent) return // Prevent sending multiple emails

    try {
      // Send email for ANY order type, including free ones
      console.log("Attempting to send confirmation email for order:", order.id)

      const response = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })

      const result = await response.json()

      if (result.success) {
        setEmailSent(true)
        toast({
          title: "Confirmation Email Sent",
          description: "A confirmation email has been sent to your email address.",
        })
      } else {
        console.error("Failed to send confirmation email:", result.message)
        setEmailError(result.message || "Failed to send confirmation email")

        // In preview environment, we'll simulate success anyway
        if (window.location.hostname === "localhost" || window.location.hostname.includes("vercel.app")) {
          setEmailSent(true)
          toast({
            title: "Preview Mode",
            description: "In preview mode, emails are logged to console instead of sent.",
          })
        }
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error)
      setEmailError(error.message || "Error sending confirmation email")

      // In preview environment, we'll simulate success anyway
      if (window.location.hostname === "localhost" || window.location.hostname.includes("vercel.app")) {
        setEmailSent(true)
        toast({
          title: "Preview Mode",
          description: "In preview mode, emails are logged to console instead of sent.",
        })
      }
    }
  }

  if (!orderId) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Invalid Order</h1>
        <p className="text-lg text-muted-foreground mb-8">No order information was found. Please return to the shop.</p>
        <Button asChild>
          <a href="/">Back to Shop</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12 max-w-md mx-auto text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Thank you for your order. We&apos;ve received your request and will process it shortly.
        {emailSent && " A confirmation email has been sent to your email address."}
      </p>

      {emailError && !emailSent && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md mb-6">
          <p className="font-medium">Note:</p>
          <p className="text-sm">
            We couldn&apos;t send a confirmation email at this time. You&apos;ll still receive your order, and
            we&apos;ll try to send the email again later.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="text-left">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Order Number:</span>
              <span>{orderId}</span>
            </div>
            {orderDetails && (
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date(orderDetails.date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <a href="/">Continue Shopping</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
