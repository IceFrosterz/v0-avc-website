import { type NextRequest, NextResponse } from "next/server"
import { seedGalleryData } from "@/app/actions/seed-gallery-data"

export async function GET(request: NextRequest) {
  try {
    const result = await seedGalleryData()

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in seed gallery API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
