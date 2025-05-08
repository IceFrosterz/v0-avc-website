import type { Metadata } from "next"
import TeamPage from "../[slug]/page"

export const metadata: Metadata = {
  title: "Alliance Black SL2W | Alliance Volleyball Club",
  description: "Meet our black division women's team competing in State League 2",
}

export default function WomensSL2BlackTeamPage() {
  return <TeamPage params={{ slug: "womens-sl2w-black" }} />
}
