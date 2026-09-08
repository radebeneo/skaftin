"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import "./header.css"

export function HomepageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const closePanels = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setIsMenuOpen(false)
      setIsSearchOpen(false)
    }

    document.addEventListener("keydown", closePanels)
    document.body.classList.toggle("menu-open", isMenuOpen)

    return () => {
      document.removeEventListener("keydown", closePanels)
      document.body.classList.remove("menu-open")
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open)
    setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen((open) => !open)
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Eskort home">
          <img src="/images1/logo.svg" alt="Eskort" width="112" height="46" />
        </Link>
        <Link className="store-link" href="/#store-locator">
          <img src="/images1/nav-location-icon.svg" alt="" width="17" height="21" />
          <span>[Store Name]</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#recipes">Recipes</Link>
          <Link href="/#quality">Quality</Link>
          <Link href="/#heritage">About</Link>
          <Link href="/#specials">Specials</Link>
          <Link href="/#community">What&apos;s New</Link>
        </nav>
        <div className="header-actions">
          <button id="homepage-search-toggle" className="icon-button search-toggle" type="button" aria-label="Open search" aria-expanded={isSearchOpen} onClick={toggleSearch}>
            <img src="/images1/nav-search-icon.svg" alt="" width="22" height="22" />
          </button>
          <button id="homepage-cart-button" className="icon-button cart-button" type="button" aria-label="Open cart">
            <img src="/images1/cart.svg" alt="" width="21" height="21" />
            <span className="cart-count" aria-label="0 items">0</span>
          </button>
          <button id="homepage-wishlist-button" className="icon-button header-heart" type="button" aria-label="Open wishlist">
            <img src="/images1/icon-heart.svg" alt="" width="21" height="21" />
          </button>
          <button id="homepage-account-button" className="icon-button account-button" type="button" aria-label="Open account">
            <img src="/images1/person-icon.svg" alt="" width="21" height="21" />
          </button>
          <button id="homepage-menu-toggle" className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={isMenuOpen} aria-controls="mobile-menu" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <form className="search-panel" role="search" hidden={!isSearchOpen} onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="site-search">Search Eskort</label>
        <input id="site-search" type="search" placeholder="What are you looking for?" autoFocus={isSearchOpen} />
        <button type="submit">Search</button>
      </form>
      <nav className="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" hidden={!isMenuOpen} onClick={() => setIsMenuOpen(false)}>
        <Link href="/#recipes">Recipes</Link>
        <Link href="/#quality">Quality</Link>
        <Link href="/#heritage">About</Link>
        <Link href="/#specials">Specials</Link>
        <Link href="/#community">What&apos;s New</Link>
        <Link href="/#store-locator">Find a Store</Link>
      </nav>
    </header>
  )
}
