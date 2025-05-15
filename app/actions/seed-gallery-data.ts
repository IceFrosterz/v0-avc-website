"use server"

import { executeQuery } from "@/lib/db"
import { addGalleryItem } from "./gallery-actions"

// Sample gallery data organized by year and album
const galleryData = {
  "2024": {
    "Volleyball Victoria League": [
      {
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-sbe2FgICvGHaQMoNnCoWkKpI1VfyWb.jpg?height=800&width=1200&text=Warrnambool+Tournament+2024+1",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10",
        tags: {
          team: "Alliance Gold SL1M",
          competitionType: "State League",
        },
        photographer: {
          name: "Issac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-2-DF7AWLO0nka8tQNjgsftv1y2prA4t9.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+2",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10",
        tags: {
          team: "Alliance Gold SL1M",
          competitionType: "State League",
        },
        photographer: {
          name: "Issac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-3-BjCP0p3yMcWJh1enxC3HzFXcCTeIEi.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+3",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10",
        tags: {
          team: "Alliance Gold SL1M",
          competitionType: "State League",
        },
        photographer: {
          name: "Issac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-4-fYngyDUzxYWHyZr11sPpGGNWDa18U0.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+4",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10",
        tags: {
          team: "Alliance Gold SL1M",
          competitionType: "State League",
        },
        photographer: {
          name: "Issac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-5-UTMOh55297NinXx0o3JB7igXSfYsVP.jpg?height=800&width=1200&text=VVL+Res+1+QF+2024+5",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-08-10",
        tags: {
          team: "Alliance Gold SL1M",
          competitionType: "State League",
        },
        photographer: {
          name: "Issac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        title: "Alliance Black competing in Week 13",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-3-Black-2024-3RfMwn7WtXDQ7VF8fSeYOwYrjEqwPq.jpg?height=800&width=1200&text=Warrnambool+Tournament+2024+2",
        album: "Volleyball Victoria League",
        year: "2024",
        date: "2024-07-06",
        tags: {
          team: "Alliance Black SL3M",
          competitionType: "State League",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
    ],
    "Australian Club Volleyball Championships": [
      {
        title: "Team Photo",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-ACVC-1-sWZYBcG70ND3TZ5ZmaP93X5EaTmVLx.jpeg?height=800&width=1200&text=ACVC+2024+1",
        album: "Australian Club Volleyball Championships",
        year: "2024",
        date: "2024-09-22",
        tags: {
          team: "Alliance",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "NA",
          instagram: "",
        },
      },
      {
        title: "Team Photo",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-ACVC-2-kfVWmIRHKMDCqDAngqlVOnH827sE5B.jpeg?height=800&width=1200&text=ACVC+2024+1",
        album: "Australian Club Volleyball Championships",
        year: "2024",
        date: "2024-09-22",
        tags: {
          team: "Alliance",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "NA",
          instagram: "",
        },
      },
    ],
  },
  "2025": {
    "Seaside Volleyball Tournament": [
      {
        title: "After Winning a Point",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%281%29-O42KSDdq5M9F8XXdwQAvKayPArSL5Z.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
        album: "Seaside Volleyball Tournament",
        year: "2025",
        date: "2025-03-09",
        tags: {
          team: "Tournament Team",
          competitionType: "Tournament",
        },
        photographer: {
          name: "Mike Johnson",
          instagram: "mikejphoto",
        },
      },
      {
        title: "Group Photo",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%282%29-hiQ4MQq2QeUjjeHuAQf2NonaBu5mKS.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
        album: "Seaside Volleyball Tournament",
        year: "2025",
        date: "2025-03-09",
        tags: {
          team: "Tournament Team",
          competitionType: "Tournament",
        },
        photographer: {
          name: "Mike Johnson",
          instagram: "mikejphoto",
        },
      },
      {
        title: "Supporting each other!",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/SVT%20%283%29-CQDiXpm4GIWKhhhzjQTVoc2N2DlijG.jpg?height=800&width=1200&text=KVA+Tournament+2024+1",
        album: "Seaside Volleyball Tournament",
        year: "2025",
        date: "2025-03-09",
        tags: {
          team: "Tournament Team",
          competitionType: "Tournament",
        },
        photographer: {
          name: "Mike Johnson",
          instagram: "mikejphoto",
        },
      },
    ],
    "Ballarat Tournament": [
      {
        title: "One-handed Set",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%283%29-EOBrOd9QQw4ADyUnU94gKZ4UDjyCyW.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+1",
        album: "Ballarat Tournament",
        year: "2025",
        date: "2025-03-22",
        tags: {
          team: "Alliance Gold SL3M",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        title: "Team Cheering",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%281%29-hDyIWvLv12FjG6tLf9q4zABM14JjAz.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+2",
        album: "Ballarat Tournament",
        year: "2025",
        date: "2025-03-22",
        tags: {
          team: "Alliance Gold SL3M",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
      {
        title: "Winning a Point",
        image:
          "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Gold-SL3M-Ballarat-Div-3%20%282%29-NJ4cOZ7ifqgXoefrlnBVSS8FUeuggD.jpg?height=800&width=1200&text=Ballarat+Tournament+2025+3",
        album: "Ballarat Tournament",
        year: "2025",
        date: "2025-03-22",
        tags: {
          team: "Alliance Gold SL3M",
          competitionType: "Other Tournaments",
        },
        photographer: {
          name: "Isaac Ho",
          instagram: "geeboodoesthings",
        },
      },
    ],
  },
}

export async function seedGalleryData() {
  try {
    // First, check if we already have data
    const existingData = await executeQuery("SELECT COUNT(*) as count FROM gallery_items")
    if (existingData[0].count > 0) {
      return { success: true, message: "Gallery data already exists" }
    }

    // Process and insert all gallery items
    for (const [year, yearData] of Object.entries(galleryData)) {
      for (const [album, items] of Object.entries(yearData)) {
        for (const item of items) {
          await addGalleryItem(item)
        }
      }
    }

    return { success: true, message: "Gallery data seeded successfully" }
  } catch (error) {
    console.error("Error seeding gallery data:", error)
    return { success: false, error: "Failed to seed gallery data" }
  }
}
