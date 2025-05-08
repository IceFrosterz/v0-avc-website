import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Black SL3M | Alliance Volleyball Club",
  description: "Meet our black division men's team competing in State League 3",
}

export default function MensSL3BlackTeamPage() {
  return <TeamPage params={{ slug: "mens-sl3m-black" }} />
}
