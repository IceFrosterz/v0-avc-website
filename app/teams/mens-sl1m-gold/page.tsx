import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Gold SL1M | Alliance Volleyball Club",
  description: "Meet our gold division men's team competing in State League 1",
}

export default function MensSL1GoldTeamPage() {
  return <TeamPage params={{ slug: "mens-sl1m-gold" }} />
}
