import { executeQuery } from "../lib/db"
import { products } from "../lib/data"

async function seedProducts() {
  try {
    console.log("Seeding products...")

    // Clear existing products
    await executeQuery("DELETE FROM products")

    // Insert products
    for (const product of products) {
      await executeQuery(
        "INSERT INTO products (id, name, description, base_price, is_free) VALUES ($1, $2, $3, $4, $5)",
        [product.id, product.name, product.description, product.basePrice, product.isFree || false],
      )

      console.log(`Added product: ${product.name}`)
    }

    console.log("Products seeded successfully!")
  } catch (error) {
    console.error("Error seeding products:", error)
  }
}

// Run the seed function
seedProducts()
