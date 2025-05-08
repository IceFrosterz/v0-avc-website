"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-lg text-muted-foreground mb-8">Your cart is empty.</p>
        <Button asChild>
          <a href="/">Back to Shop</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-32 h-32 relative">
                  <Image
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="text-sm text-muted-foreground space-y-1 mt-2">
                        <p>Color: {item.colorway.charAt(0).toUpperCase() + item.colorway.slice(1)}</p>
                        <p>Name: {item.jerseyName}</p>
                        <p>Number: {item.jerseyNumber}</p>
                        <p>Team: {item.team}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}</div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 mt-2"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>To be calculated</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push("/checkout")}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
