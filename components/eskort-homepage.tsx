"use client"

import { useState } from "react"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { useNotificationsStore } from "@/lib/notifications-store"
import { RewardsPanel } from "@/components/rewards-panel"

interface Product {
  id: string
  name: string
  category: string
  weight: string
  price: string
  originalPrice?: string
  badge: string
  badgeColor: string
  image: string
  description: string
}

const SPECIALS: Product[] = [
  {
    id: "bbq-pork",
    name: "Eskort BBQ Pulled Pork",
    category: "Ready Made Meal",
    weight: "350g",
    price: "R 69.99",
    originalPrice: "R 84.99",
    badge: "SAVE R15",
    badgeColor: "bg-[#E43A3A] text-white",
    image: "https://eskortecom.ogilvyexperience.co.za/media/amollfbf/deals-01.png?width=500&height=500&v=1dcc7401bb84dd0",
    description: "Slow-cooked, tender shredded South African pork drenched in signature sticky BBQ marinade."
  },
  {
    id: "streaky-bacon",
    name: "Wood-Smoked Streaky Bacon",
    category: "Bacon Favorites",
    weight: "500g",
    price: "R 55.00",
    originalPrice: "R 64.99 each",
    badge: "2 FOR R110",
    badgeColor: "bg-[#FFC60A] text-black",
    image: "https://eskortecom.ogilvyexperience.co.za/media/amollfbf/deals-01.png?width=500&height=500&v=1dcc7401bb84dd0",
    description: "Crispy, golden wood-smoked slices perfected for weekend breakfasts and burger toppings."
  },
  {
    id: "tonkies-balls",
    name: "Tonkies Bacon & Potato Balls",
    category: "Lunchbox Legend",
    weight: "12 Pieces",
    price: "R 39.99",
    originalPrice: "R 49.99",
    badge: "KIDDOS DEAL",
    badgeColor: "bg-purple-600 text-white",
    image: "https://eskortecom.ogilvyexperience.co.za/media/hxjbvmwv/tonkies-1024x754-1.png",
    description: "Crispy bite-sized potato balls stuffed with sizzling Eskort bacon and melted cheese."
  },
  {
    id: "traditional-biltong",
    name: "Traditional Spiced Biltong",
    category: "Heritage Snack",
    weight: "250g",
    price: "R 99.00",
    originalPrice: "R 125.00",
    badge: "HIGH PROTEIN",
    badgeColor: "bg-green-700 text-white",
    image: "https://eskortecom.ogilvyexperience.co.za/media/amollfbf/deals-01.png?width=500&height=500&v=1dcc7401bb84dd0",
    description: "Seasoned with roasted coriander seeds and sea salt, naturally dried to absolute tenderness."
  }
]

