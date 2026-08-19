'use client'

import { MapPin, Search, ShoppingCart, User, Menu } from 'lucide-react'

export function EskortHeader({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wide text-eskort-red">ESKORT</span>
          <span className="hidden items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground sm:flex">
            <MapPin className="h-3.5 w-3.5 text-eskort-red" />
            Select Store
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
          <a href="#" className="transition-colors hover:text-eskort-red">
            Shop Online
          </a>
          <a href="#myskaftin" className="text-eskort-red">
            MySkaftin
          </a>
          <a href="#" className="transition-colors hover:text-eskort-red">
            Recipes
          </a>
          <a href="#" className="transition-colors hover:text-eskort-red">
            Stores
          </a>
        </nav>

        <div className="flex items-center gap-1">
          <button
            className="grid h-9 w-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-sm font-bold transition-colors hover:bg-muted sm:flex"
            aria-label="Sign in"
          >
            <User className="h-5 w-5" />
            Sign In
          </button>
          <button
            className="relative grid h-9 w-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-eskort-red text-[10px] font-black text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
