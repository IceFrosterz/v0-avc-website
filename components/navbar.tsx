"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Fixtures", href: "/fixtures" },
  { name: "Gallery", href: "/gallery" },
  { name: "Our Teams", href: "/teams" },
  { name: "Committee", href: "/committee" },
  { name: "About Us", href: "/about" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="https://hhawhldrmzkk23dr.public.blob.vercel-storage.com/AVC-Logo-IYCKQLJSTXpbh4PDD3flFfsl4YYn0N.svg" alt="Alliance Volleyball Club Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="hidden font-bold text-xl sm:inline-block">Alliance Volleyball Club</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">Join Us</Button>
        </nav>

        {/* Mobile menu button */}
        <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 w-full overflow-y-auto bg-background md:hidden",
          mobileMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="container py-6">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">Join Us</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
