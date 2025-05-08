"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DownloadCloud, Edit, Plus, Trash2 } from "lucide-react"
import { products, orders } from "@/lib/data"

// Function to convert orders data to CSV
const ordersToCSV = (orders) => {
  // CSV header
  const header = [
    "Order ID",
    "Date",
    "Customer Name",
    "Email",
    "Phone",
    "Product Name",
    "Colorway",
    "Jersey Name",
    "Jersey Number",
    "Team",
    "Size",
    "Price",
    "Payment ID",
  ].join(",")

  // CSV rows
  const rows = orders.flatMap((order) =>
    order.items.map((item) => {
      const row = [
        order.id,
        new Date(order.date).toLocaleDateString(),
        order.customer.name,
        order.customer.email,
        order.customer.phone,
        item.productName,
        item.colorway,
        item.jerseyName,
        item.jerseyNumber,
        item.team,
        item.size,
        `$${item.price.toFixed(2)}`,
        order.paymentId,
      ]
      return row.join(",")
    }),
  )

  return [header, ...rows].join("\n")
}

// Function to download CSV data
const downloadCSV = (csvString, filename) => {
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function AdminPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const handleExportOrders = () => {
    const csv = ordersToCSV(orders)
    downloadCSV(csv, `avc-orders-${new Date().toISOString().split("T")[0]}.csv`)
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportOrders}>
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        </div>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription>
                          {new Date(order.date).toLocaleDateString()} • {order.customer.name}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                        <div className="text-sm text-muted-foreground">
                          Payment: {order.paymentId === "FREE" ? "FREE ITEM" : order.paymentId}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Button
                      variant="ghost"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                    </Button>

                    {expandedOrder === order.id && (
                      <div className="mt-4 space-y-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                          <h4 className="font-medium mb-2">Customer Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Name:</span> {order.customer.name}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span> {order.customer.email}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span> {order.customer.phone}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                                <div className="flex justify-between mb-2">
                                  <span className="font-medium">{item.productName}</span>
                                  <span>${item.price.toFixed(2)}</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                                  <div>
                                    <span className="font-medium">Color:</span>{" "}
                                    {item.colorway.charAt(0).toUpperCase() + item.colorway.slice(1)}
                                  </div>
                                  <div>
                                    <span className="font-medium">Name:</span> {item.jerseyName}
                                  </div>
                                  <div>
                                    <span className="font-medium">Number:</span> {item.jerseyNumber}
                                  </div>
                                  <div>
                                    <span className="font-medium">Team:</span> {item.team}
                                  </div>
                                  <div>
                                    <span className="font-medium">Size:</span> {item.size}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No orders found.</p>
          )}
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          {products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{product.name}</CardTitle>
                      <div className="font-semibold">
                        {product.isFree ? "FREE" : `$${product.basePrice.toFixed(2)}`}
                      </div>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No products found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
