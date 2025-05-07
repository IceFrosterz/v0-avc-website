import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "State League 1 Black Team | Alliance Volleyball Club",
  description: "Meet our elite men's team - Alliance Volleyball Club's flagship team",
}

export default function MensSL1BlackTeamPage() {
  return <TeamPage params={{ slug: "mens-sl1m-black" }} />
}
