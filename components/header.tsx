"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { navItems, profile } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled || open ? "bg-background/80 backdrop-blur-xl border-b border-white/8" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2 font-medium tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            {profile.shortName}
          </span>
          <span className="hidden sm:inline text-sm">Francisco Tomasino</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden sm:inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contacto
          </a>
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/8 px-5 py-4 space-y-1 bg-background/95 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
