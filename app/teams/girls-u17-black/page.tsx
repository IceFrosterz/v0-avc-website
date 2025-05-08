import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance U17 Black Girls | Alliance Volleyball Club",
  description: "Meet our black division U17 girls team developing the next generation of talent",
}

export default function GirlsU17BlackTeamPage() {
  return <TeamPage params={{ slug: "girls-u17-black" }} />
}
