// Team data with players and coaches
export type Player = {
  id: number
  name: string
  number: string
  position: string // Added position field
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
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Black-Mens-FKYvFOYG7dIQDEcLkxJD0igkXNjFqs.jpg?height=600&width=800&text=Alliance+Black+SL1M",
    description: "Our elite men's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Paul Wong",
        role: "Head Coach",
        bio: "President, Player, Coach, Paul Wong does it all.",
      },
    ],
    players: [
      { id: 1, name: "Benson Lin", number: "1", position: "Setter" },
      { id: 2, name: "Cayden Scanlon", number: "2", position: "Middle Blocker" },
      { id: 3, name: "Timothy Chee", number: "3", position: "Outside Hitter" },
      { id: 4, name: "Patrick Dumiter", number: "7", position: "Middle Blocker" },
      { id: 5, name: "Chamnan Dy", number: "10", position: "Opposite Spiker" },
      { id: 6, name: "Wang Ho Matthew Wong", number: "17", position: "Libero" },
      { id: 7, name: "Jiunn Chua", number: "14", position: "Outside Hitter" },
      { id: 8, name: "Caleb Lau", number: "30", position: "Setter" },
      { id: 9, name: "Brendan Leung", number: "34", position: "Middle Blocker" },
      { id: 10, name: "Matthew Chen", number: "48", position: "Opposite Spiker" },
      { id: 11, name: "Paul Wong", number: "48", position: "Libero" },
      { id: 12, name: "Amos Woon", number: "49", position: "Outside Hitter" },
      { id: 13, name: "Patrick Cirdei", number: "68", position: "Outside Hitter", isCaptain: true },
    ],
    hasPhotos: true,
  },
  {
    id: 2,
    name: "Alliance Gold SL1M",
    slug: "mens-sl1m-gold",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Mens-vj2AiTrL8f9HqwXrKbBXfS8fWCrSYO.jpg?height=600&width=800&text=Alliance+Gold+SL1M",
    description: "Our gold division men's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Rob Kim",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing elite volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Vincent Ho", number: "5", position: "Setter" },
      { id: 2, name: "Jordan Thai", number: "6", position: "Middle Blocker" },
      { id: 3, name: "Abraham Jo", number: "7", position: "Opposite Spiker" },
      { id: 4, name: "Nicholas Bowman", number: "8", position: "Outside Hitter" },
      { id: 5, name: "Henry Mazzaferri", number: "11", position: "Setter" },
      { id: 6, name: "Anthony (Thi) Nguyen", number: "12", position: "Outside Hitter", isCaptain: true },
      { id: 7, name: "Marlin Mei", number: "14", position: "Outside Hitter" },
      { id: 8, name: "Jasper Tang", number: "19", position: "Opposite Spiker" },
      { id: 9, name: "Wenhao (Andrew) Liang", number: "20", position: "Libero" },
      { id: 10, name: "Hai Duc (Carl) Vu", number: "22", position: "Wing Spiker" },
      { id: 11, name: "Connor McCrae", number: "24", position: "Middle Blocker" },
      { id: 12, name: "Jinbo Xie", number: "25", position: "Libero" },
      { id: 13, name: "Minh Duc Do", number: "28", position: "Middle Blocker" },
    ],
    hasPhotos: true,
  },
  {
    id: 3,
    name: "Alliance Black SL2M",
    slug: "mens-sl2m-black",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-Black-Mens-WGIStkOwutFbqZGNtZRxjwAUTzxXdQ.jpg?height=600&width=800&text=Alliance+Black+SL2M",
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
      { id: 1, name: "Yiheng (Ethan) Yap", number: "1", position: "Outside Hitter" },
      { id: 2, name: "Jayden Lee", number: "13", position: "Outside Hitter" },
      { id: 3, name: "Timothy Wong", number: "15", position: "Opposite Spiker" },
      { id: 4, name: "Hyunjae (Peter) Hwang", number: "16", position: "Middle Blocker" },
      { id: 5, name: "Robin Kim", number: "20", position: "Setter", isCaptain: true },
      { id: 6, name: "Aaron Stephen", number: "36", position: "Setter" },
      { id: 7, name: "Jie Zhou", number: "42", position: "Libero" },
      { id: 8, name: "Leonard Wang", number: "44", position: "Outside Hitter" },
      { id: 9, name: "Ryan Cheng", number: "45", position: "Opposite Spiker" },
      { id: 10, name: "Liam Hanrahan", number: "46", position: "Middle Blocker" },
      { id: 11, name: "Rishav Chandra", number: "50", position: "Middle Blocker" },
    ],
    hasPhotos: true,
  },
  {
    id: 4,
    name: "Alliance Gold SL2M",
    slug: "mens-sl2m-gold",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-Gold-Mens-hP6g6XxzPKcyN9Tc395mrmb6v9YOKR.jpg?height=600&width=800&text=Alliance+Gold+SL2M",
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
      { id: 1, name: "Alexander Nichols", number: "4", position: "Opposite Spiker" },
      { id: 2, name: "Natch Surana", number: "9", position: "Outside Hitter" },
      { id: 3, name: "Jun Hao Ng", number: "23", position: "Setter" },
      { id: 4, name: "Jeff Xie", number: "26", position: "Opposite Spiker" },
      { id: 5, name: "Danny Luong", number: "29", position: "Outside Hitter" },
      { id: 6, name: "Nicolas Villegas", number: "31", position: "Wing Spiker" },
      { id: 7, name: "Letian (David) Cao", number: "32", position: "Setter" },
      { id: 8, name: "Hayden McEwan", number: "33", position: "Libero", isCaptain: true },
      { id: 9, name: "Edwyn Chy", number: "37", position: "Middle Blocker" },
      { id: 10, name: "Austin Li", number: "38", position: "Outside Hitter" },
      { id: 11, name: "Chaipacha Buranavanitchakron", number: "41", position: "Middle Blocker" },
      { id: 12, name: "Jian Shu (Jason) Gao", number: "80", position: "Middle Blocker" },
    ],
    hasPhotos: true,
  },
  {
    id: 5,
    name: "Alliance White SL2M",
    slug: "mens-sl2m-white",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-White-Men-ginRvxAnCbxNRi8yfOQFFqr58FBDVq.jpg?height=600&width=800&text=Alliance+White+SL2M",
    description: "Our white division men's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Eldric Chuong",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Samuel Wong", number: "2", position: "Outside Hitter" },
      { id: 2, name: "Kaleb Larkins", number: "4", position: "Outside Hitter" },
      { id: 3, name: "Nicolas Tan", number: "9", position: "Libero" },
      { id: 4, name: "Joel Daff", number: "11", position: "Outside Hitter", isCaptain: true },
      { id: 6, name: "Adam Soo", number: "35", position: "Opposite Spiker" },
      { id: 7, name: "Andrew Chan", number: "51", position: "Setter" },
      { id: 8, name: "Daniel Tan", number: "53", position: "Middle Blocker" },
      { id: 9, name: "Michael Chen", number: "54", position: "Setter" },
      { id: 10, name: "Senuth Chanmira Arachchi Appuhamilage", number: "61", position: "Opposite Spiker" },
      { id: 11, name: "Wesley Chan", number: "78", position: "Middle Blocker" },
      { id: 12, name: "Ryco Pathaphan", number: "90", position: "Libero" },
    ],
    hasPhotos: true,
  },
  {
    id: 6,
    name: "Alliance Black SL3M",
    slug: "mens-sl3m-black",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-3-Black-Mens-Sw4mba92lCqUzT3e6GOwOgH6X5XMBL.jpg?height=600&width=800&text=Alliance+Black+SL3M",
    description: "Our black division men's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Eldric Chuong",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Jayden Kok", number: "36", position: "Outside Hitter", isCaptain: true },
      { id: 2, name: "Iric Tunglut", number: "51", position: "Outside Hitter" },
      { id: 3, name: "Victor Phan", number: "55", position: "Setter" },
      { id: 4, name: "Julian Stajcer", number: "56", position: "Middle Blocker" },
      { id: 5, name: "Max Hiew", number: "58", position: "Opposite Spiker" },
      { id: 6, name: "Sion Tan", number: "59", position: "Setter" },
      { id: 7, name: "Andy Vuong", number: "60", position: "Middle Blocker" },
      { id: 8, name: "Griffin Tang", number: "74", position: "Opposite Spiker" },
      { id: 9, name: "Theodore Lie", number: "10", position: "Outside Hitter" },
      { id: 10, name: "Cuong Pham", number: "88", position: "Libero" },
      { id: 11, name: "Joseph Hartono", number: "89", position: "Libero" },
    ],
    hasPhotos: true,
  },
  {
    id: 7,
    name: "Alliance Gold SL3M",
    slug: "mens-sl3m-gold",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-3-Gold-Mens-ddNgb0iCvHE7cBAbNX9lmNidZEijcL.jpg?height=600&width=800&text=Alliance+Gold+SL3M",
    description: "Our gold division men's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Jeff Xie",
        role: "Head Coach",
        bio: "A player/coach who has a keen eye on improving players with potential",
      },
      {
        id: 2,
        name: "Eileen Zhang",
        role: "Assistant Coach",
        bio: "A player/coach who has a keen eye on improving players with potential",
      },
    ],
    players: [
      { id: 1, name: "Andy Chan", number: "7", position: "Libero" },
      { id: 2, name: "Jerome Liew", number: "24", position: "Setter" },
      { id: 3, name: "Jaiden Bagley", number: "57", position: "Opposite", isCaptain: true },
      { id: 4, name: "Gabriel Aditya", number: "62", position: "Outside Hitter" },
      { id: 5, name: "Jason Ho", number: "63", position: "Middle Blocker" },
      { id: 6, name: "Isaiah Joseph", number: "64", position: "Libero" },
      { id: 7, name: "Elton Lim", number: "65", position: "Middle Blocker" },
      { id: 8, name: "Wing Ho Lucas Chan", number: "66", position: "Outside Hitter" },
      { id: 9, name: "Jason Wynn", number: "69", position: "Opposite" },
      { id: 10, name: "Ivan Chen", number: "70", position: "Setter" },
      { id: 11, name: "Colin Chen", number: "71", position: "Outside Hitter" },
      { id: 12, name: "Phee Hsien (Julian) Yeoh", number: "72", position: "Outside Hitter" },
      { id: 13, name: "Michael Antolini", number: "73", position: "Defensive Specialist" },
      { id: 14, name: "Hugh Edwards", number: "N/A", position: "Middle Blocker" },
    ],
    hasPhotos: true,
  },
  {
    id: 8,
    name: "Alliance Black SL1W",
    slug: "womens-sl1w-black",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Black-Womens-tYkkMi3CEdc4OJXcK8IYx3hEej8o2w.jpg?height=600&width=800&text=Alliance+Black+SL1W",
    description: "Our elite women's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Danny Luong",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing elite volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Nuchanart Sensuk", number: "5", position: "Outside Hitter", isCaptain: true },
      { id: 2, name: "Nazee Kartelaie", number: "7", position: "Opposite Spiker" },
      { id: 3, name: "Stefanie Tien", number: "8", position: "Setter" },
      { id: 4, name: "Nicole Ng", number: "12", position: "Outside Hitter" },
      { id: 5, name: "Michelle Chhour", number: "15", position: "Middle Blocker" },
      { id: 6, name: "Wing Yan Chan", number: "16", position: "Libero" },
      { id: 7, name: "Sin Ting (Anne) Leung", number: "22", position: "Setter" },
      { id: 8, name: "Maxxine Xavier Alimpoos", number: "24", position: "Libero" },
      { id: 9, name: "Karina Kresnadi", number: "29", position: "Middle Blocker" },
      { id: 10, name: "Evelyn Kosasih", number: "36", position: "Outside Hitter" },
    ],
    hasPhotos: true,
  },
  {
    id: 9,
    name: "Alliance Gold SL1W",
    slug: "womens-sl1w-gold",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-1-Gold-Womens-8EeasjwhkgfHmmBm9YI6NylllEb65c.jpg?height=600&width=800&text=Alliance+Gold+SL1W",
    description: "Our gold division women's team competing in State League 1.",
    coaches: [
      {
        id: 1,
        name: "Nicolas Villegas",
        role: "Head Coach",
        bio: "A loveable coach who coaches well even with 3 hours of sleep!",
      },
    ],
    players: [
      { id: 1, name: "Angel Kwan", number: "2", position: "Outside Hitter" },
      { id: 2, name: "Hoi Ting Lee", number: "3", position: "Defensive Specialist" },
      { id: 3, name: "Phoebe Lee", number: "6", position: "Middle Blocker" },
      { id: 4, name: "Vanessa Do", number: "11", position: "Opposite Spiker" },
      { id: 5, name: "Stephanie Song", number: "13", position: "Middle Blocker" },
      { id: 6, name: "Yun Shang (Mindy) Tan", number: "16", position: "Outside Hitter", isCaptain: true },
      { id: 7, name: "Bianca Curnow", number: "21", position: "Middle Blocker" },
      { id: 8, name: "Lian Lu", number: "30", position: "Libero" },
      { id: 9, name: "Yannie Lee", number: "31", position: "" },
      { id: 10, name: "Sam Burchett", number: "35", position: "Outside Hitter" },
      { id: 11, name: "Noelle Mai", number: "68", position: "Libero" },
      { id: 12, name: "Milka Kurnia Surja", number: "69", position: "Outside Hitter" },
    ],
    hasPhotos: true,
  },
  {
    id: 10,
    name: "Alliance Black SL2W",
    slug: "womens-sl2w-black",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-Black-Womens-ynnui4fyfaoRbBzrRW9DWi5nJAOWkp.jpg?height=600&width=800&text=Alliance+Black+SL2W",
    description: "Our black division women's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Natch Surana",
        role: "Head Coach",
        bio: "Also plays for RM2 Gold an is an amazing cosplayer!",
      },
      {
        id: 2,
        name: "Jie Zhou",
        role: "Assistant Coach",
        bio: "Also plays for RM2 Black and is an amazing persona and libero!",
      },
    ],
    players: [
      { id: 1, name: "Eugenie Zhan", number: "1", position: "Opposite Spiker" },
      { id: 2, name: "Justine Tay", number: "5", position: "Outside Hitter" },
      { id: 3, name: "Man Wah (Zoe) Shiu", number: "14", position: "Middle Blocker" },
      { id: 4, name: "Kristen Koon", number: "17", position: "Opposite Spiker", isCaptain: true },
      { id: 5, name: "Emilie Lam", number: "20", position: "Setter" },
      { id: 6, name: "Natalie Tran", number: "22", position: "Libero" },
      { id: 7, name: "Helena Li", number: "23", position: "Outside Hitter" },
      { id: 8, name: "Thea Ng", number: "28", position: "Middle Blocker" },
      { id: 9, name: "Vivienne Lay", number: "37", position: "Setter" },
      { id: 10, name: "Emily Hiew", number: "38", position: "Libero" },
      { id: 11, name: "Felicity Zheng", number: "40", position: "Outside Hitter" },
      { id: 12, name: "Vivienne Lai", number: "70", position: "Middle Blocker" },
    ],
    hasPhotos: true,
  },
  {
    id: 11,
    name: "Alliance Gold SL2W",
    slug: "womens-sl2w-gold",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-Gold-Womens-q2flsiHUPEpyYFZTkb1N654Z9pVuUV.jpg?height=600&width=800&text=Alliance+Gold+SL2W",
    description: "Our gold division women's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Jun Hao Ng",
        role: "Head Coach",
        bio: "Plays for RM2 Gold and has a very disciplined coaching style!",
      },
    ],
    players: [
      { id: 1, name: "Marcellina Lu", number: "4", position: "Opposite Spiker", isCaptain: true },
      { id: 2, name: "Shannon Coombes", number: "10", position: "Middle Blocker" },
      { id: 3, name: "Kimberley Xu", number: "44", position: "Libero" },
      { id: 4, name: "Holly Zhang", number: "45", position: "Opposite Spiker" },
      { id: 5, name: "Annie Huang", number: "46", position: "Outside Hitter" },
      { id: 6, name: "Natalie Chen", number: "47", position: "Outside Hitter" },
      { id: 7, name: "Suet Ying Lau", number: "48", position: "Outside Hitter" },
      { id: 8, name: "Cheuk Ying Chung", number: "49", position: "Outside Hitter" },
      { id: 9, name: "Vanessa Ortega Lopez", number: "65", position: "Setter" },
      { id: 10, name: "Lok Ho", number: "91", position: "Middle Blocker" },
    ],
    hasPhotos: true,
  },
  {
    id: 12,
    name: "Alliance White SL2W",
    slug: "womens-sl2w-white",
    image:
      "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-2-White-Womens-VZhUf11JATszAY0S7JG7lIr1czMjgG.jpg?height=600&width=800&text=Alliance+White+SL2W",
    description: "Our white division women's team competing in State League 2.",
    coaches: [
      {
        id: 1,
        name: "Austin Li",
        role: "Head Coach",
        bio: "Talented junior in RM2 Gold with a gift for coaching!",
      },
      {
        id: 2,
        name: "Victor Phan",
        role: "Assistant Coach",
        bio: "RM3 Black setter who assists in coaching this team",
      },
    ],
    players: [
      { id: 1, name: "Vanessa Jin", number: "53", position: "Outside Hitter" },
      { id: 2, name: "Angelica Hui", number: "9", position: "Libero" },
      { id: 3, name: "Isabel Koay", number: "16", position: "Outside Hitter" },
      { id: 4, name: "Soraya Mazoori", number: "18", position: "Outside Hitter" },
      { id: 5, name: "Sarah Louey", number: "27", position: "Setter" },
      { id: 6, name: "Ha Phuong (Rosie) Nguyen", number: "28", position: "Opposite Spiker" },
      { id: 7, name: "Bella Ferrier", number: "33", position: "Setter" },
      { id: 8, name: "Delina Pham", number: "39", position: "Libero" },
      { id: 9, name: "Jasmin Kai", number: "50", position: "Opposite Spiker" },
      { id: 10, name: "Sandy Yip", number: "51", position: "Middle Blocker" },
      { id: 11, name: "Joelle Ting", number: "52", position: "Outside Hitter" },
      { id: 12, name: "Wen (Jessica) Zhou", number: "54", position: "Middle Blocker" },
    ],
    hasPhotos: true,
  },
  {
    id: 13,
    name: "Alliance Black SL3W",
    slug: "womens-sl3w-black",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-3-Black-Womens-zYdqZuQbcqmMhIQ2uokqZQUixIHyiL.jpg?height=600&width=800&text=Alliance+Black+SL3W",
    description: "Our black division women's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Jerome Liew",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Elisha Park", number: "8", position: "Opposite Spiker" },
      { id: 2, name: "Celine Khong", number: "19", position: "Opposite Spiker" },
      { id: 3, name: "Shiyun Xing", number: "33", position: "Outside Hitter" },
      { id: 4, name: "Courtney Louey", number: "42", position: "Middle Blocker" },
      { id: 5, name: "Zoe Xu", number: "55", position: "Libero" },
      { id: 6, name: "Lucy Kim", number: "56", position: "Setter" },
      { id: 7, name: "Melina Mosalat", number: "57", position: "" },
      { id: 8, name: "Monica Yang", number: "59", position: "Outside Hitter" },
      { id: 9, name: "Cici Zhang", number: "60", position: "Setter" },
      { id: 10, name: "Manon Miyata", number: "61", position: "Outside Hitter" },
      { id: 11, name: "Ricky Wang", number: "NEW", position: "Libero" },
    ],
    hasPhotos: true,
  },
  {
    id: 14,
    name: "Alliance Gold SL3W",
    slug: "womens-sl3w-gold",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Res-3-Gold-Womens-igU2ZgxLItL5qOWiR12fZjHtBv12F6.jpg?height=600&width=800&text=Alliance+Gold+SL3W",
    description: "Our gold division women's team competing in State League 3.",
    coaches: [
      {
        id: 1,
        name: "Nathan Chen",
        role: "Head Coach",
        bio: "Experienced coach with a passion for developing volleyball talent.",
      },
    ],
    players: [
      { id: 1, name: "Eileen Zhang", number: "9", position: "Setter" },
      { id: 2, name: "Tina Shi", number: "25", position: "Outside Hitter" },
      { id: 3, name: "Rachel Schlueter", number: "63", position: "Middle Blocker" },
      { id: 4, name: "Chiara Arief", number: "64", position: "Libero" },
      { id: 5, name: "Megan Chee", number: "66", position: "Outside Hitter" },
      { id: 6, name: "Sao Lai (Charlene) Wong", number: "67", position: "Opposite Spiker" },
      { id: 7, name: "Joanne Chao", number: "74", position: "Middle Blocker" },
      { id: 8, name: "Stephanie Dang", number: "93", position: "Outside Hitter" },
      { id: 9, name: "Siew Bian Lim", number: "94", position: "Outside Hitter" },
      { id: 10, name: "Iris Li", number: "99", position: "Libero" },
    ],
    hasPhotos: true,
  },
  {
    id: 15,
    name: "Alliance JPLM",
    slug: "mens-jplm",
    image: "https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/Alliance-Junior-Prems-gaabZwUgcLFNPmYQvBa9MSPl6uqpSt.jpg?height=600&width=800&text=Alliance+JPLM",
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
      { id: 1, name: "Oliver Koon", number: "1", position: "Libero" },
      { id: 2, name: "Samuel Clarke", number: "4", position: "Middle Blocker" },
      { id: 3, name: "Andrew Beovich", number: "5", position: "Middle Blocker" },
      { id: 4, name: "Delwin Liu", number: "7", position: "Outside Hitter" },
      { id: 5, name: "Ethan Phang", number: "9", position: "Setter" },
      { id: 6, name: "Jordan Ong", number: "10", position: "Opposite Spiker", isCaptain: true},
      { id: 7, name: "Matthias Tan", number: "11", position: "Outside Hitter / Setter" },
      { id: 8, name: "Nathann Ma", number: "12", position: "Libero" },
      { id: 9, name: "Ryan Yeow", number: "14", position: "Setter" },
      { id: 10, name: "Tae Woong Lee", number: "21", position: "Outside Hitter" },
    ],
    hasPhotos: false, // Mark JPLM team as not having photos
  },
  {
    id: 16,
    name: "Alliance U17 Black Boys",
    slug: "boys-u17-black",
    image: "/placeholder.svg?height=600&width=800&text=Alliance+U17+Black+Boys",
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
      { id: 1, name: "Lucas Wijaya", number: "1", position: "" },
      { id: 2, name: "Jonathan Bispo", number: "4", position: "" },
      { id: 3, name: "Alex Lin", number: "5", position: "" },
      { id: 4, name: "John Li", number: "7", position: "" },
      { id: 5, name: "Zachary Xu", number: "8", position: "" },
      { id: 6, name: "Max Huang", number: "9", position: "" },
      { id: 7, name: "Tanish Chandra", number: "10", position: "" },
      { id: 8, name: "Geo Li", number: "11", position: "" },
      { id: 9, name: "Charlie Gniel", number: "13", position: "" },
      { id: 10, name: "Kevin Zhang", number: "15", position: "" },
      { id: 11, name: "ElijahJohn Sumarno", number: "7", position: "" },
    ],
    hasPhotos: false,
  },
  {
    id: 17,
    name: "Alliance U17 Gold Boys",
    slug: "boys-u17-gold",
    image: "/placeholder.svg?height=600&width=800&text=Alliance+U17+Gold+Boys",
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
      { id: 1, name: "James Barna", number: "0", position: "Middle Blocker" },
      { id: 2, name: "Lewis Cho", number: "2", position: "Opposite Spiker" },
      { id: 3, name: "Meng Nian Chiong", number: "5", position: "Outside Hitter" },
      { id: 4, name: "Antony Wong", number: "9", position: "Outside Hitter" },
      { id: 5, name: "Yannick Endries", number: "10", position: "Middle Blocker" },
      { id: 6, name: "John Wang", number: "13", position: "Middle Blocker" },
      { id: 7, name: "Josiah Lee", number: "15", position: "Opposite Spiker" },
      { id: 8, name: "Rui Jie Isaac Ho", number: "16", position: "Libero" },
      { id: 9, name: "Aaron (Vincent) Duong", number: "25", position: "Setter" },
    ],
    hasPhotos: false,
  },
  {
    id: 18,
    name: "Alliance U17 Black Girls",
    slug: "girls-u17-black",
    image: "/placeholder.svg?height=600&width=800&text=Alliance+U17+Black+Girls",
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
      { id: 1, name: "Katrina Yuen", number: "4", position: "" },
      { id: 2, name: "Caitlin Kong", number: "5", position: "" },
      { id: 3, name: "Chloe Wu", number: "6", position: "" },
      { id: 4, name: "Isabel Kong", number: "8", position: "" },
      { id: 5, name: "Nicky Chen", number: "9", position: "" },
      { id: 6, name: "Sarah Yiu", number: "11", position: "" },
      { id: 7, name: "Ellie Wu", number: "12", position: "" },
      { id: 8, name: "Emily Zhang", number: "13", position: "" },
      { id: 9, name: "Akaysha Basist", number: "14", position: "" },
      { id: 10, name: "Vanice Chan", number: "16", position: "" },
    ],
    hasPhotos: false,
  },
  {
    id: 19,
    name: "Alliance U17 Gold Girls",
    slug: "girls-u17-gold",
    image: "/placeholder.svg?height=600&width=800&text=Alliance+U17+Gold+Girls",
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
      { id: 1, name: "Cyree Ting", number: "1", position: "" },
      { id: 2, name: "Giovanna Wijaya", number: "3", position: "Libero" },
      { id: 3, name: "Annabelle Nugroho", number: "4", position: "" },
      { id: 4, name: "Jocelyn Yuen", number: "5", position: "" },
      { id: 5, name: "Addyson Seow", number: "7", position: "" },
      { id: 6, name: "Jessy Cho", number: "11", position: "" },
      { id: 7, name: "Lauren Koh", number: "12", position: "" },
      { id: 8, name: "Jojo Li", number: "14", position: "" },
      { id: 9, name: "Madeline Nugroho", number: "19", position: "" },
      { id: 10, name: "Grace Ren", number: "21", position: "" },
      { id: 11, name: "Chloe Lunardi", number: "23", position: "" },
      { id: 12, name: "Angel Babu", number: "34", position: "" },
      { id: 13, name: "Zoe Winangun", number: "39", position: "" },
      { id: 14, name: "Abigail Lo", number: "74", position: "" },
      { id: 15, name: "Freesia Cheng", number: "79", position: "" },
    ],
    hasPhotos: false,
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
