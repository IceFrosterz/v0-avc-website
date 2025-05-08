"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"
import { products, colorOptions, sizeOptions, teamOptions, type Colorway } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === params.id)

  const [colorway, setColorway] = useState<Colorway>("black")
  const [jerseyName, setJerseyName] = useState("")
  const [jerseyNumber, setJerseyNumber] = useState("")
  const [team, setTeam] = useState(teamOptions[0].value)
  const [size, setSize] = useState(sizeOptions[2].value) // Default to Medium

  // If product not found, show error state
  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">The product you are looking for does not exist.</p>
        <Button asChild>
          <a href="/">Back to Shop</a>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Validate required fields
    if (!jerseyName || !jerseyNumber || !team || !size) {
      toast({
        title: "Please complete all fields",
        description: "All customization options are required to add this item to your cart.",
        variant: "destructive",
      })
      return
    }

    // Add item to cart
    addItem({
      id: uuidv4(),
      name: product.name,
      price: product.basePrice,
      colorway,
      jerseyName,
      jerseyNumber,
      team,
      size,
      imageSrc: product.images[colorway],
    })

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })

    // If this is the only item and it's free, redirect to checkout
    if (product.isFree) {
      router.push("/checkout")
    } else {
      router.push("/cart")
    }
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Preview */}
        <div className="bg-gray-900 rounded-lg p-8 flex items-center justify-center">
          <div className="relative aspect-[3/4] w-full max-w-md">
            <Image
              src={product.images[colorway] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
            {/* Preview of customization */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {jerseyName && (
                <div className="absolute top-1/3 transform -translate-y-1/2 bg-gray-900/70 px-3 py-1 rounded text-white font-bold">
                  {jerseyName}
                </div>
              )}
              {jerseyNumber && (
                <div className="absolute top-1/2 transform -translate-y-1/2 bg-gray-900/70 px-4 py-2 rounded text-white text-4xl font-bold">
                  {jerseyNumber}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customization Form */}
        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
            <div className="text-2xl font-bold mt-2">
              {product.isFree ? "FREE" : `$${product.basePrice.toFixed(2)}`}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="colorway">Colorway</Label>
              <Select value={colorway} onValueChange={(value: Colorway) => setColorway(value)}>
                <SelectTrigger id="colorway">
                  <SelectValue placeholder="Select colorway" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jerseyName">Name on Jersey</Label>
              <Input
                id="jerseyName"
                value={jerseyName}
                onChange={(e) => setJerseyName(e.target.value.toUpperCase())}
                placeholder="SMITH"
                maxLength={15}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jerseyNumber">Jersey Number</Label>
              <Input
                id="jerseyNumber"
                value={jerseyNumber}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/[^0-9]/g, "")
                  if (value.length <= 2) {
                    setJerseyNumber(value)
                  }
                }}
                placeholder="10"
                maxLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Select value={team} onValueChange={setTeam}>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teamOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAddToCart}>
              {product.isFree ? "Proceed to Checkout" : "Add to Cart"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
