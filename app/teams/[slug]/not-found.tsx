import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TeamNotFound() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Team Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        Sorry, we couldn't find the team you're looking for. It may have been moved or doesn't exist.
      </p>
      <Button asChild>
        <Link href="/teams">Return to Teams</Link>
      </Button>
    </div>
  )
}
