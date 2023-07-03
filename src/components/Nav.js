"use client"

import Link from "next/link"
import navLinks from "../../public/navLinks.json"

export function Nav() {
  return (
    <nav className="w-full">
      <div>
        <ul className="flex flex-col space-y-3">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href} legacyBehavior>
                <a
                  className={
                    "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  }
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
