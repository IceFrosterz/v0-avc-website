import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Reserve 3 Gold Team | Alliance Volleyball Club",
  description: "Meet our special Reserve 3 Gold team - Alliance Volleyball Club's elite mixed team",
}

export default function Res3GoldTeamPage({ params }) {
  return <TeamPage params={{ slug: "res-3-gold" }} />
}
