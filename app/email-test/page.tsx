"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function EmailTestPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    preview?: boolean
    messageId?: string
    error?: string
    debugInfo?: any
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred while sending the test email",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Email Test Tool</CardTitle>
          <CardDescription>Send a test email to verify your email configuration is working correctly.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {result && (
              <Alert
                className={
                  result.success
                    ? "border-green-500 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-300"
                    : "border-red-500 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                }
              >
                {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>
                  {result.message}
                  {result.preview && (
                    <div className="mt-2 text-sm">
                      <strong>Note:</strong> In preview/development mode, emails are not actually sent but logged to the
                      console.
                    </div>
                  )}
                  {result.messageId && (
                    <div className="mt-2 text-sm">
                      <strong>Message ID:</strong> {result.messageId}
                    </div>
                  )}
                  {result.error && (
                    <div className="mt-2 text-sm">
                      <strong>Error details:</strong> {result.error}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
            {result && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Debugging Information</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-xs font-mono overflow-x-auto">
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              </div>
            )}
          </CardContent>
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={async () => {
                try {
                  const response = await fetch("/api/email-debug")
                  const data = await response.json()
                  setResult({
                    success: true,
                    message: "Email configuration check complete",
                    debugInfo: data,
                  })
                } catch (error) {
                  setResult({
                    success: false,
                    message: "Failed to check email configuration",
                    error: error instanceof Error ? error.message : "Unknown error",
                  })
                }
              }}
            >
              Check Email Configuration
            </Button>
          </div>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Test Email"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
