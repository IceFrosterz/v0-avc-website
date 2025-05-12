"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Function to send order data to our API
const saveOrder = async (orderData: any) => {
  try {
    console.log("Saving order to database:", orderData)

    // Save to our local API which will store in Neon
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })

    // Check if the response is valid JSON
    let result
    try {
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        result = await response.json()
        console.log("API response:", result)
      } else {
        // If not JSON, get the text and log it
        const text = await response.text()
        console.error("Non-JSON response:", text)
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`)
      }
    } catch (parseError) {
      console.error("Error parsing response:", parseError)
      // If we can't parse the response, use localStorage as fallback
      throw new Error("Could not parse server response")
    }

    if (!response.ok) {
      throw new Error(result?.message || "Failed to save order")
    }

    // If successful, also try to send to the admin site via our server-side API
    try {
      const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL
      if (adminApiUrl) {
        // Use our server-side API to forward the order to the admin site
        const forwardResponse = await fetch("/api/forward-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        })

        if (!forwardResponse.ok) {
          console.warn("Failed to forward order to admin site, but saved locally")
        }
      }
    } catch (adminError) {
      console.warn("Error forwarding to admin site:", adminError)
    }

    return { success: true, orderId: orderData.id }
  } catch (error) {
    console.error("Error saving order:", error)
    // Fallback to local storage if the API call fails
    const savedOrders = JSON.parse(localStorage.getItem("savedOrders") || "[]")
    savedOrders.push(orderData)
    localStorage.setItem("savedOrders", JSON.stringify(savedOrders))

    return { success: true, orderId: orderData.id, fallback: true }
  }
}

// Mock function to simulate Square payment processing
const processSquarePayment = async (paymentDetails: any) => {
  // In a real app, this would integrate with the Square Payment API
  console.log("Processing payment:", paymentDetails)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, paymentId: `sqp-${Math.random().toString(36).substring(2, 10)}` })
    }, 1500)
  })
}

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, total, clearCart } = useCart()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [teamConfirmation, setTeamConfirmation] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Please complete all fields",
        description: "All customer information fields are required.",
        variant: "destructive",
      })
      return
    }

    // Check team confirmation
    if (!teamConfirmation) {
      toast({
        title: "Team confirmation required",
        description: "Please confirm that you are a team member or know someone on the team.",
        variant: "destructive",
      })
      return
    }

    // Check if cart is empty
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    setIsSubmitting(true)

    try {
      // Check if order contains only free items
      const isFreeOrder = items.every((item) => item.price === 0)

      // Create order data structure
      const orderData = {
        id: uuidv4(),
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          colorway: item.colorway || "",
          jerseyName: item.jerseyName || "",
          jerseyNumber: item.jerseyNumber || "",
          team: item.team || "",
          size: item.size || "",
        })),
        customer: {
          ...formData,
          teamConfirmation: teamConfirmation,
        },
        total,
        paymentId: "PENDING",
        date: new Date().toISOString(),
        status: "new",
      }

      // Process payment or mark as free
      if (isFreeOrder) {
        orderData.paymentId = "FREE"
      } else {
        // In a real implementation, we would redirect to Square payment or use their SDK
        const paymentResult = await processSquarePayment({
          amount: total,
          currency: "AUD",
          customer: formData,
        })

        if (paymentResult.success) {
          orderData.paymentId = paymentResult.paymentId
        } else {
          throw new Error("Payment processing failed")
        }
      }

      // Save order
      const orderResult = await saveOrder(orderData)

      if (orderResult.success) {
        // Clear cart and redirect to confirmation page
        clearCart()

        if (orderResult.fallback) {
          toast({
            title: "Order processed locally",
            description: "Your order was saved locally due to connection issues with our server.",
          })
        } else {
          toast({
            title: "Order successful!",
            description: "Your order has been placed successfully.",
          })
        }

        router.push(`/confirmation?orderId=${orderData.id}`)
      } else {
        throw new Error("Failed to save order")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: `There was an error processing your order: ${error.message}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <Alert className="mb-8 border-amber-500">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle>Important Delivery Information</AlertTitle>
        <AlertDescription>
          Jerseys will only be delivered to AVC team training grounds and will not be shipped to individual addresses.
          You must be a team member or know someone on the team to collect your order.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Customer Information Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="teamConfirmation"
                    checked={teamConfirmation}
                    onCheckedChange={(checked) => setTeamConfirmation(checked === true)}
                  />
                  <Label
                    htmlFor="teamConfirmation"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I confirm that I am a member of an AVC team or know someone on a team who can collect my order at
                    training. I understand that orders will not be shipped to individual addresses.
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Processing..."
                    : items.every((item) => item.price === 0)
                      ? "Complete Free Order"
                      : "Proceed to Payment"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={item.imageSrc || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.colorway} / {item.size} / #{item.jerseyNumber}
                      </p>
                    </div>
                    <div className="font-semibold">{item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}</div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>To be calculated</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
