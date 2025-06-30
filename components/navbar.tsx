"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  // State to manage the open/close status of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Effect to handle window resize and close the menu when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Automatically close the mobile menu in desktop view
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Navigation items for the navbar
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Hackathon", href: "/hackathon" },
    { name: "Timeline", href: "/timeline" },
    { name: "Brochure", href: "/brochure.pdf", target: "_blank" },
    { name: "Socials", href: "https://linktr.ee/inteliotclub", target: "_blank" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-shadow">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo linking to the home page */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight">
          Intel IoT Club
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              // Added focus-visible outline for better accessibility
              className="relative text-sm font-semibold text-muted-foreground transition-all duration-200 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="group inline-block">
                {item.name}
                {/* Hover effect for underline animation */}
                <span className="block h-[3px] max-w-0 bg-primary transition-all duration-300 group-hover:max-w-full rounded-full"></span>
              </span>
            </Link>
          ))}
          {/* Theme toggle button */}
          <ThemeToggle />
          {/* CTA button */}
          <Link href="/contact">
            <Button size="lg" className="ml-2 text-base font-semibold px-5 py-2.5">
              Join the Club
            </Button>
          </Link>
        </nav>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={() => setIsOpen(!isOpen)}
          // Dynamic aria-label for accessibility
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        )}
      >
        <div className="rounded-b-xl border-t bg-background px-4 py-4 shadow-md animate-fade-in-down space-y-2">
          {navItems.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)} // Close menu after navigating
              // Added focus-visible outline for better accessibility
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-all hover:bg-muted hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
                `delay-[${i * 50}ms]` // Staggered animation for items
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex items-center justify-between gap-2">
            <ThemeToggle />
            <Link href="/contact">
              <Button size="sm" className="w-auto">
                Join the Club
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
