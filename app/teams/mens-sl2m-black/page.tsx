import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Black SL2M | Alliance Volleyball Club",
  description: "Meet our black division men's team competing in State League 2",
}

export default function MensSL2BlackTeamPage() {
  return <TeamPage params={{ slug: "mens-sl2m-black" }} />
}
