import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance White SL2W | Alliance Volleyball Club",
  description: "Meet our white division women's team competing in State League 2",
}

export default function WomensSL2WhiteTeamPage() {
  return <TeamPage params={{ slug: "womens-sl2w-white" }} />
}
