import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/data"

export default function ShopPage() {
  // Fallback products in case the imported ones have issues
  const fallbackProducts = [
    {
      id: "jersey-v1",
      name: "AVC Standard Jersey",
      description: "Official Alliance Volleyball Club jersey with customizable options.",
      basePrice: 49.99,
      images: {
        black: "/placeholder.svg?height=600&width=500&text=Black+Jersey",
      },
    },
    {
      id: "test-jersey",
      name: "Test Jersey",
      description: "Try our customization with this free test jersey. No payment required.",
      basePrice: 0,
      isFree: true,
      images: {
        black: "/placeholder.svg?height=600&width=500&text=Test+Jersey",
      },
    },
  ]

  // Use the imported products or fallback to our hardcoded ones if there's an issue
  const displayProducts = products && products.length > 0 ? products : fallbackProducts

  // Function to safely get image URL
  const getProductImage = (product: any) => {
    try {
      // Try to get the image in the new format
      if (product.images?.black?.front) {
        return product.images.black.front
      }

      // Try to get the image in the old format
      if (typeof product.images?.black === "string") {
        return product.images.black
      }

      // Fallback to any available image
      const firstColorway = Object.keys(product.images || {})[0]
      if (firstColorway) {
        const image = product.images[firstColorway]
        if (typeof image === "string") {
          return image
        }
        if (image?.front) {
          return image.front
        }
      }

      // Ultimate fallback
      return "/placeholder.svg?height=600&width=500&text=Product+Image"
    } catch (error) {
      console.error("Error getting product image:", error)
      return "/placeholder.svg?height=600&width=500&text=Product+Image"
    }
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Alliance VC Team Shop</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Customize and order your official Alliance Volleyball Club jerseys and merchandise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={getProductImage(product) || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority={product.id === displayProducts[0].id}
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {product.name}
                {product.isFree ? (
                  <span className="bg-amber-500 text-black text-sm px-2 py-1 rounded">FREE</span>
                ) : (
                  <span>${product.basePrice.toFixed(2)}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/products/${product.id}`}>Customize Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
