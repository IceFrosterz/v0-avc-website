import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Black SL1W | Alliance Volleyball Club",
  description: "Meet our elite women's team competing in State League 1",
}

export default function WomensSL1BlackTeamPage() {
  return <TeamPage params={{ slug: "womens-sl1w-black" }} />
}
