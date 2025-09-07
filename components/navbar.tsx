"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Hackathon", href: "/hackathon" },
    { name: "Timeline", href: "/timeline" },
    { name: "Brochure", href: "/brochure.pdf", external: true },
    { name: "Socials", href: "https://linktr.ee/inteliotclub", external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl transition-shadow">
      <div className="container mx-auto flex h-16 lg:h-20 items-center justify-between px-4 lg:px-6">
        <Link
          href="/"
          className="text-2xl lg:text-3xl font-extrabold tracking-tight truncate hover:text-blue-400 hover:scale-105 transition-transform duration-300"
        >
          Intel IoT Club
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative text-sm font-semibold transition duration-300 hover:text-blue-400 hover:scale-105 hover:drop-shadow-[0_0_10px_#00f]",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-semibold transition duration-300 hover:text-blue-400 hover:scale-105 hover:drop-shadow-[0_0_10px_#00f]",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            )
          )}
          <ThemeToggle />
          <Link href="/contact">
            <Button
              size="lg"
              className="ml-2 text-base font-semibold px-5 py-2.5 hover:scale-105 hover:shadow-lg hover:shadow-blue-500 transition-all duration-300"
            >
              Join the Club
            </Button>
          </Link>
        </nav>

        {/* Tablet + Mobile Nav toggle */}
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={cn(
          "xl:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        )}
      >
        <div className="rounded-b-xl border-t bg-background/95 backdrop-blur-md px-4 py-6 shadow-lg animate-fade-in-down">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
            {navItems.map((item, i) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:bg-muted hover:text-blue-400 hover:scale-105 hover:drop-shadow-[0_0_8px_#00f]",
                    pathname === item.href && "text-primary bg-muted/50",
                    `delay-[${i * 50}ms]`
                  )}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:bg-muted hover:text-blue-400 hover:scale-105 hover:drop-shadow-[0_0_8px_#00f]",
                    pathname === item.href && "text-primary bg-muted/50",
                    `delay-[${i * 50}ms]`
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <ThemeToggle />
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button size="lg" className="w-full sm:w-auto hover:scale-105 hover:shadow-lg hover:shadow-blue-500 transition-all duration-300">
                Join the Club
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
