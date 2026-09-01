'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CartDrawer } from '@/components/cart-drawer'
import { useCartStore } from '@/lib/cart-store'
import { useAuthStore } from '@/lib/auth'
import { useRewardsStore } from '@/lib/rewards-store'

const NAV_ITEMS = [
  { label: 'Recipes',     href: '/#recipes' },
  { label: 'Quality',    href: '/' },
  { label: 'About',      href: '/' },
  { label: 'Specials',   href: '#specials' },
  { label: "What's New", href: '/' },
]

const STORES = [
  { name: 'Castle Gate',          dist: '0,7 KM',  detail: 'Open until 19:00 today',        type: 'standard', id: 'D55351F9-EA7F-43A8-AC6A-6CB89D25A680' },
  { name: 'East Rand Value Mall', dist: '1,2 KM',  detail: 'Collect Only point',             type: 'collect',  id: '7A5E89D5-32F3-4636-ACCC-8E0C7A305F57' },
  { name: 'Centurion',            dist: '3,5 KM',  detail: 'Standard delivery rates apply', type: 'standard', id: 'A1B2C3D4-E5F6-7890-ABCD-EF1234567890' },
]

export function SiteHeader() {
  const { itemCount } = useCartStore()
  const { isSignedIn, user, signOut } = useAuthStore()
  const { stars } = useRewardsStore()

  const [cartOpen,      setCartOpen]      = useState(false)
  const [cartPulse,     setCartPulse]     = useState(false)
  const [storeOpen,     setStoreOpen]     = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [userMenuOpen,  setUserMenuOpen]  = useState(false)
  const [searchOpen,    setSearchOpen]    = useState(false)
  const [searchQuery,   setSearchQuery]   = useState('')
  const [scrolled,      setScrolled]      = useState(false)
  const [selectedStore, setSelectedStore] = useState('Castle Gate')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const searchRef   = useRef<HTMLInputElement>(null)
  const prevCount   = useRef(itemCount)

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setCartPulse(true)
      setTimeout(() => setCartPulse(false), 400)
    }
    prevCount.current = itemCount
  }, [itemCount])

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setStoreOpen(false)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const inkHex = '#17140f'

  return (
    <>
      <header
        className={`sticky top-0 z-50 font-sans transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.55)]' : 'shadow-[0_2px_8px_rgba(0,0,0,0.35)]'
        }`}
        style={{ background: inkHex }}
      >
        <div className="mx-auto flex h-16 sm:h-[68px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">

          {/* LEFT: Logo + Store Selector */}
          <div className="flex items-center gap-5 shrink-0">
            <Link href="/" className="shrink-0 transition-opacity hover:opacity-80 active:scale-95" aria-label="Eskort home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images1/logo.svg" alt="Eskort" width={109} height={30} className="h-8 sm:h-9 w-auto object-contain brightness-0 invert" />
            </Link>

            <div className="relative hidden lg:flex items-center gap-2" ref={dropdownRef}>
              <svg width="14" height="17" viewBox="0 0 16 19" fill="none" className="shrink-0 opacity-70">
                <path d="M2.4566 2.44889C-0.485533 5.39102 -0.485533 10.1643 2.4566 13.0858L7.53847 18.1677C7.60019 18.2294 7.70306 18.25 7.78536 18.25C7.86766 18.25 7.97053 18.2294 8.03225 18.1677L13.1141 13.0858C16.0563 10.1437 16.0563 5.37045 13.1141 2.44889C10.172 -0.472668 5.39873 -0.493242 2.4566 2.44889ZM12.6409 12.6126L7.78536 17.4682L2.92981 12.6126C0.255144 9.93796 0.255144 5.59677 2.92981 2.90153C5.60448 0.226861 9.94567 0.226861 12.6409 2.90153C15.3156 5.59677 15.3156 9.93796 12.6409 12.6126Z" fill="white" stroke="white" strokeWidth="0.5" />
                <path d="M7.78624 5.22656C6.44891 5.22656 5.33789 6.33758 5.33789 7.67491C5.33789 9.01224 6.44891 10.1438 7.78624 10.1438C9.12357 10.1438 10.2346 9.03282 10.2346 7.69549C10.2346 6.35815 9.12357 5.22656 7.78624 5.22656ZM7.78624 9.48546C6.79867 9.48546 5.99627 8.68306 5.99627 7.69549C5.99627 6.70792 6.79867 5.90552 7.78624 5.90552C8.77381 5.90552 9.57621 6.70792 9.57621 7.69549C9.57621 8.68306 8.77381 9.48546 7.78624 9.48546Z" fill="white" stroke="white" strokeWidth="0.5" />
              </svg>
              <button
                type="button"
                id="store-selector-btn"
                onClick={() => setStoreOpen(p => !p)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-expanded={storeOpen}
                aria-haspopup="listbox"
              >
                <span>[{selectedStore}]</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <rect width="18" height="18" rx="9" fill="rgba(255,255,255,0.15)" />
                  <path d="M4.92969 8.44025L8.92969 12L12.9297 8.44025L12.4279 8L8.92969 11.1132L5.43145 8L4.92969 8.44025Z" fill="white" stroke="white" />
                </svg>
              </button>

              {storeOpen && (
                <div
                  role="listbox"
                  aria-label="Select store"
                  className="absolute left-0 top-[calc(100%+10px)] w-[360px] rounded-[20px] p-4 border border-white/10 shadow-2xl z-50 text-left animate-[fadeIn_0.15s_ease]"
                  style={{ background: '#232020' }}
                >
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                    <h4 className="font-bold text-sm text-white">Select nearby store</h4>
                    <span className="text-xs bg-red-900/40 text-eskort-red px-2.5 py-0.5 rounded-full font-extrabold">3 Nearby</span>
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {STORES.map(s => {
                      const isCur = s.name === selectedStore
                      return (
                        <button
                          key={s.id}
                          role="option"
                          aria-selected={isCur}
                          type="button"
                          onClick={() => { setSelectedStore(s.name); setStoreOpen(false) }}
                          className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition group ${isCur ? 'border border-eskort-yellow/60 bg-white/5 font-bold' : 'border border-white/10 hover:border-white/25 bg-transparent'}`}
                        >
                          <span className="flex items-start gap-2.5">
                            <svg width="13" height="16" viewBox="0 0 16 19" fill="none" className="shrink-0 mt-0.5">
                              <path d="M2.4566 2.44889C-0.485533 5.39102 -0.485533 10.1643 2.4566 13.0858L7.53847 18.1677C7.60019 18.2294 7.70306 18.25 7.78536 18.25C7.86766 18.25 7.97053 18.2294 8.03225 18.1677L13.1141 13.0858C16.0563 10.1437 16.0563 5.37045 13.1141 2.44889C10.172 -0.472668 5.39873 -0.493242 2.4566 2.44889Z" fill="white" stroke="white" strokeWidth="0.5" />
                            </svg>
                            <span className="block">
                              <span className="font-bold text-sm text-white group-hover:text-eskort-yellow transition-colors block">{s.name}</span>
                              {s.type === 'collect'
                                ? <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400/80 mt-0.5">Collect Only</span>
                                : <span className="text-xs text-white/50 font-normal block">{s.detail}</span>
                              }
                            </span>
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isCur ? 'bg-eskort-yellow text-ink' : 'text-white/40'}`}>{s.dist}</span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    <button type="button" onClick={() => setStoreOpen(false)} className="w-full bg-eskort-yellow hover:brightness-110 text-ink font-black text-xs py-3 rounded-2xl transition shadow-md">Shop from this Store</button>
                    <button type="button" onClick={() => setStoreOpen(false)} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs py-2.5 rounded-2xl transition">Edit Location Details</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-extrabold uppercase tracking-widest" aria-label="Primary navigation">
            {NAV_ITEMS.map(item => (
              <Link key={item.label} href={item.href} className="text-white/75 hover:text-eskort-yellow transition-colors duration-150 py-2 relative group">
                {item.label}
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-0 bg-eskort-yellow rounded-full transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {isSignedIn && (
              <Link href="/profile" id="header-stars-badge" className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-eskort-yellow/30 px-3 py-1.5 text-xs font-bold text-eskort-yellow hover:bg-eskort-yellow/10 transition" aria-label={`${stars} Skaftin Stars`} style={{ background: 'rgba(253,185,19,0.08)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <span>{stars}</span>
              </Link>
            )}

            {/* Search */}
            <div className="relative flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 rounded-full px-3 py-1.5 border border-white/20" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-70">
                    <path d="M15.1602 14.509L11.3428 10.6916C12.3084 9.59132 12.8922 8.13174 12.8922 6.55988C12.8922 3.07934 10.0629 0.25 6.58233 0.25C3.1018 0.25 0.25 3.05689 0.25 6.53742C0.25 10.018 3.07934 12.8473 6.55988 12.8473C8.13174 12.8473 9.59132 12.2635 10.6916 11.2979L14.509 15.1153C14.5988 15.2051 14.7111 15.25 14.8234 15.25C14.9356 15.25 15.0479 15.2051 15.1377 15.1153C15.3398 14.9581 15.3398 14.6886 15.1602 14.509ZM1.1482 6.53742C1.1482 3.5509 3.57335 1.12575 6.55988 1.12575C9.54641 1.12575 11.9716 3.5509 11.9716 6.53742C11.9716 9.52395 9.54641 11.9716 6.55988 11.9716C3.57335 11.9716 1.1482 9.52395 1.1482 6.53742Z" fill="white" stroke="white" strokeWidth="0.5" />
                  </svg>
                  <input ref={searchRef} id="header-search-input" type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Escape' && (setSearchOpen(false), setSearchQuery(''))} placeholder="Search products..." className="bg-transparent text-white text-xs font-medium placeholder-white/40 outline-none w-36 sm:w-44" aria-label="Search products" />
                  <button type="button" id="header-search-close" onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="text-white/50 hover:text-white transition" aria-label="Close search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M11.4895 0.355253L12.3461 1.21187L7.20645 6.35156L12.3461 11.4913L11.4895 12.3479L6.34984 7.20818L1.21014 12.3479L0.353527 11.4913L5.49322 6.35156L0.353527 1.21187L1.21014 0.355253L6.34984 5.49495L11.4895 0.355253Z" fill="white" stroke="white" strokeWidth="0.5" /></svg>
                  </button>
                </div>
              ) : (
                <button type="button" id="header-search-btn" onClick={() => setSearchOpen(true)} className="p-2.5 rounded-full hover:bg-white/10 transition text-white" aria-label="Open search">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15.1602 14.509L11.3428 10.6916C12.3084 9.59132 12.8922 8.13174 12.8922 6.55988C12.8922 3.07934 10.0629 0.25 6.58233 0.25C3.1018 0.25 0.25 3.05689 0.25 6.53742C0.25 10.018 3.07934 12.8473 6.55988 12.8473C8.13174 12.8473 9.59132 12.2635 10.6916 11.2979L14.509 15.1153C14.5988 15.2051 14.7111 15.25 14.8234 15.25C14.9356 15.25 15.0479 15.2051 15.1377 15.1153C15.3398 14.9581 15.3398 14.6886 15.1602 14.509ZM1.1482 6.53742C1.1482 3.5509 3.57335 1.12575 6.55988 1.12575C9.54641 1.12575 11.9716 3.5509 11.9716 6.53742C11.9716 9.52395 9.54641 11.9716 6.55988 11.9716C3.57335 11.9716 1.1482 9.52395 1.1482 6.53742Z" fill="white" stroke="white" strokeWidth="0.5" /></svg>
                </button>
              )}
            </div>

            {/* Cart */}
            <button id="header-cart-btn" type="button" onClick={() => setCartOpen(true)} className={`relative flex items-center justify-center w-10 h-10 rounded-full transition duration-200 ring-2 ring-eskort-yellow ${cartPulse ? 'scale-110 bg-eskort-yellow/20' : 'bg-transparent hover:bg-eskort-yellow/10'}`} aria-label={`Shopping cart, ${itemCount} items`}>
              <svg width="20" height="18" viewBox="0 0 21 19" fill="none">
                <path d="M9.52359 16.2194C9.52359 15.1605 8.60802 14.2886 7.49625 14.2886C6.38449 14.2886 5.49072 15.1605 5.49072 16.2194C5.49072 17.2782 6.40629 18.1502 7.51805 18.1502C8.62982 18.1502 9.52359 17.2782 9.52359 16.2194ZM6.36269 16.2194C6.36269 15.6173 6.88587 15.119 7.51805 15.119C8.15023 15.119 8.67341 15.6173 8.67341 16.2194C8.67341 16.8214 8.15023 17.3197 7.51805 17.3197C6.88587 17.3197 6.36269 16.8214 6.36269 16.2194Z" fill="white" stroke="white" strokeWidth="0.3" />
                <path d="M17.0005 16.2194C17.0005 15.1605 16.0849 14.2886 14.9731 14.2886C13.8614 14.2886 12.9458 15.1605 12.9458 16.2194C12.9458 17.2782 13.8614 18.1502 14.9731 18.1502C16.0849 18.1294 17.0005 17.2782 17.0005 16.2194ZM13.8396 16.2194C13.8396 15.6173 14.3628 15.119 14.9949 15.119C15.6271 15.119 16.1503 15.6173 16.1503 16.2194C16.1503 16.8214 15.6271 17.3197 14.9949 17.3197C14.341 17.299 13.8396 16.8214 13.8396 16.2194Z" fill="white" stroke="white" strokeWidth="0.3" />
                <path d="M20.772 2.4544C20.6848 2.3506 20.554 2.28831 20.4232 2.28831H4.24816L4.13917 1.707C3.98657 0.793501 3.1582 0.149902 2.19903 0.149902H0.585887C0.346096 0.149902 0.149902 0.336754 0.149902 0.565128C0.149902 0.793501 0.346096 0.980353 0.585887 0.980353H2.22083C2.76581 0.980353 3.2018 1.35406 3.289 1.85233L4.66235 9.80389C4.66235 9.84541 4.66235 9.88693 4.68415 9.92846L4.92394 11.3402C5.12013 12.4406 6.1011 13.2503 7.30006 13.2503H18.0253C18.2651 13.2503 18.4613 13.0634 18.4613 12.835C18.4613 12.6067 18.2651 12.4198 18.0253 12.4198H7.30006C6.55888 12.4198 5.9267 11.9008 5.79591 11.1949L5.62152 10.1984H18.4613C18.6575 10.1984 18.8319 10.0738 18.8755 9.88693L20.8374 2.78658C20.881 2.68278 20.8592 2.55821 20.772 2.4544Z" fill="white" stroke="white" strokeWidth="0.3" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-eskort-yellow text-ink text-[10px] font-black min-w-[1.125rem] px-1 rounded-full flex items-center justify-center leading-none h-[1.125rem]">{itemCount}</span>
              )}
            </button>

            {/* Wishlist */}
            <button type="button" id="header-wishlist-btn" className="p-2.5 rounded-full hover:bg-white/10 transition text-white hidden sm:flex items-center justify-center" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Account */}
            {isSignedIn ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button id="header-user-menu-btn" type="button" onClick={() => setUserMenuOpen(p => !p)} className="p-2.5 rounded-full hover:bg-white/10 transition text-white flex items-center justify-center" aria-label="Account menu" aria-expanded={userMenuOpen} aria-haspopup="menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </button>
                {userMenuOpen && (
                  <div role="menu" className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden animate-[fadeIn_0.15s_ease]" style={{ background: '#232020' }}>
                    <Link href="/profile" role="menuitem" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white hover:bg-white/5 transition">Profile Settings</Link>
                    <Link href="/profile?tab=plans" role="menuitem" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white hover:bg-white/5 transition">My Skaftin Plans</Link>
                    <div className="border-t border-white/10" />
                    <button id="header-sign-out-btn" role="menuitem" type="button" onClick={() => { signOut(); setUserMenuOpen(false) }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-eskort-red hover:bg-white/5 transition">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/sign-in" id="header-sign-in-btn" className="hidden sm:flex items-center justify-center p-2.5 rounded-full hover:bg-white/10 transition text-white" aria-label="Sign in">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button type="button" id="mobile-menu-toggle" onClick={() => setMobileOpen(p => !p)} className="lg:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                {mobileOpen ? (
                  <><path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>
                ) : (
                  <><path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 px-6 py-6 space-y-5 animate-[fadeIn_0.2s_ease]" style={{ background: '#1a1715' }}>
            <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
              <p className="text-[10px] text-white/40 font-semibold uppercase mb-0.5">Ordering from</p>
              <span className="font-black text-sm text-white">{selectedStore}</span>
            </div>
            {isSignedIn && user && (
              <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-eskort-yellow flex items-center justify-center shrink-0">
                  <span className="text-ink font-black text-sm">{user.displayName[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-black text-sm text-white">{user.displayName}</p>
                  <p className="text-xs text-white/50">{stars} Stars</p>
                </div>
              </div>
            )}
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_ITEMS.map(item => (
                  <li key={item.label}>
                    <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-3 px-2 border-b border-white/10 text-xl font-extrabold uppercase tracking-wide text-white hover:text-eskort-yellow transition-colors">{item.label}</Link>
                  </li>
                ))}
                {isSignedIn ? (
                  <>
                    <li><Link href="/profile" onClick={() => setMobileOpen(false)} className="block py-3 px-2 border-b border-white/10 text-lg font-bold text-white/70 hover:text-white transition">Profile</Link></li>
                    <li><button type="button" onClick={() => { signOut(); setMobileOpen(false) }} className="py-3 px-2 text-lg font-bold text-eskort-red hover:opacity-80 transition">Sign Out</button></li>
                  </>
                ) : (
                  <li><Link href="/sign-in" onClick={() => setMobileOpen(false)} className="block py-3 px-2 text-lg font-bold text-white/70 hover:text-white transition">Sign In</Link></li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}