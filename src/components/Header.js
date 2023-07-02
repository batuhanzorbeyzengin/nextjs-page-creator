import Link from "next/link"
import { Nav } from "./Nav"

export function Header() {
  return (
    <div className="w-full flex flex-col space-y-6 p-3.5 lg:px-5 lg:py-3">
      <Link href={"/"}>Logo</Link>
      <Nav />
    </div>
  )
}
