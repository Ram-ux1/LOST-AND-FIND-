"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  const navLinks = [
    { href: "/items?type=lost", label: "Lost Items" },
    { href: "/items?type=found", label: "Found Items" },
    { href: "/report", label: "Report Item" },
  ]
  
  const isItemsPage = pathname === '/items';

  return (
    <nav className="flex items-center space-x-2 lg:space-x-4">
      {navLinks.map(({ href, label }) => {
        const isActive = (href.startsWith(pathname) && href.includes('?')) ? (isItemsPage && type === href.split('=')[1]) : pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/80 hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
