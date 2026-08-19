export function EskortFooter() {
  return (
    <footer className="bg-eskort-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-display text-3xl tracking-wide">ESKORT</span>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Proudly South African since 1917. Bringing the fun back to the lunchbox.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold">
            <a href="#" className="text-eskort-yellow transition-opacity hover:opacity-80">
              Shop Online
            </a>
            <a href="#myskaftin" className="transition-opacity hover:opacity-80">
              MySkaftin
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              Recipes
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              Stores
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              About Us
            </a>
          </nav>

          <div className="flex gap-3">
            {['Fb', 'Ig', 'Yt'].map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label === 'Fb' ? 'Facebook' : label === 'Ig' ? 'Instagram' : 'YouTube'}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-xs font-black text-white/80 transition-colors hover:border-eskort-yellow hover:text-eskort-yellow"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © 2026 Eskort. All rights reserved. MySkaftin is a concept prototype.
        </div>
      </div>
    </footer>
  )
}
