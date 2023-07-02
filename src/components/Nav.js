"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import navLinks from "../../public/navLinks.json"

export function Nav() {
  const router = usePathname()
  return (
    <nav className="w-full">
      <div>
        <ul className="flex flex-col space-y-3">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href} legacyBehavior>
                <a
                  className={`py-1.5 px-4 rounded-lg transition delay-75 duration-300 ${
                    router === link.href
                      ? "bg-[#0da5e9] hover:bg-[#94cff4] text-white hover:text-gray-00"
                      : ""
                  }`}
                >
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
