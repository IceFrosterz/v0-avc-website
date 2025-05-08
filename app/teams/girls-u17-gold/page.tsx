import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance U17 Gold Girls | Alliance Volleyball Club",
  description: "Meet our gold division U17 girls team developing the next generation of talent",
}

export default function GirlsU17GoldTeamPage() {
  return <TeamPage params={{ slug: "girls-u17-gold" }} />
}
