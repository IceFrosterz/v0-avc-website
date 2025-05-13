"use client"

import type React from "react"

// Only updating the relevant parts of the checkout page that handle free orders

import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/ui/use-toast"

// Inside the handleSubmit function, ensure free orders are properly flagged and processed
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Mocked variables - replace with actual data fetching/state management
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [teamConfirmation, setTeamConfirmation] = useState(false)
  const { items, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const total = items.reduce((acc, item) => acc + item.price, 0)

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
      console.log("Free order detected:", orderData)
    } else {
      // In a real implementation, we would redirect to Square payment or use their SDK
      const processSquarePayment = async (paymentDetails: any) => {
        // Mock implementation
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, paymentId: "MOCK_PAYMENT_ID" })
          }, 500)
        })
      }
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
    const saveOrder = async (orderData: any) => {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, fallback: false })
        }, 500)
      })
    }
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

export default function CheckoutPage() {
  return (
    <div>
      {/* Your checkout page content here */}
      <p>Checkout Page Content</p>
    </div>
  )
}
