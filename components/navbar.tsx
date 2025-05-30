"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Hackathon", href: "/hackathon" },
    { name: "Timeline", href: "/timeline" },
    { name: "Admin", href: "/admin" },

  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-shadow">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-3xl font-extrabold tracking-tight">
          Intel IoT Club
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-semibold text-muted-foreground transition-all duration-200 hover:text-primary"
            >
              <span className="group inline-block">
                {item.name}
                <span className="block h-[3px] max-w-0 bg-primary transition-all duration-300 group-hover:max-w-full rounded-full"></span>
              </span>
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/contact">
            <Button size="lg" className="ml-2 text-base font-semibold px-5 py-2.5">
              Join the Club
            </Button>
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
        isOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
      )}>
        <div className="rounded-b-xl border-t bg-background px-4 py-4 shadow-md animate-fade-in-down space-y-2">
          {navItems.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                `delay-[${i * 50}ms]`
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex items-center justify-between gap-2">
            <ThemeToggle />
            <Link href="/contact">
              <Button size="sm" className="w-auto">Join the Club</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
