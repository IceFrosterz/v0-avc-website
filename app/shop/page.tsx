import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/data"

export default function ShopPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Alliance VC Team Shop</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Customize and order your official Alliance Volleyball Club jerseys and merchandise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={product.images.black || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority={product.id === products[0].id}
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
