import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Gold SL2M | Alliance Volleyball Club",
  description: "Meet our gold division men's team competing in State League 2",
}

export default function MensSL2GoldTeamPage() {
  return <TeamPage params={{ slug: "mens-sl2m-gold" }} />
}
