import Link from "next/link"

const LINKS = [
  { label: "Shop Online", href: "/" },
  { label: "MySkaftin Builder", href: "/skaftin" },
  { label: "Recipes & Combos", href: "/#recipes" },
  { label: "Stores (Verified)", href: "/" },
  { label: "Quality And Safety", href: "/" },
  { label: "Contact Us", href: "/" },
  { label: "FAQ's", href: "/" },
]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Eskort"
                width={109}
                height={30}
                className="h-8 w-auto brightness-200"
              />
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/70 leading-relaxed font-medium">
              Mzansi&apos;s favourite pork brand since 1917. Experience farm-fresh cuts, sizzling promotional specials, and our interactive weekly lunchbox planner.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-3 md:max-w-md md:justify-end"
            aria-label="Footer"
          >
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-white/80 transition-colors hover:text-[#FFAD00]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Eskort (Pty) Ltd. All rights reserved. Mzansi&apos;s Favourite Pork Brand.</p>
          <div className="flex items-center gap-6 text-xs">
            <Link href="/" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/skaftin" className="text-[#FFAD00] hover:underline font-bold">MySkaftin App →</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
