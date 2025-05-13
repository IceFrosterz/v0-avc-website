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
import SquarePaymentForm from "@/components/square-payment-form"

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
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [orderId] = useState(uuidv4()) // Generate order ID upfront

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinueToPayment = (e: React.FormEvent) => {
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

    // Check if order contains only free items
    const isFreeOrder = items.every((item) => item.price === 0)

    if (isFreeOrder) {
      // Process free order directly
      handleFreeOrderSubmit()
    } else {
      // Show payment form for paid orders
      setShowPaymentForm(true)
    }
  }

  const handleFreeOrderSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Create order data structure for free order
      const orderData = {
        id: orderId,
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
        total: 0,
        paymentId: "FREE",
        date: new Date().toISOString(),
        status: "new",
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
            description: "Your free order has been placed successfully.",
          })
        }

        // Send email confirmation for free order
        try {
          await fetch("/api/send-confirmation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError)
          // Don't block the checkout process if email fails
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

  const handlePaymentSuccess = async (paymentId: string) => {
    setIsSubmitting(true)

    try {
      // Create order data structure with payment ID
      const orderData = {
        id: orderId,
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
        paymentId,
        date: new Date().toISOString(),
        status: "paid",
      }

      // Save order
      const orderResult = await saveOrder(orderData)

      if (orderResult.success) {
        // Clear cart and redirect to confirmation page
        clearCart()

        toast({
          title: "Payment successful!",
          description: "Your order has been placed successfully.",
        })

        // Send email confirmation
        try {
          await fetch("/api/send-confirmation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError)
          // Don't block the checkout process if email fails
        }

        router.push(`/confirmation?orderId=${orderData.id}`)
      } else {
        throw new Error("Failed to save order")
      }
    } catch (error) {
      console.error("Order processing error:", error)
      toast({
        title: "Order processing failed",
        description: `Payment was successful, but there was an error saving your order: ${error.message}. Please contact support.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentError = (error: Error) => {
    console.error("Payment error:", error)
    setIsSubmitting(false)
    // Toast is already shown in the payment component
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
            <form onSubmit={handleContinueToPayment}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={showPaymentForm || isSubmitting}
                  />
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
                    disabled={showPaymentForm || isSubmitting}
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
                    disabled={showPaymentForm || isSubmitting}
                  />
                </div>
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="teamConfirmation"
                    checked={teamConfirmation}
                    onCheckedChange={(checked) => setTeamConfirmation(checked === true)}
                    disabled={showPaymentForm || isSubmitting}
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

              {!showPaymentForm && (
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Processing..."
                      : items.every((item) => item.price === 0)
                        ? "Complete Free Order"
                        : "Continue to Payment"}
                  </Button>
                </CardFooter>
              )}
            </form>

            {/* Show Square Payment Form if needed */}
            {showPaymentForm && total > 0 && (
              <CardContent>
                <SquarePaymentForm
                  amount={total}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  isSubmitting={isSubmitting}
                />
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentForm(false)}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    Back to Customer Information
                  </Button>
                </div>
              </CardContent>
            )}
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
