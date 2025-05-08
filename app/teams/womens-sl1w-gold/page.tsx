import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Gold SL1W | Alliance Volleyball Club",
  description: "Meet our gold division women's team competing in State League 1",
}

export default function WomensSL1GoldTeamPage() {
  return <TeamPage params={{ slug: "womens-sl1w-gold" }} />
}
