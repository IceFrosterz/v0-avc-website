import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Black SL1M | Alliance Volleyball Club",
  description: "Meet our elite men's team competing in State League 1",
}

export default function MensSL1BlackTeamPage() {
  return <TeamPage params={{ slug: "mens-sl1m-black" }} />
}
