"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Star } from "lucide-react"

const STORES = [
  { name: "Castle Gate", dist: "0,7 KM", detail: "Open until 19:00 today", type: "standard", id: "D55351F9-EA7F-43A8-AC6A-6CB89D25A680" },
  { name: "East Rand Value Mall", dist: "1,2 KM", detail: "Collect Only point", type: "collect", id: "7A5E89D5-32F3-4636-ACCC-8E0C7A305F57" },
  { name: "Centurion", dist: "3,5 KM", detail: "Standard delivery rates apply", type: "standard", id: "A1B2C3D4-E5F6-7890-ABCD-EF1234567890" }
]

export function SiteHeader({ stars = 0 }: { stars?: number }) {
  const [cartCount, setCartCount] = useState(2)
  const [cartPulse, setCartPulse] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState("Castle Gate")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleAdd(e: any) {
      setCartCount((c) => c + 1)
      setCartPulse(true)
      setTimeout(() => setCartPulse(false), 400)
    }
    window.addEventListener("eskort-add-to-cart", handleAdd)
    return () => window.removeEventListener("eskort-add-to-cart", handleAdd)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStoreOpen(false)
        setTooltipOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-xs font-sans">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Left: Logo & Store Location Selector */}
        <div className="flex items-center gap-6">
          <Link href="/" className="shrink-0 transition transform active:scale-95">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Eskort"
              width={109}
              height={30}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Store Selector Modal Trigger */}
          <div className="relative hidden lg:flex items-center gap-2" ref={dropdownRef}>

            {/* Exact Location Pin SVG from Template */}
            <svg width="16" height="19" viewBox="0 0 16 19" fill="none" className="shrink-0">
              <path d="M2.4566 2.44889C-0.485533 5.39102 -0.485533 10.1643 2.4566 13.0858L7.53847 18.1677C7.60019 18.2294 7.70306 18.25 7.78536 18.25C7.86766 18.25 7.97053 18.2294 8.03225 18.1677L13.1141 13.0858C16.0563 10.1437 16.0563 5.37045 13.1141 2.44889C10.172 -0.472668 5.39873 -0.493242 2.4566 2.44889ZM12.6409 12.6126L7.78536 17.4682L2.92981 12.6126C0.255144 9.93796 0.255144 5.59677 2.92981 2.90153C5.60448 0.226861 9.94567 0.226861 12.6409 2.90153C15.3156 5.59677 15.3156 9.93796 12.6409 12.6126Z" fill="black" stroke="black" strokeWidth="0.5"></path>
              <path d="M7.78624 5.22656C6.44891 5.22656 5.33789 6.33758 5.33789 7.67491C5.33789 9.01224 6.44891 10.1438 7.78624 10.1438C9.12357 10.1438 10.2346 9.03282 10.2346 7.69549C10.2346 6.35815 9.12357 5.22656 7.78624 5.22656ZM7.78624 9.48546C6.79867 9.48546 5.99627 8.68306 5.99627 7.69549C5.99627 6.70792 6.79867 5.90552 7.78624 5.90552C8.77381 5.90552 9.57621 6.70792 9.57621 7.69549C9.57621 8.68306 8.77381 9.48546 7.78624 9.48546Z" fill="black" stroke="black" strokeWidth="0.5"></path>
            </svg>

            <span className="text-xs font-medium text-neutral-600">Ordering from</span>

            <button
              type="button"
              onClick={() => { setStoreOpen(!storeOpen); setTooltipOpen(false); }}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-ink bg-neutral-100 hover:bg-neutral-200/70 px-3 py-1.5 rounded-full cursor-pointer transition"
            >
              <span>{selectedStore}</span>
              {/* Exact Chevron Button SVG from Template */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect width="18" height="18" rx="9" fill="black"></rect>
                <path d="M4.92969 8.44025L8.92969 12L12.9297 8.44025L12.4279 8L8.92969 11.1132L5.43145 8L4.92969 8.44025Z" fill="white" stroke="white"></path>
              </svg>
            </button>

            <button
              onClick={() => setTooltipOpen(!tooltipOpen)}
              className="text-xs text-neutral-400 hover:text-ink w-5 h-5 flex items-center justify-center rounded-full bg-neutral-100 font-serif font-bold"
              title="Location help"
            >
              ?
            </button>

            {/* Address Tooltip Panel from Template */}
            {tooltipOpen && (
              <div className="absolute top-12 left-0 w-80 bg-ink text-white p-4 rounded-2xl shadow-xl z-50 text-xs leading-relaxed flex items-start gap-3">
                <div className="shrink-0 pt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 0C11.3869 0 13.6761 0.948211 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18C6.61305 18 4.32387 17.0518 2.63604 15.364C0.948211 13.6761 0 11.3869 0 9C0 6.61305 0.948211 4.32387 2.63604 2.63604C4.32387 0.948211 6.61305 0 9 0ZM9 0.947368C6.86431 0.947368 4.81609 1.79577 3.30593 3.30593C1.79577 4.81609 0.947368 6.86431 0.947368 9C0.947368 11.1357 1.79577 13.1839 3.30593 14.6941C4.81609 16.2042 6.86431 17.0526 9 17.0526C10.0575 17.0526 11.1046 16.8443 12.0816 16.4397C13.0586 16.035 13.9463 15.4418 14.6941 14.6941C15.4418 13.9463 16.035 13.0586 16.4397 12.0816C16.8443 11.1046 17.0526 10.0575 17.0526 9C17.0526 6.86431 16.2042 4.81609 14.6941 3.30593C13.1839 1.79577 11.1357 0.947368 9 0.947368ZM8.52632 4.73684V6.63158H9.47368V4.73684H8.52632ZM8.52632 8.52632V13.2632H9.47368V8.52632H8.52632Z" fill="white"></path>
                  </svg>
                </div>
                <p>
                  <strong>Please enter your address details here.</strong> This helps us in showing you products and stores around your location.
                </p>
                <button onClick={() => setTooltipOpen(false)} className="ml-auto p-1 text-white hover:opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M11.4895 0.355253L12.3461 1.21187L7.20645 6.35156L12.3461 11.4913L11.4895 12.3479L6.34984 7.20818L1.21014 12.3479L0.353527 11.4913L5.49322 6.35156L0.353527 1.21187L1.21014 0.355253L6.34984 5.49495L11.4895 0.355253Z" fill="white" stroke="white" strokeWidth="0.5"></path>
                  </svg>
                </button>
              </div>
            )}

            {/* Store Modal Panel from Template */}
            {storeOpen && (
              <div className="absolute left-0 top-10 mt-2 w-[400px] bg-white rounded-[24px] p-5 border border-neutral-200 shadow-2xl z-50 text-left animate-[fadeIn_0.15s_ease]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100">
                  <h4 className="font-bold text-sm text-ink">Select nearby store</h4>
                  <span className="text-xs bg-red-50 text-[#D0302F] px-2.5 py-0.5 rounded-full font-extrabold">3 Nearby</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {STORES.map((s) => {
                    const isCur = s.name === selectedStore
                    return (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => {
                          setSelectedStore(s.name)
                          setStoreOpen(false)
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition group ${isCur
                          ? "border-2 border-ink bg-neutral-50 font-bold"
                          : "border border-neutral-200 bg-white hover:border-neutral-400"
                          }`}
                      >
                        <span className="flex items-start gap-3">
                          <svg width="15" height="18" viewBox="0 0 16 19" fill="none" className="shrink-0 mt-0.5">
                            <path d="M2.4566 2.44889C-0.485533 5.39102 -0.485533 10.1643 2.4566 13.0858L7.53847 18.1677C7.60019 18.2294 7.70306 18.25 7.78536 18.25C7.86766 18.25 7.97053 18.2294 8.03225 18.1677L13.1141 13.0858C16.0563 10.1437 16.0563 5.37045 13.1141 2.44889C10.172 -0.472668 5.39873 -0.493242 2.4566 2.44889ZM12.6409 12.6126L7.78536 17.4682L2.92981 12.6126C0.255144 9.93796 0.255144 5.59677 2.92981 2.90153C5.60448 0.226861 9.94567 0.226861 12.6409 2.90153C15.3156 5.59677 15.3156 9.93796 12.6409 12.6126Z" fill="black" stroke="black" strokeWidth="0.5"></path>
                            <path d="M7.78624 5.22656C6.44891 5.22656 5.33789 6.33758 5.33789 7.67491C5.33789 9.01224 6.44891 10.1438 7.78624 10.1438C9.12357 10.1438 10.2346 9.03282 10.2346 7.69549C10.2346 6.35815 9.12357 5.22656 7.78624 5.22656ZM7.78624 9.48546C6.79867 9.48546 5.99627 8.68306 5.99627 7.69549C5.99627 6.70792 6.79867 5.90552 7.78624 5.90552C8.77381 5.90552 9.57621 6.70792 9.57621 7.69549C9.57621 8.68306 8.77381 9.48546 7.78624 9.48546Z" fill="black" stroke="black" strokeWidth="0.5"></path>
                          </svg>
                          <span className="block">
                            <span className="font-bold text-sm text-ink group-hover:text-[#D0302F] transition-colors block">{s.name}</span>
                            {s.type === "collect" ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded mt-1">
                                {/* Exact Collect Box SVG from Template */}
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="0.75" y="4.25" width="8.5" height="7.5" rx="1.25" stroke="currentColor" strokeWidth="1"></rect>
                                  <path d="M3 4.25V3A2 2 0 0 1 7 3V4.25" stroke="currentColor" strokeWidth="1.2"></path>
                                </svg>
                                <span>Collect Only</span>
                              </span>
                            ) : (
                              <span className="text-xs text-neutral-500 font-normal block">{s.detail}</span>
                            )}
                          </span>
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isCur ? "bg-ink text-white" : "text-neutral-500"}`}>
                          {s.dist}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2">
                  <button
                    onClick={() => setStoreOpen(false)}
                    className="w-full bg-ink hover:bg-neutral-800 text-white font-bold text-xs py-3.5 rounded-2xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Shop from this Store</span>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                      <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="white" stroke="white" strokeWidth="0.7"></path>
                    </svg>
                  </button>

                  <button
                    onClick={() => setStoreOpen(false)}
                    className="w-full bg-white hover:bg-neutral-50 text-ink border border-neutral-300 font-bold text-xs py-3 rounded-2xl transition flex items-center justify-center gap-2"
                  >
                    <span>Edit Location Details</span>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                      <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="black" stroke="black" strokeWidth="0.7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Primary Navigation */}
        <nav className="hidden items-center gap-7 md:flex text-sm font-bold text-ink" aria-label="Primary">
          <Link href="/" className="hover:text-[#D0302F] transition-colors py-2 flex items-center gap-1">
            <span>Shop Online</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 15 9" fill="none">
              <path d="M12.5 0L7.13375 5.36625L1.7675 0L0 1.7675L7.13375 8.90125L14.2675 1.7675L12.5 0Z" fill="currentColor"></path>
            </svg>
          </Link>
          <Link
            href="/skaftin"
            className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-[#D0302F] text-ink hover:text-white px-3.5 py-1.5 rounded-full transition duration-200 shadow-xs font-extrabold group"
          >
            <span>Skaftin</span>
          </Link>
          <Link href="/#recipes" className="hover:text-[#D0302F] transition-colors">
            Recipes
          </Link>
          <Link href="/" className="hover:text-[#D0302F] transition-colors flex items-center gap-1.5">
            <span>Stores</span>
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden items-center gap-1.5 rounded-full bg-brand-yellow-soft px-3 py-1.5 text-sm font-bold text-ink xl:inline-flex">
            <Star className="h-4 w-4 fill-ink" aria-hidden="true" />
            {stars}
            <span className="sr-only">Skaftin Stars earned</span>
          </span>

          {/* Exact Search SVG from Template */}
          <Link
            href="/#search"
            className="p-2.5 rounded-full hover:bg-neutral-100 transition"
            aria-label="Search items"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.1602 14.509L11.3428 10.6916C12.3084 9.59132 12.8922 8.13174 12.8922 6.55988C12.8922 3.07934 10.0629 0.25 6.58233 0.25C3.1018 0.25 0.25 3.05689 0.25 6.53742C0.25 10.018 3.07934 12.8473 6.55988 12.8473C8.13174 12.8473 9.59132 12.2635 10.6916 11.2979L14.509 15.1153C14.5988 15.2051 14.7111 15.25 14.8234 15.25C14.9356 15.25 15.0479 15.2051 15.1377 15.1153C15.3398 14.9581 15.3398 14.6886 15.1602 14.509ZM1.1482 6.53742C1.1482 3.5509 3.57335 1.12575 6.55988 1.12575C9.54641 1.12575 11.9716 3.5509 11.9716 6.53742C11.9716 9.52395 9.54641 11.9716 6.55988 11.9716C3.57335 11.9716 1.1482 9.52395 1.1482 6.53742Z" fill="black" stroke="black" strokeWidth="0.5"></path>
            </svg>
          </Link>

          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-sm font-extrabold hover:text-[#D0302F] transition pr-2"
          >
            <span>Sign In</span>
          </Link>

          {/* Exact Cart Trolley SVG from Template */}
          <Link
            href="/"
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-bold bg-neutral-100 hover:bg-[#FFAD00] transition duration-200 ${cartPulse ? "scale-105 bg-[#FFAD00]" : ""
              }`}
            aria-label="Shopping cart"
          >
            <svg width="21" height="19" viewBox="0 0 21 19" fill="none">
              <path d="M9.52359 16.2194C9.52359 15.1605 8.60802 14.2886 7.49625 14.2886C6.38449 14.2886 5.49072 15.1605 5.49072 16.2194C5.49072 17.2782 6.40629 18.1502 7.51805 18.1502C8.62982 18.1502 9.52359 17.2782 9.52359 16.2194ZM6.36269 16.2194C6.36269 15.6173 6.88587 15.119 7.51805 15.119C8.15023 15.119 8.67341 15.6173 8.67341 16.2194C8.67341 16.8214 8.15023 17.3197 7.51805 17.3197C6.88587 17.3197 6.36269 16.8214 6.36269 16.2194Z" fill="black" stroke="black" strokeWidth="0.3"></path>
              <path d="M17.0005 16.2194C17.0005 15.1605 16.0849 14.2886 14.9731 14.2886C13.8614 14.2886 12.9458 15.1605 12.9458 16.2194C12.9458 17.2782 13.8614 18.1502 14.9731 18.1502C16.0849 18.1294 17.0005 17.2782 17.0005 16.2194ZM13.8396 16.2194C13.8396 15.6173 14.3628 15.119 14.9949 15.119C15.6271 15.119 16.1503 15.6173 16.1503 16.2194C16.1503 16.8214 15.6271 17.3197 14.9949 17.3197C14.341 17.299 13.8396 16.8214 13.8396 16.2194Z" fill="black" stroke="black" strokeWidth="0.3"></path>
              <path d="M20.772 2.4544C20.6848 2.3506 20.554 2.28831 20.4232 2.28831H4.24816L4.13917 1.707C3.98657 0.793501 3.1582 0.149902 2.19903 0.149902H0.585887C0.346096 0.149902 0.149902 0.336754 0.149902 0.565128C0.149902 0.793501 0.346096 0.980353 0.585887 0.980353H2.22083C2.76581 0.980353 3.2018 1.35406 3.289 1.85233L4.66235 9.80389C4.66235 9.84541 4.66235 9.88693 4.68415 9.92846L4.92394 11.3402C5.12013 12.4406 6.1011 13.2503 7.30006 13.2503H18.0253C18.2651 13.2503 18.4613 13.0634 18.4613 12.835C18.4613 12.6067 18.2651 12.4198 18.0253 12.4198H7.30006C6.55888 12.4198 5.9267 11.9008 5.79591 11.1949L5.62152 10.1984H18.4613C18.6575 10.1984 18.8319 10.0738 18.8755 9.88693L20.8374 2.78658C20.881 2.68278 20.8592 2.55821 20.772 2.4544ZM18.1125 9.38866H5.46892L4.37896 3.11876H19.8564L18.1125 9.38866Z" fill="black" stroke="black" strokeWidth="0.3"></path>
            </svg>
            <span className="bg-ink text-white text-xs px-2 py-0.5 rounded-full font-extrabold">
              {cartCount}
            </span>
          </Link>

          {/* Exact Mobile Hamburger SVG from Template */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-ink hover:bg-neutral-100 transition"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {mobileOpen ? (
                <>
                  <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M6 18L18 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </>
              ) : (
                <>
                  <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-6 py-6 space-y-6 shadow-xl animate-[fadeIn_0.2s_ease]">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
            <p className="text-xs text-neutral-500 font-semibold uppercase mb-1">Current Store Location</p>
            <div className="flex items-center justify-between">
              <span className="font-black text-base text-ink flex items-center gap-2">
                <svg width="14" height="17" viewBox="0 0 16 19" fill="none">
                  <path d="M2.4566 2.44889C-0.485533 5.39102 -0.485533 10.1643 2.4566 13.0858L7.53847 18.1677C7.60019 18.2294 7.70306 18.25 7.78536 18.25C7.86766 18.25 7.97053 18.2294 8.03225 18.1677L13.1141 13.0858C16.0563 10.1437 16.0563 5.37045 13.1141 2.44889C10.172 -0.472668 5.39873 -0.493242 2.4566 2.44889ZM12.6409 12.6126L7.78536 17.4682L2.92981 12.6126C0.255144 9.93796 0.255144 5.59677 2.92981 2.90153C5.60448 0.226861 9.94567 0.226861 12.6409 2.90153C15.3156 5.59677 15.3156 9.93796 12.6409 12.6126Z" fill="black" stroke="black" strokeWidth="0.5"></path>
                </svg>
                {selectedStore}
              </span>
              <span className="text-xs font-bold bg-ink text-white px-2 py-0.5 rounded">0,7 KM</span>
            </div>
          </div>

          <ul className="space-y-4 font-extrabold text-2xl text-ink">
            <li>
              <Link href="/" onClick={() => setMobileOpen(false)} className="block py-1 border-b border-neutral-100">
                Shop Online
              </Link>
            </li>
            <li>
              <Link href="/skaftin" onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-1 border-b border-neutral-100 text-[#D0302F]">
                <span>Skaftin</span>

              </Link>
            </li>
            <li>
              <Link href="/#recipes" onClick={() => setMobileOpen(false)} className="block py-1 border-b border-neutral-100">
                Recipes & Cravings
              </Link>
            </li>
            <li>
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-1">
                <span>Stores</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
