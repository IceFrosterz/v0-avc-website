import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance U17 Black Boys | Alliance Volleyball Club",
  description: "Meet our black division U17 boys team developing the next generation of talent",
}

export default function BoysU17BlackTeamPage() {
  return <TeamPage params={{ slug: "boys-u17-black" }} />
}
