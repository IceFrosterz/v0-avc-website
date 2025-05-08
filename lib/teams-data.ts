// Team data with players and coaches
export const teamsData = [
  {
    id: 1,
    name: "Alliance Black SL1M",
    slug: "mens-sl1m-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our elite men's team competing in State League 1.",
    coaches: [],
    players: [],
  },
  {
    id: 2,
    name: "Alliance Gold SL1M",
    slug: "mens-sl1m-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division men's team competing in State League 1.",
    coaches: [],
    players: [],
  },
  {
    id: 3,
    name: "Alliance Black SL2M",
    slug: "mens-sl2m-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division men's team competing in State League 2.",
    coaches: [],
    players: [],
  },
  {
    id: 4,
    name: "Alliance Gold SL2M",
    slug: "mens-sl2m-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division men's team competing in State League 2.",
    coaches: [],
    players: [],
  },
  {
    id: 5,
    name: "Alliance White SL2M",
    slug: "mens-sl2m-white",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our white division men's team competing in State League 2.",
    coaches: [],
    players: [],
  },
  {
    id: 6,
    name: "Alliance Black SL3M",
    slug: "mens-sl3m-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division men's team competing in State League 3.",
    coaches: [],
    players: [],
  },
  {
    id: 7,
    name: "Alliance Gold SL3M",
    slug: "mens-sl3m-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division men's team competing in State League 3.",
    coaches: [],
    players: [],
  },
  {
    id: 8,
    name: "Alliance Black SL1W",
    slug: "womens-sl1w-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our elite women's team competing in State League 1.",
    coaches: [],
    players: [],
  },
  {
    id: 9,
    name: "Alliance Gold SL1W",
    slug: "womens-sl1w-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division women's team competing in State League 1.",
    coaches: [],
    players: [],
  },
  {
    id: 10,
    name: "Alliance Black SL2W",
    slug: "womens-sl2w-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division women's team competing in State League 2.",
    coaches: [],
    players: [],
  },
  {
    id: 11,
    name: "Alliance Gold SL2W",
    slug: "womens-sl2w-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division women's team competing in State League 2.",
    coaches: [],
    players: [],
  },
  {
    id: 12,
    name: "Alliance White SL2W",
    slug: "womens-sl2w-white",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our white division women's team competing in State League 2.",
    coaches: [],
    players: [],
  },
  {
    id: 13,
    name: "Alliance Black SL3W",
    slug: "womens-sl3w-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division women's team competing in State League 3.",
    coaches: [],
    players: [],
  },
  {
    id: 14,
    name: "Alliance Gold SL3W",
    slug: "womens-sl3w-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division women's team competing in State League 3.",
    coaches: [],
    players: [],
  },
  {
    id: 15,
    name: "Alliance JPLM",
    slug: "mens-jplm",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our junior premier league men's team.",
    coaches: [],
    players: [],
  },
  {
    id: 16,
    name: "Alliance U17 Black Boys",
    slug: "boys-u17-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division U17 boys team developing the next generation of talent.",
    coaches: [],
    players: [],
  },
  {
    id: 17,
    name: "Alliance U17 Gold Boys",
    slug: "boys-u17-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division U17 boys team developing the next generation of talent.",
    coaches: [],
    players: [],
  },
  {
    id: 18,
    name: "Alliance U17 Black Girls",
    slug: "girls-u17-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division U17 girls team developing the next generation of talent.",
    coaches: [],
    players: [],
  },
  {
    id: 19,
    name: "Alliance U17 Gold Girls",
    slug: "girls-u17-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division U17 girls team developing the next generation of talent.",
    coaches: [],
    players: [],
  },
]

// Helper function to get a team by slug
export function getTeamBySlug(slug: string) {
  return teamsData.find((team) => team.slug === slug)
}

// Helper function to get teams by category
export function getTeamsByCategory(category: "mens" | "womens" | "youth" | "all") {
  if (category === "all") return teamsData

  if (category === "mens") {
    return teamsData.filter((team) => team.slug.startsWith("mens-") || team.slug === "mens-jplm")
  }

  if (category === "womens") {
    return teamsData.filter((team) => team.slug.startsWith("womens-"))
  }

  if (category === "youth") {
    return teamsData.filter((team) => team.slug.startsWith("boys-") || team.slug.startsWith("girls-"))
  }

  return []
}
