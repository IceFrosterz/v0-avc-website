import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance JPLM | Alliance Volleyball Club",
  description: "Meet our junior premier league men's team",
}

export default function MensJPLMTeamPage() {
  return <TeamPage params={{ slug: "mens-jplm" }} />
}
