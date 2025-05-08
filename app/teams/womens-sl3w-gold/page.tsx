import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Gold SL3W | Alliance Volleyball Club",
  description: "Meet our gold division women's team competing in State League 3",
}

export default function WomensSL3GoldTeamPage() {
  return <TeamPage params={{ slug: "womens-sl3w-gold" }} />
}
