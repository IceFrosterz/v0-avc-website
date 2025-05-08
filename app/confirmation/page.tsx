"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    // In a real application, you would fetch the order details from your API
    // For this demo, we'll just simulate it
    if (orderId) {
      setTimeout(() => {
        setOrderDetails({
          id: orderId,
          date: new Date().toLocaleDateString(),
        })
      }, 500)
    }
  }, [orderId])

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
                <span>{orderDetails.date}</span>
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
