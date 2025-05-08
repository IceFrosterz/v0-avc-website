import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Gold SL2W | Alliance Volleyball Club",
  description: "Meet our gold division women's team competing in State League 2",
}

export default function WomensSL2GoldTeamPage() {
  return <TeamPage params={{ slug: "womens-sl2w-gold" }} />
}
