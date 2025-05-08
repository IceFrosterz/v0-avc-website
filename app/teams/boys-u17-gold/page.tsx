import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance U17 Gold Boys | Alliance Volleyball Club",
  description: "Meet our gold division U17 boys team developing the next generation of talent",
}

export default function BoysU17GoldTeamPage() {
  return <TeamPage params={{ slug: "boys-u17-gold" }} />
}
