// Team data with players and coaches
export type Player = {
  id: number
  name: string
  number: string
  position?: string
  isCaptain?: boolean
}

export type Coach = {
  id: number
  name: string
  role: string
  bio?: string
}

export const teamsData = [
  {
    id: 1,
    name: "Alliance Black SL1M",
    slug: "mens-sl1m-black",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Black-Mens-FKYvFOYG7dIQDEcLkxJD0igkXNjFqs.jpg?height=600&width=800",
    description: "Our elite men's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing elite volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Benson Lin", number: "1" },
      { id: 2, name: "Cayden Scanlon", number: "2" },
      { id: 3, name: "Timothy Chee", number: "3" },
      { id: 4, name: "Patrick Dumiter", number: "7" },
      { id: 5, name: "Wang Ho Matthew Wong", number: "17" },
      { id: 6, name: "Caleb Lau", number: "30" },
      { id: 7, name: "Brendan Leung", number: "34" },
      { id: 8, name: "Matthew Chen", number: "48" },
      { id: 9, name: "Paul Wong", number: "48" },
      { id: 10, name: "Amos Woon", number: "49" },
      { id: 11, name: "Patrick Cirdei", number: "68" },
      { id: 12, name: "Chamnan Dy", number: "80" },
      { id: 13, name: "Jiunn Chua", number: "14" },
    ],
  },
  {
    id: 2,
    name: "Alliance Gold SL1M",
    slug: "mens-sl1m-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division men's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing elite volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Vincent Ho", number: "5" },
      { id: 2, name: "Jordan Thai", number: "6" },
      { id: 3, name: "Abraham Jo", number: "7" },
      { id: 4, name: "Nicholas Bowman", number: "10" },
      { id: 5, name: "Henry Mazzaferri", number: "11" },
      { id: 6, name: "Anthony (Thi) Nguyen", number: "12" },
      { id: 7, name: "Marlin Mei", number: "14" },
      { id: 8, name: "Jasper Tang", number: "19" },
      { id: 9, name: "Wenhao Liang", number: "20" },
      { id: 10, name: "Hai Duc Vu", number: "22" },
      { id: 11, name: "Connor McCrae", number: "24" },
      { id: 12, name: "Jinbo Xie", number: "25" },
      { id: 13, name: "Minh Duc Do", number: "28" },
    ],
  },
  {
    id: 3,
    name: "Alliance Black SL2M",
    slug: "mens-sl2m-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division men's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Yiheng Yap", number: "1" },
      { id: 2, name: "Jayden Lee", number: "13" },
      { id: 3, name: "Timothy Wong", number: "15" },
      { id: 4, name: "Hyunjae Hwang", number: "16" },
      { id: 5, name: "Robin Kim", number: "20" },
      { id: 6, name: "Aaron Stephen", number: "36" },
      { id: 7, name: "Jie Zhou", number: "42" },
      { id: 8, name: "Leonard Wang", number: "44" },
      { id: 9, name: "Ryan Cheng", number: "45" },
      { id: 10, name: "Liam Hanrahan", number: "46" },
      { id: 11, name: "Rishav Chandra", number: "50" },
    ],
  },
  {
    id: 4,
    name: "Alliance Gold SL2M",
    slug: "mens-sl2m-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division men's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Alexander Nichols", number: "4" },
      { id: 2, name: "Natch Surana", number: "9" },
      { id: 3, name: "Jun Hao Ng", number: "23" },
      { id: 4, name: "Jeff Xie", number: "26" },
      { id: 5, name: "Danny Luong", number: "29" },
      { id: 6, name: "Nicolas Villegas", number: "31" },
      { id: 7, name: "Letian Cao", number: "32" },
      { id: 8, name: "Hayden McEwan", number: "33" },
      { id: 9, name: "Edwyn Chy", number: "37" },
      { id: 10, name: "Austin Li", number: "38" },
      { id: 11, name: "Chaipacha Buranavanitchakron", number: "41" },
      { id: 12, name: "Jian Shu Gao", number: "80" },
    ],
  },
  {
    id: 5,
    name: "Alliance White SL2M",
    slug: "mens-sl2m-white",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our white division men's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Samuel Wong", number: "2" },
      { id: 2, name: "Kaleb Larkins", number: "4" },
      { id: 3, name: "Nicolas Tan", number: "9" },
      { id: 4, name: "Joel Daff", number: "11" },
      { id: 5, name: "Paul Wong", number: "14" },
      { id: 6, name: "Adam Soo", number: "35" },
      { id: 7, name: "Andrew Chan", number: "51" },
      { id: 8, name: "Daniel Tan", number: "53" },
      { id: 9, name: "Michael Chen", number: "54" },
      { id: 10, name: "Senuth Chanmira Arachchi Appuhamilage", number: "61" },
      { id: 11, name: "Wesley Chan", number: "78" },
      { id: 12, name: "Ryco Pathaphan", number: "90" },
    ],
  },
  {
    id: 6,
    name: "Alliance Black SL3M",
    slug: "mens-sl3m-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division men's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Jayden Kok", number: "36" },
      { id: 2, name: "Iric Tunglut", number: "51" },
      { id: 3, name: "Victor Phan", number: "55" },
      { id: 4, name: "Julian Stajcer", number: "56" },
      { id: 5, name: "Max Hiew", number: "58" },
      { id: 6, name: "Sion Tan", number: "59" },
      { id: 7, name: "Andy Vuong", number: "60" },
      { id: 8, name: "Griffin Tang", number: "74" },
      { id: 9, name: "Theodore Lie", number: "87" },
      { id: 10, name: "Cuong Pham", number: "88" },
      { id: 11, name: "Joseph Hartono", number: "89" },
    ],
  },
  {
    id: 7,
    name: "Alliance Gold SL3M",
    slug: "mens-sl3m-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division men's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Andy Chan", number: "7" },
      { id: 2, name: "Jerome Liew", number: "24" },
      { id: 3, name: "Jaiden Bagley", number: "57", isCaptain: true },
      { id: 4, name: "Gabriel Aditya", number: "62" },
      { id: 5, name: "Jason Ho", number: "63" },
      { id: 6, name: "Isaiah Joseph", number: "64" },
      { id: 7, name: "Elton Lim", number: "65" },
      { id: 8, name: "Wing Ho Lucas Chan", number: "66" },
      { id: 9, name: "Jason Wynn", number: "69" },
      { id: 10, name: "Ivan Chen", number: "70" },
      { id: 11, name: "Colin Chen", number: "71" },
      { id: 12, name: "Phee Hsien (Julian) Yeoh", number: "72" },
      { id: 13, name: "Michael Antolini", number: "73" },
      { id: 14, name: "Hugh Edwards", number: "N/A" },
    ],
  },
  {
    id: 8,
    name: "Alliance Black SL1W",
    slug: "womens-sl1w-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our elite women's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing elite volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Nuchanart Sensuk", number: "5" },
      { id: 2, name: "Nazee Kartelaie", number: "7" },
      { id: 3, name: "Stefanie Tien", number: "8" },
      { id: 4, name: "Nicole Ng", number: "12" },
      { id: 5, name: "Michelle Chhour", number: "15" },
      { id: 6, name: "Wing Yan Chan", number: "16" },
      { id: 7, name: "Sin Ting Leung", number: "22" },
      { id: 8, name: "Maxxine Xavier Alimpoos", number: "24" },
      { id: 9, name: "Karina Kresnadi", number: "29" },
      { id: 10, name: "Evelyn Kosasih", number: "36" },
    ],
  },
  {
    id: 9,
    name: "Alliance Gold SL1W",
    slug: "womens-sl1w-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division women's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing elite volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Angel Kwan", number: "2" },
      { id: 2, name: "Hoi Ting Lee", number: "3" },
      { id: 3, name: "Phoebe Lee", number: "6" },
      { id: 4, name: "Vanessa Do", number: "11" },
      { id: 5, name: "Stephanie Song", number: "13" },
      { id: 6, name: "Bianca Curnow", number: "21" },
      { id: 7, name: "Lian Lu", number: "30" },
      { id: 8, name: "Yannie Lee", number: "31" },
      { id: 9, name: "Yun Shang Tan", number: "32" },
      { id: 10, name: "Sam Burchett", number: "35" },
      { id: 11, name: "Noelle Mai", number: "68" },
      { id: 12, name: "Milka Kurnia Surja", number: "69" },
      { id: 13, name: "Vivienne Lai", number: "70" },
    ],
  },
  {
    id: 10,
    name: "Alliance Black SL2W",
    slug: "womens-sl2w-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division women's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Eugenie Zhan", number: "1" },
      { id: 2, name: "Justine Tay", number: "5" },
      { id: 3, name: "Man Wah Shiu", number: "14" },
      { id: 4, name: "Kristen Koon", number: "17" },
      { id: 5, name: "Emilie Lam", number: "20" },
      { id: 6, name: "Natalie Tran", number: "22" },
      { id: 7, name: "Helena Li", number: "23" },
      { id: 8, name: "Thea Ng", number: "28" },
      { id: 9, name: "Vivienne lay", number: "37" },
      { id: 10, name: "Emily Hiew", number: "38" },
      { id: 11, name: "Felicity Zheng", number: "40" },
    ],
  },
  {
    id: 11,
    name: "Alliance Gold SL2W",
    slug: "womens-sl2w-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division women's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Marcellina Lu", number: "4" },
      { id: 2, name: "Shannon Coombes", number: "10" },
      { id: 3, name: "Kimberley Xu", number: "44" },
      { id: 4, name: "Holly Zhang", number: "45" },
      { id: 5, name: "Annie Huang", number: "46" },
      { id: 6, name: "Natalie Chen", number: "47" },
      { id: 7, name: "Suet Ying Lau", number: "48" },
      { id: 8, name: "Cheuk Ying Chung", number: "49" },
      { id: 9, name: "Vanessa Ortega Lopez", number: "65" },
      { id: 10, name: "Lok Ho", number: "91" },
    ],
  },
  {
    id: 12,
    name: "Alliance White SL2W",
    slug: "womens-sl2w-white",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our white division women's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Vanessa Jin", number: "53" },
      { id: 2, name: "Angelica Hui", number: "9" },
      { id: 3, name: "Isabel Koay", number: "16" },
      { id: 4, name: "Soraya Mazoori", number: "18" },
      { id: 5, name: "Sarah Louey", number: "27" },
      { id: 6, name: "Ha Phuong Nguyen", number: "28" },
      { id: 7, name: "Bella Ferrier", number: "33" },
      { id: 8, name: "Delina Pham", number: "39" },
      { id: 9, name: "Jasmin Kai", number: "50" },
      { id: 10, name: "Sandy Yip", number: "51" },
      { id: 11, name: "Joelle Ting", number: "52" },
      { id: 12, name: "Wen Zhou", number: "54" },
    ],
  },
  {
    id: 13,
    name: "Alliance Black SL3W",
    slug: "womens-sl3w-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division women's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Elisha Park", number: "8" },
      { id: 2, name: "Celine Khong", number: "19" },
      { id: 3, name: "Shiyun Xing", number: "33" },
      { id: 4, name: "Courtney Louey", number: "42" },
      { id: 5, name: "Zoe Xu", number: "55" },
      { id: 6, name: "Lucy Kim", number: "56" },
      { id: 7, name: "Melina Mosalat", number: "57" },
      { id: 8, name: "Monica Yang", number: "59" },
      { id: 9, name: "Cici Zhang", number: "60" },
      { id: 10, name: "Manon Miyata", number: "61" },
      { id: 11, name: "Ricky", number: "NEW" },
    ],
  },
  {
    id: 14,
    name: "Alliance Gold SL3W",
    slug: "womens-sl3w-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division women's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Eileen Zhang", number: "9" },
      { id: 2, name: "Tina Shi", number: "25" },
      { id: 3, name: "Rachel Schlueter", number: "63" },
      { id: 4, name: "Chiara Arief", number: "64" },
      { id: 5, name: "Megan Chee", number: "66" },
      { id: 6, name: "Sao Lai Wong", number: "67" },
      { id: 7, name: "Joanne Chao", number: "74" },
      { id: 8, name: "Stephanie Dang", number: "93" },
      { id: 9, name: "Siew Bian Lim", number: "94" },
      { id: 10, name: "Iris Li", number: "99" },
    ],
  },
  {
    id: 15,
    name: "Alliance JPLM",
    slug: "mens-jplm",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our junior premier league men's team.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing young volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Oliver Koon", number: "1" },
      { id: 2, name: "Samuel Clarke", number: "4" },
      { id: 3, name: "Andrew Beovich", number: "5" },
      { id: 4, name: "Delwin Liu", number: "7" },
      { id: 5, name: "Ethan Phang", number: "9" },
      { id: 6, name: "Jordan Ong", number: "10" },
      { id: 7, name: "Matthias Tan", number: "11" },
      { id: 8, name: "Nathann Ma", number: "12" },
      { id: 9, name: "Ryan Yeow", number: "14" },
      { id: 10, name: "Tae Woong Lee", number: "21" },
    ],
  },
  {
    id: 16,
    name: "Alliance U17 Black Boys",
    slug: "boys-u17-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division U17 boys team developing the next generation of talent.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing young volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Lucas Wijaya", number: "1" },
      { id: 2, name: "Jonathan Bispo", number: "4" },
      { id: 3, name: "Alex Lin", number: "5" },
      { id: 4, name: "John Li", number: "7" },
      { id: 5, name: "Zachary Xu", number: "8" },
      { id: 6, name: "Max Huang", number: "9" },
      { id: 7, name: "Tanish Chandra", number: "10" },
      { id: 8, name: "Geo Li", number: "11" },
      { id: 9, name: "Charlie Gniel", number: "13" },
      { id: 10, name: "Kevin Zhang", number: "15" },
      { id: 11, name: "ElijahJohn Sumarno", number: "7" },
    ],
  },
  {
    id: 17,
    name: "Alliance U17 Gold Boys",
    slug: "boys-u17-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division U17 boys team developing the next generation of talent.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing young volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "James Barna", number: "0" },
      { id: 2, name: "Lewis Cho", number: "2" },
      { id: 3, name: "Meng Nian Chiong", number: "5" },
      { id: 4, name: "Antony Wong", number: "9" },
      { id: 5, name: "Yannick Endries", number: "10" },
      { id: 6, name: "John Wang", number: "13" },
      { id: 7, name: "Josiah Lee", number: "15" },
      { id: 8, name: "Rui Jie Isaac Ho", number: "16" },
      { id: 9, name: "Aaron (Vincent) Duong", number: "25" },
    ],
  },
  {
    id: 18,
    name: "Alliance U17 Black Girls",
    slug: "girls-u17-black",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our black division U17 girls team developing the next generation of talent.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing young volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Katrina Yuen", number: "4" },
      { id: 2, name: "Caitlin Kong", number: "5" },
      { id: 3, name: "Chloe Wu", number: "6" },
      { id: 4, name: "Isabel Kong", number: "8" },
      { id: 5, name: "Nicky Chen", number: "9" },
      { id: 6, name: "Sarah Yiu", number: "11" },
      { id: 7, name: "Ellie Wu", number: "12" },
      { id: 8, name: "Emily Zhang", number: "13" },
      { id: 9, name: "Akaysha Basist", number: "14" },
      { id: 10, name: "Vanice Chan", number: "16" },
    ],
  },
  {
    id: 19,
    name: "Alliance U17 Gold Girls",
    slug: "girls-u17-gold",
    image: "/placeholder.svg?height=600&width=800",
    description: "Our gold division U17 girls team developing the next generation of talent.",
    coaches: [
      {
        id: 1,
        name: "Coach Name",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing young volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Cyree Ting", number: "1" },
      { id: 2, name: "Annabelle Nugroho", number: "4" },
      { id: 3, name: "Addyson Seow", number: "7" },
      { id: 4, name: "Jessy Cho", number: "11" },
      { id: 5, name: "Lauren Koh", number: "12" },
      { id: 6, name: "Jojo Li", number: "14" },
      { id: 7, name: "Madeline Nugroho", number: "19" },
      { id: 8, name: "Grace Ren", number: "21" },
      { id: 9, name: "Chloe Lunardi", number: "23" },
      { id: 10, name: "Angel Babu", number: "34" },
      { id: 11, name: "Zoe Winangun", number: "39" },
      { id: 12, name: "Abigail Lo", number: "74" },
      { id: 13, name: "Jocelyn Yuen", number: "5" },
      { id: 14, name: "Freesia Cheng", number: "79" },
      { id: 15, name: "Giovanna Wijaya", number: "3" },
    ],
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
