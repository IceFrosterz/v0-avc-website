// Product types and data
export type Product = {
  id: string
  name: string
  description: string
  basePrice: number
  images: {
    red: string
    black: string
    white: string
    custom: string
  }
  isFree?: boolean
}

export type Colorway = "Black" | "White"
export type Size = "2XS" | "XS" | "S" | "M" | "L" | "XL" | "XXL"
export type Team = "RW1 Gold" | "RW1 Black" | "RW2 Gold" | "RW2 Black" | "RW2 White" | "RW3 Gold" | "RW3 Black" | "RM1 Gold" | "RM1 Black" | "RM2 Gold" | "RM2 Black" | "RM2 White" | "RM3 Gold" | "RM3 Black" | "JPLM" | "U17B1 Gold" | "U17B1 Black" | "U17G1 Gold" | "U17G1 Black" | "Training Squad"

// Product data
export const products: Product[] = [
  {
    id: "jersey-v1",
    name: "AVC Standard Jersey",
    description: "Official Alliance Volleyball Club jersey with customizable options.",
    basePrice: 59.99,
    images: {
      red: "/placeholder.svg?height=600&width=500&text=Red+Jersey",
      black: "/placeholder.svg?height=600&width=500&text=Black+Jersey",
      white: "/placeholder.svg?height=600&width=500&text=White+Jersey",
      custom: "/placeholder.svg?height=600&width=500&text=Custom+Jersey",
    },
  },
  {
    id: "test-jersey",
    name: "Test Jersey",
    description: "Try our customization with this free test jersey. No payment required.",
    basePrice: 0,
    isFree: true,
    images: {
      red: "/placeholder.svg?height=600&width=500&text=Test+Red+Jersey",
      black: "/placeholder.svg?height=600&width=500&text=Test+Black+Jersey",
      white: "/placeholder.svg?height=600&width=500&text=Test+White+Jersey",
      custom: "/placeholder.svg?height=600&width=500&text=Test+Custom+Jersey",
    },
  },
]

// Options data
export const colorOptions: { value: Colorway; label: string }[] = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
]

export const sizeOptions: { value: Size; label: string }[] = [
  { value: "2XS", label: "Double Extra Small (2XS)"},
  { value: "XS", label: "Extra Small (XS)" },
  { value: "S", label: "Small (S)" },
  { value: "M", label: "Medium (M)" },
  { value: "L", label: "Large (L)" },
  { value: "XL", label: "Extra Large (XL)" },
  { value: "XXL", label: "Double Extra Large (XXL)" },
]

export const teamOptions: { value: Team; label: string }[] = [
  { value: "RW1 Gold", label: "RW1 Gold" },
  { value: "RW1 Black", label: "RW1 Black" },
  { value: "RW2 Gold", label: "RW2 Gold" },
  { value: "RW2 Black", label: "RW2 Black" },
  { value: "RW2 White", label: "RW2 White" },
  { value: "RW3 Gold", label: "RW3 Gold" },
  { value: "RW3 Black", label: "RW3 Black" },
  { value: "RM1 Gold", label: "RM1 Gold" },
  { value: "RM1 Black", label: "RM1 Black" },
  { value: "RM2 Gold", label: "RM2 Gold" },
  { value: "RM2 Black", label: "RM2 Black" },
  { value: "RM2 White", label: "RM2 White" },
  { value: "RM3 Gold", label: "RM3 Gold" },
  { value: "RM3 Black", label: "RM3 Black" },
  { value: "JPLM", label: "JPLM" },
  { value: "U17B1 Gold", label: "U17B1 Gold" },
  { value: "U17B1 Black", label: "U17B1 Black" },
  { value: "U17G1 Gold", label: "U17G1 Gold" },
  { value: "U17G1 Black", label: "U17G1 Black" },
  { value: "Training Squad", label: "Training Squad" },
];


// Sponsors data
export type Sponsor = {
  id: string
  name: string
  logo: string
  description: string
  website?: string
}

export const sponsors: Sponsor[] = [
  {
    id: "pharmacy-smart",
    name: "Pharmacy Smart & Compounding",
    logo: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/PSP_Sponsor-0eThCPtOzZVz6uxNWXUkkY4TRAYcyC.png?height=200&width=200&text=Pharmacy+Smart",
    description: "Providing quality pharmaceutical services and compounding solutions to the community.",
    website: "https://www.pharmacysmart.com",
  },
  {
    id: "knox-physio",
    name: "Knox Physio & Co",
    logo: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/KPC_Sponsor-cBn7BE3IbA6dEF9MIERL4uWvasVXWj.png?height=200&width=200&text=Knox+Physio",
    description: "Specialized physiotherapy services for athletes and the general public.",
    website: "https://www.knoxphysio.com",
  },
]

