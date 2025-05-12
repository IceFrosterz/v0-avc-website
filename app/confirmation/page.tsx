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

  useEffect(() => {
    // In a real application, you would fetch the order details from your API
    if (orderId) {
      // Try to get the order from localStorage first (for fallback orders)
      const savedOrders = JSON.parse(localStorage.getItem("savedOrders") || "[]")
      const localOrder = savedOrders.find((order: any) => order.id === orderId)

      if (localOrder) {
        setOrderDetails(localOrder)
        // Send confirmation email for local orders
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
        // Send confirmation email
        sendConfirmationEmail(simulatedOrder)
      }, 500)
    } catch (error) {
      console.error("Error fetching order details:", error)
    }
  }

  const sendConfirmationEmail = async (order: any) => {
    if (emailSent) return // Prevent sending multiple emails

    try {
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
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error)
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
