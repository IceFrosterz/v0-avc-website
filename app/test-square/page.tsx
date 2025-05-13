"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SquarePaymentForm from "@/components/square-payment-form"
import { useToast } from "@/components/ui/use-toast"

export default function TestSquarePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handlePaymentSuccess = (paymentId: string) => {
    setIsSubmitting(false)
    setResult(`Payment successful! Payment ID: ${paymentId}`)
    toast({
      title: "Payment Successful",
      description: `Payment processed successfully. Payment ID: ${paymentId}`,
    })
  }

  const handlePaymentError = (error: Error) => {
    setIsSubmitting(false)
    setResult(`Payment failed: ${error.message}`)
    // Toast is already shown in the payment component
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Test Square Payment</h1>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              This page allows you to test the Square payment integration with a $1.00 test charge.
            </p>

            <SquarePaymentForm
              amount={1.0}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              isSubmitting={isSubmitting}
            />

            {result && (
              <div
                className={`mt-4 p-3 rounded ${result.includes("successful") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {result}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