// Achievements data
export type Achievement = {
  id: string
  title: string
  year: number
  description: string
  image?: string
  category: "VVL" | "Tournament" | "Award"
}

export const achievements: Achievement[] = [
  {
    id: "vvl-2023",
    title: "VVL State League Championship",
    year: 2023,
    description: "Men's team won gold in the Volleyball Victoria League State League Championship.",
    image: "/placeholder.svg?height=400&width=600&text=VVL+Championship+2023",
    category: "VVL",
  },
  {
    id: "tournament-2023",
    title: "Eastern Regional Tournament",
    year: 2023,
    description: "Women's team secured silver medal at the Eastern Regional Tournament.",
    image: "/placeholder.svg?height=400&width=600&text=Eastern+Regional+2023",
    category: "Tournament",
  },
  {
    id: "award-2023",
    title: "Club of the Year",
    year: 2023,
    description: "Alliance VC recognized as Club of the Year by the Volleyball Victoria Association.",
    image: "/placeholder.svg?height=400&width=600&text=Club+Award+2023",
    category: "Award",
  },
  {
    id: "vvl-2022",
    title: "VVL State League Finals",
    year: 2022,
    description: "Both men's and women's teams reached the VVL State League Finals.",
    image: "/placeholder.svg?height=400&width=600&text=VVL+Finals+2022",
    category: "VVL",
  },
]

// Gallery data
export type GalleryItem = {
  id: string
  title: string
  image: string
  tags: {
    team: Team | "All Teams"
    year: string
    competitionType: "VVL" | "Socials" | "Training" | "Finals" | "Tournament"
  }
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Alliance Gold vs Derrimut Knights SL1M Quarter-Finals",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-QF-2024-sbe2FgICvGHaQMoNnCoWkKpI1VfyWb.jpg?height=800&width=1200&text=Men's+Team+Victory",
    tags: {
      team: "Alliance Gold SL1M",
      year: "2024",
      competitionType: "Finals",
    },
  },
  {
    id: "gallery-2",
    title: "Women's Team Training",
    image: "/placeholder.svg?height=800&width=1200&text=Women's+Team+Training",
    tags: {
      team: "AVC B",
      year: "2023",
      competitionType: "Training",
    },
  },
  {
    id: "gallery-3",
    title: "Social League Match",
    image: "/placeholder.svg?height=800&width=1200&text=Social+League+Match",
    tags: {
      team: "Social",
      year: "2022",
      competitionType: "Socials",
    },
  },
  {
    id: "gallery-4",
    title: "VVL Tournament",
    image: "/placeholder.svg?height=800&width=1200&text=VVL+Tournament",
    tags: {
      team: "AVC A",
      year: "2022",
      competitionType: "VVL",
    },
  },
  {
    id: "gallery-5",
    title: "Training Session",
    image: "/placeholder.svg?height=800&width=1200&text=Training+Session",
    tags: {
      team: "AVC C",
      year: "2023",
      competitionType: "Training",
    },
  },
  {
    id: "gallery-6",
    title: "Championship Match",
    image: "/placeholder.svg?height=800&width=1200&text=Championship+Match",
    tags: {
      team: "AVC A",
      year: "2023",
      competitionType: "Finals",
    },
  },
]

// Order type for handling saved orders
export type Order = {
  id: string
  items: {
    productId: string
    productName: string
    price: number
    colorway: Colorway
    jerseyName: string
    jerseyNumber: string
    team: Team
    size: Size
  }[]
  customer: {
    name: string
    email: string
    phone: string
  }
  total: number
  paymentId: string | "FREE"
  date: string
}

// Mock orders for admin demonstration
export const orders: Order[] = [
  {
    id: "ord-001",
    items: [
      {
        productId: "jersey-v1",
        productName: "AVC Standard Jersey",
        price: 59.99,
        colorway: "red",
        jerseyName: "SMITH",
        jerseyNumber: "10",
        team: "AVC A",
        size: "M",
      },
    ],
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "0412345678",
    },
    total: 59.99,
    paymentId: "sqp-12345678",
    date: "2023-04-15T10:30:00Z",
  },
  {
    id: "ord-002",
    items: [
      {
        productId: "test-jersey",
        productName: "Test Jersey",
        price: 0,
        colorway: "black",
        jerseyName: "JOHNSON",
        jerseyNumber: "7",
        team: "AVC B",
        size: "L",
      },
    ],
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "0423456789",
    },
    total: 0,
    paymentId: "FREE",
    date: "2023-04-16T14:45:00Z",
  },
]
