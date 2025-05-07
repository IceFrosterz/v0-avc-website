import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-black text-white">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Alliance VC</h3>
            <p className="text-sm text-gray-300">Passion. Excellence. Community.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-amber-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-amber-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-amber-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/fixtures" className="text-gray-300 hover:text-amber-500">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-amber-500">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-gray-300 hover:text-amber-500">
                  Our Teams
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/committee" className="text-gray-300 hover:text-amber-500">
                  Committee
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-500">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-300 space-y-2">
              <p>123 Volleyball Court</p>
              <p>Sports City, SC 12345</p>
              <p className="mt-2">
                <a href="mailto:info@alliancevc.com" className="hover:text-amber-500">
                  info@alliancevc.com
                </a>
              </p>
              <p>
                <a href="tel:+1234567890" className="hover:text-amber-500">
                  (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Alliance Volleyball Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