const CATEGORIES = [
  { name: "Bacon", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/zqhho4bv/frame-59.svg" },
  { name: "Biltong", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/bfqmhlh2/frame-59-1.svg" },
  { name: "Cold Meats", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/5bzlbsb5/frame-59-2.svg" },
  { name: "Ready Made Meals", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/vlxiy5eb/frame-59-3.svg" },
  { name: "Fresh & Smoked", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/3z2jccwo/frame-59-4.svg" },
  { name: "Value Packs", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/31fldhw2/frame-59-5.svg", badge: "HOT" },
  { name: "Polony & Spreads", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/o0lhbrni/frame-59-6.svg" },
  { name: "Viennas & Sausages", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/15yk4er5/frame-59-7.svg" },
  { name: "Kids", iconUrl: "https://eskortecom.ogilvyexperience.co.za/media/2imhx3zl/frame-59-8.svg" },
]

const QUIZ_OPTIONS = [
  "Bacon",
  "Burgers & Frikkadels",
  "Fresh Meats: Steaks, Chops and Fillets",
  "Ham, Polony & Spreads",
  "Pork",
  "Pork Schnitzel",
  "Pulled Pork & Stewing Meats",
  "Ribs",
  "Roasts, Pork Belly & Eisbein",
  "Russians and Sausages"
]

export function EskortHomepage() {
  const { addItem } = useCartStore()
  const { addNotification } = useNotificationsStore()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [selectedCooking, setSelectedCooking] = useState<string>("Weekend Braai")

  function handleAddProduct(productName: string, price: string, productId: string, image?: string, category?: string, weight?: string) {
    addItem({ id: productId, name: productName, priceLabel: price, image, category, weight })
    addNotification('cart', `Added to cart!`, `${productName} (${price}) has been added to your cart.`)
  }

  function triggerToast(message: string) {
    addNotification('system', 'Notice', message)
  }

  function toggleQuizOption(opt: string) {
    setSelectedOptions(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    )
  }

  return (
    <div className="w-full overflow-hidden bg-white text-ink font-sans pb-16">

      {/* SECTION 1: HERO PROMOTIONAL CAROUSEL */}
      <section className="relative bg-[#FFAD00] border-b-2 border-black/10 overflow-hidden">
        <div className="absolute inset-0 bg-[#FFAD00]" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-yellow-300 opacity-20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col items-start">

            {/* Massive Headline Banner with High Protein Stamped Badge */}
            <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-center sm:justify-between lg:justify-start gap-3 sm:gap-6 lg:gap-8 mb-8 select-none">
              <h1 className="hero-impact-text text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[9.5rem] xl:text-[10.5rem] leading-none text-[#D0302F] uppercase tracking-tight font-black">
                SHOP
              </h1>

              {/* High Protein Rotating Circular Stamp Badge */}
              <div
                onClick={() => triggerToast("Filtered by High Protein range!")}
                className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 flex flex-col items-center justify-center shrink-0 my-2 sm:my-0 cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
              >
                {/* Circular Ring Outline */}
                <div className="absolute inset-2 sm:inset-2.5 md:inset-3 rounded-full border-[3px] sm:border-[3.5px] md:border-[4px] border-[#D0302F] opacity-95 transition-transform duration-700 group-hover:rotate-180" />
                {/* Text content positioned over the ring */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center transform -rotate-[14deg]">
                  <span
                    style={{ fontFamily: "'Antonio', 'Teko', 'Anton', sans-serif" }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black text-[#D0302F] tracking-wider uppercase leading-none mb-0.5 sm:mb-1 block transform rotate-[4deg]"
                  >
                    HIGH
                  </span>
                  <span
                    style={{
                      fontFamily: "'Permanent Marker', 'Caveat', cursive, sans-serif",
                      textShadow: "-3px -3px 0 #FFAD00, 3px -3px 0 #FFAD00, -3px 3px 0 #FFAD00, 3px 3px 0 #FFAD00"
                    }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.1rem] font-black text-[#D0302F] tracking-tight uppercase leading-none transform -rotate-[8deg] -ml-2 sm:-ml-3 block"
                  >
                    PROTEIN
                  </span>
                </div>
              </div>

              <h1 className="hero-impact-text text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[9.5rem] xl:text-[10.5rem] leading-none text-[#D0302F] uppercase tracking-tight font-black">
                ONLINE NOW
              </h1>
            </div>

            {/* Split row: Copy & Gourmet Sandwich Visual */}
            <div className="grid grid-cols-1 md:grid-cols-12 w-full items-center">
              <div className="md:col-span-5 flex flex-col items-start gap-6">
                <p className="text-base sm:text-lg text-ink font-semibold leading-relaxed pr-4">
                  Experience the gold standard of farm-fresh South African pork and premium cuts. Order online for instant store collection or direct door-to-door delivery.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#specials"
                    className="bg-white hover:bg-ink text-ink hover:text-white font-extrabold px-8 py-4 rounded-full text-base shadow-xl flex items-center gap-4 transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <span>Shop Now</span>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" className="group-hover:translate-x-1 transition-transform">
                      <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="currentColor" stroke="currentColor" strokeWidth="0.7"></path>
                    </svg>
                  </a>

                  <Link
                    href="/skaftin"
                    className="bg-ink hover:bg-neutral-800 text-brand-yellow font-extrabold px-6 py-4 rounded-full text-sm shadow-lg flex items-center gap-2 transition duration-200"
                  >
                    <span>Skaftin</span>
                  </Link>
                </div>
              </div>

              <div className="md:col-span-7 relative flex items-center justify-center md:justify-end mt-8 md:mt-0 py-4">
                {/* Decorative red pointer arrow */}
                <div className="absolute -top-6 left-6 md:left-12 z-20 hidden md:block text-[#D0302F] animate-bounce">
                  <svg width="65" height="75" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 10 10 Q 50 30 40 70 L 25 55 M 40 70 L 60 65" />
                  </svg>
                </div>

                {/* Exact Mzansi's Favourite Image Badge */}
                <div
                  onClick={() => triggerToast("South Africa's #1 Most Trusted Meat Brand!")}
                  className="absolute -bottom-6 left-4 md:left-8 z-30 transform -rotate-6 hover:rotate-0 transition duration-300 cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://eskortecom.ogilvyexperience.co.za/media/n42ftxcf/nzamsis-favourite.png"
                    alt="Mzansi's Favourite"
                    className="w-40 sm:w-48 lg:w-56 h-auto drop-shadow-2xl hover:scale-105 transition-transform"
                  />
                </div>

                {/* Unboxed & Enlarged Sandwich Image */}
                <div className="relative w-full flex items-center justify-center md:justify-end z-10 md:-mr-12 lg:-mr-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://eskortecom.ogilvyexperience.co.za/media/xc2hi551/mae-mu-iz0lrt1khgm-unsplash-1.png"
                    alt="Delicious Eskort Pastrami and Ham Sandwich"
                    className="w-[450px] sm:w-[600px] md:w-[700px] lg:w-[840px] xl:w-[940px] h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] transform hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORIES CAROUSEL BAR */}
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-[1.5px] border-ink bg-white text-ink text-xs font-bold uppercase tracking-wider">
            <span>📋</span>
            <span>Categories</span>
          </div>
          <p className="text-xs font-bold text-muted-foreground hidden sm:block">Tap to filter inventory →</p>
        </div>

        {/* Responsive Categories Grid/Carousel with Exact SVGs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name)
                  triggerToast(`Filtered specials by: ${cat.name}`)
                }}
                className={`group relative rounded-[24px] p-4 flex flex-col items-center justify-center text-center transition-all duration-200 border-2 ${isSelected
                  ? "bg-red-50 border-[#D0302F] shadow-md -translate-y-1"
                  : "bg-[#E6EEF4] border-transparent hover:-translate-y-1.5 hover:bg-[#d6e4f0] hover:shadow-lg"
                  }`}
              >
                {cat.badge && (
                  <span className="absolute top-1.5 right-2 bg-[#E43A3A] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    {cat.badge}
                  </span>
                )}
                <div className="w-14 h-14 mb-3 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.iconUrl} alt={cat.name} className="w-9 h-9 object-contain" />
                </div>
                <span className={`text-xs font-extrabold leading-tight transition-colors ${isSelected ? "text-[#D0302F]" : "text-ink group-hover:text-[#D0302F]"}`}>
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* SECTION 3: LATEST SPECIALS CONTAINER */}
      <section id="specials" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#E6EEF4] rounded-[32px] p-6 sm:p-10 border border-blue-200/60 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/50 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-[1.5px] border-ink bg-white text-ink text-xs font-bold uppercase tracking-wider">
                <span>🏷️</span>
                <span>Deals</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setSelectedCategory("All"); triggerToast("Showing all latest specials"); }}
                  className="text-xs font-black underline uppercase hover:text-[#D0302F] transition-colors"
                >
                  View All
                </button>
                <span className="text-neutral-400">/</span>
                <span className="text-xs font-bold text-neutral-600 bg-white px-3 py-1 rounded-full shadow-sm">
                  Showing: {selectedCategory}
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-ink uppercase tracking-tight">
                OUR LATEST SPECIALS
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById("specials-scroll")
                  if (el) el.scrollBy({ left: -320, behavior: "smooth" })
                }}
                className="w-12 h-12 rounded-full bg-white/80 hover:bg-white text-ink flex items-center justify-center transition active:scale-95 shadow"
                aria-label="Previous items"
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" className="rotate-180">
                  <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="black" stroke="black" strokeWidth="0.7"></path>
                </svg>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("specials-scroll")
                  if (el) el.scrollBy({ left: 320, behavior: "smooth" })
                }}
                className="w-12 h-12 rounded-full bg-ink hover:bg-neutral-800 text-white flex items-center justify-center transition active:scale-95 shadow-lg"
                aria-label="Next items"
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="white" stroke="white" strokeWidth="0.7"></path>
                </svg>
              </button>
            </div>
          </div>

          <div
            id="specials-scroll"
            className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {SPECIALS.map((prod) => (
              <div
                key={prod.id}
                className="min-w-[290px] sm:min-w-[310px] w-80 bg-white rounded-[24px] p-5 shadow-sm hover:shadow-2xl transition duration-300 flex flex-col justify-between group border border-gray-100 shrink-0 snap-start"
              >
                <div className="relative">
                  <span className={`absolute top-0 left-0 font-black text-xs px-3 py-1 rounded-full z-10 shadow-md ${prod.badgeColor}`}>
                    {prod.badge}
                  </span>
                  <span className="absolute top-0 right-0 bg-neutral-100 text-neutral-600 font-extrabold text-[10px] px-2.5 py-1 rounded-md">
                    {prod.weight}
                  </span>

                  <div className="h-48 w-full flex items-center justify-center my-3 relative overflow-hidden rounded-2xl bg-white p-2 group-hover:bg-amber-50/20 transition">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="space-y-1 mt-3">
                    <p className="text-xs font-bold text-[#D0302F] uppercase tracking-wider">{prod.category}</p>
                    <h3 className="font-extrabold text-lg text-ink group-hover:text-[#D0302F] transition-colors">{prod.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{prod.description}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    {prod.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through block font-medium">{prod.originalPrice}</span>
                    )}
                    <span className="text-2xl font-black text-ink">{prod.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddProduct(prod.name, prod.price, prod.id, prod.image, prod.category, prod.weight)}
                    className="bg-ink hover:bg-[#D0302F] text-white font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center gap-1.5 shadow-lg hover:shadow-red-500/20 transition active:scale-95"
                  >
                    <span>+ Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE "NEED HELP?" OCCASIONS QUIZ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-2 border-neutral-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">

          <div className="lg:col-span-5 h-[350px] lg:h-full min-h-[460px] bg-amber-400 relative overflow-hidden flex items-center justify-center p-6">
            {/* Exact Occasions Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://eskortecom.ogilvyexperience.co.za/media/ldrh0ipu/rectangle-17.png"
              alt="Occasions"
              className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
            />
            {/* Occasions Badge Icon */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://eskortecom.ogilvyexperience.co.za/media/ygte2yma/eskort-icon.svg" alt="Eskort Icon" className="w-8 h-8" />
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-center">
            <div className="w-fit mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-[1.5px] border-ink bg-white text-ink text-xs font-bold uppercase tracking-wider">
                <span>🔥</span>
                <span>Occasions</span>
              </div>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl text-ink uppercase tracking-tight mb-3">
              NEED HELP?
            </h2>

            <p className="text-base text-neutral-600 font-medium mb-6 leading-relaxed">
              Answer these two quick questions so that we can help you get on the right track with tailored recipes, cuts, and cooking recommendations.
            </p>

            <div className="space-y-3">
              <h3 className="font-bold text-lg text-ink flex items-center gap-2">
                <span>1. What&apos;re you looking for?</span>
                <span className="text-xs font-normal text-muted-foreground">(Tap all that apply)</span>
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {QUIZ_OPTIONS.map((opt) => {
                  const isSelected = selectedOptions.includes(opt)
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleQuizOption(opt)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border-2 ${isSelected
                        ? "bg-ink border-ink text-white shadow-md scale-95"
                        : "bg-white border-neutral-300 text-neutral-800 hover:border-[#D0302F] hover:text-[#D0302F] hover:-translate-y-0.5"
                        }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedOptions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-neutral-100 animate-[fadeIn_0.3s_ease]">
                <h3 className="font-bold text-lg text-ink mb-3">
                  2. How are you serving it today?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {["🔥 Weekend Braai", "🍳 Quick 15m Meal", "🍲 Sunday Roast", "🎒 Kids Lunchbox"].map((method) => (
                    <button
                      key={method}
                      onClick={() => {
                        setSelectedCooking(method)
                        triggerToast(`Selected preference: ${method}`)
                      }}
                      className={`p-3 rounded-2xl border text-xs font-extrabold transition-all ${selectedCooking === method
                        ? "bg-ink text-white border-ink shadow-md"
                        : "bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-ink"
                        }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <a
                  href="#specials"
                  onClick={() => triggerToast(`Matched 14 sizzling cuts for your ${selectedCooking}!`)}
                  className="w-full sm:w-auto bg-[#D0302F] hover:bg-ink text-white font-extrabold px-8 py-4 rounded-2xl text-sm shadow-xl inline-flex items-center justify-center gap-3 transition transform active:scale-95"
                >
                  <span>Show 14 Matching Products & Recipes</span>
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                    <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="white" stroke="white" strokeWidth="0.7"></path>
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: VALUES & PROMO FEATURE CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Freshness & Safety Promise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] overflow-hidden border border-blue-100 shadow-lg">
          <div className="lg:col-span-7 bg-[#E6EEF4] p-8 sm:p-12 flex flex-col justify-between relative">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-[1.5px] border-ink bg-white text-ink text-xs font-bold uppercase tracking-wider mb-6">
                <span>🛡️</span>
                <span>Values</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight flex flex-wrap items-center gap-3 mb-4 uppercase">
                <span>OUR</span>
                {/* Exact South Africa Flag Image */}
                <span className="inline-flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://eskortecom.ogilvyexperience.co.za/images/sa-flag.png" alt="SA Flag" className="w-8 h-8 object-contain inline-block" />
                </span>
                <span>FRESHNESS & SAFETY PROMISE</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed max-w-xl">
                At Eskort, the safety and unmatched flavor of the food we provide is our greatest heritage. Every slice, chop, and sausage undergoes rigorous farm-to-fork quality testing, serving as our reassurance of peak quality and prioritizing South African families&apos; wellbeing.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-blue-200/50">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Established 1917 • Over 100 Years of Excellence</span>
              <button
                onClick={() => triggerToast("All Eskort cuts are certified farm-fresh and hygienically guaranteed.")}
                className="h-11 w-11 rounded-2xl bg-ink text-white flex items-center justify-center hover:bg-[#D0302F] transition shadow-md"
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="white" stroke="white" strokeWidth="0.7"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 lg:h-auto relative overflow-hidden bg-[#609CC8]">
            {/* Exact Values Group Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://eskortecom.ogilvyexperience.co.za/media/lvtbt04l/group-79.png"
              alt="Eskort Freshness Values"
              className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
            />
          </div>
        </div>

        {/* 2-Column Feature Cards */}
        <div id="recipes" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          {/* Card 1: Sky Blue Recipes */}
          <div className="bg-[#66A3D1] rounded-[32px] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl group border-2 border-transparent hover:border-white/30 transition duration-300 min-h-[420px]">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white bg-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-wider mb-6">
                <span>🍽️</span>
                <span>Recipes</span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase max-w-sm mb-4 leading-none">
                WE&apos;VE GOT RECIPES TO HELP YOUR CRAVINGS
              </h3>

              <p className="text-sm text-blue-50 leading-relaxed max-w-xs mb-6">
                Discover mouth-watering braai masters&apos; secrets, weekday bacon pasta delights, and legendary toasted sandwiches curated by Mzansi&apos;s favorite chefs.
              </p>
            </div>

            <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-white/10 pointer-events-none group-hover:scale-110 transition duration-500" />

            {/* Exact Heritage Favourite Image Badge & Recipe Thumb */}
            <div className="absolute right-6 top-10 z-20 hidden sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://eskortecom.ogilvyexperience.co.za/media/dw0egb35/heritage-favourite-badge.png"
                alt="Heritage Favourite"
                className="w-28 h-auto drop-shadow-xl transform -rotate-12 group-hover:rotate-0 transition duration-300"
              />
            </div>

            <div className="relative z-10 mt-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://eskortecom.ogilvyexperience.co.za/media/d3spwn32/recipe-sandwitch.png"
                alt="Recipe Sandwich"
                className="w-56 h-auto drop-shadow-2xl hover:scale-105 transition transform"
              />
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between mt-auto border-t border-white/20">
              <span
                onClick={() => triggerToast("Opening Recipe & Kitchen Vault...")}
                className="text-xs font-extrabold underline cursor-pointer hover:text-blue-200"
              >
                Browse 120+ Free Recipes
              </span>
              <button
                onClick={() => triggerToast("Opening Recipe & Kitchen Vault...")}
                className="h-11 w-11 rounded-2xl bg-white text-ink flex items-center justify-center hover:scale-105 transition shadow-lg"
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="black" stroke="black" strokeWidth="0.7"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Card 2: Brand Red New Flavour / Tonkies */}
          <div className="bg-[#E43A3A] rounded-[32px] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl group border-2 border-transparent hover:border-white/30 transition duration-300 min-h-[420px]">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white bg-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-wider mb-6">
                <span>✨</span>
                <span>New</span>
              </div>

              <h3 className="font-display font-black text-4xl sm:text-5xl text-[#FFC60A] tracking-tight uppercase max-w-sm mb-4 leading-none drop-shadow">
                WE&apos;VE GOT SOME NEW FLAVOUR
              </h3>

              <p className="text-sm text-red-50 leading-relaxed max-w-xs mb-6 font-medium">
                Be the first to sink your teeth into our vibrant latest releases! From Kiddos Tonkies potato balls to sticky spicy ribs, built for big cravings and school lunches.
              </p>
            </div>

            {/* Exact Lunchbox Legend Badge & Tonkies Thumb */}
            <div className="absolute right-6 top-10 z-20 hidden sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://eskortecom.ogilvyexperience.co.za/media/1lbjn5kv/lunchbox-legend-badge.png"
                alt="Lunchbox Legend"
                className="w-28 h-auto drop-shadow-xl transform rotate-6 group-hover:rotate-0 transition duration-300"
              />
            </div>

            <div className="relative z-10 mt-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://eskortecom.ogilvyexperience.co.za/media/hxjbvmwv/tonkies-1024x754-1.png"
                alt="Tonkies"
                className="w-64 h-auto drop-shadow-2xl hover:scale-105 transition transform rounded-2xl"
              />
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between mt-auto border-t border-white/20">
              <Link
                href="/skaftin"
                className="text-xs font-extrabold underline hover:text-yellow-200 flex items-center gap-1.5"
              >
                <span>Plan meals in the Skaftin Lunchbox Builder →</span>
              </Link>
              <Link
                href="/skaftin"
                className="h-11 w-11 rounded-2xl bg-ink text-white flex items-center justify-center hover:scale-105 transition shadow-lg"
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <path d="M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z" fill="white" stroke="white" strokeWidth="0.7"></path>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* REWARDS PANEL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <RewardsPanel />
      </section>

    </div>
  )
}
