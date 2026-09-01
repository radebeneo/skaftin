"use client"

import { useState, useEffect, useRef } from "react"
import { useCartStore } from "@/lib/cart-store"
import { useNotificationsStore } from "@/lib/notifications-store"

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED CONSTANTS & TYPES
───────────────────────────────────────────────────────────────────────────── */

const CDN = "https://eskortecom.ogilvyexperience.co.za"

const ARROW_PATH =
  "M0.349609 5.42693L10.731 5.42693L6.28181 0.984622L6.84114 0.350006L12.3496 5.85001L6.84114 11.35L6.28181 10.7154L10.731 6.27308L0.349609 6.27308L0.349609 5.42693Z"

function ArrowIcon({ fill = "white" }: { fill?: string }) {
  return (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
      <path d={ARROW_PATH} fill={fill} stroke={fill} strokeWidth="0.7" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 1 — HERO VIDEO CAROUSEL
   Matches: article.home-intro > section.home-carousel
───────────────────────────────────────────────────────────────────────────── */

interface HeroSlide {
  videoSrc?: string
  imageSrc?: string
  label: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    videoSrc: "/video/ogilvy-home-banner.mp4",
    label: "Eskort – From our table to yours",
  },
  {
    imageSrc: `${CDN}/media/ldrh0ipu/rectangle-17.png`,
    label: "Eskort hero slide 2",
  },
]

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying]       = useState(true)
  const [progressKey, setProgressKey]   = useState(0)
  const reducedMotion = useRef(false)
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const videoRef      = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  useEffect(() => {
    if (!isPlaying || reducedMotion.current) return
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => {
        const next = (prev + 1) % HERO_SLIDES.length
        setProgressKey(k => k + 1)
        return next
      })
    }, 3500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPlaying, currentSlide])

  useEffect(() => {
    if (!videoRef.current) return
    if (currentSlide === 0) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [currentSlide])

  function togglePlay() {
    setIsPlaying(p => { const n = !p; if (n) setProgressKey(k => k + 1); return n })
  }

  return (
    <article className="home-intro" style={{ overflow: "hidden" }}>
      <section
        className="home-carousel"
        aria-label="Eskort hero carousel"
        style={{ overflow: "hidden" }}
      >
        {/* ── Slides ── */}
        <div className="hc-wrapper">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={i}
              className="hc-slide"
              role="group"
              aria-label={`${i + 1} / ${HERO_SLIDES.length}`}
              style={{
                opacity: i === currentSlide ? 1 : 0,
                pointerEvents: i === currentSlide ? "auto" : "none",
                transition: "opacity 0.4s ease",
              }}
            >
              {/* Media */}
              <div className="hc-media-holder">
                {slide.videoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <video
                    ref={i === 0 ? videoRef : undefined}
                    className="hc-media"
                    src={slide.videoSrc}
                    muted
                    autoPlay
                    playsInline
                    loop
                    preload="auto"
                    aria-label={slide.label}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="hc-media"
                    src={slide.imageSrc}
                    alt={slide.label}
                  />
                )}
              </div>

              {/* Overlay content */}
              <div className="hc-info">
                <h1>
                  FROM OUR TABLE
                  <span>TO YOURS</span>
                </h1>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="hero-sticker"
                  src="/images/deco/deco-title-squiggle.svg"
                  alt=""
                  aria-hidden="true"
                />
                <p>
                  Whether it&apos;s a weekday breakfast, a family dinner or a weekend braai,
                  discover delicious products made with the quality South Africans have
                  trusted for over 100 years.
                </p>
                <div className="hc-cta-holder">
                  <a href="/categories" className="hc-btn">SHOP PRODUCTS</a>
                  <a href="/categories" className="hc-btn hc-btn--secondary">VIEW SPECIALS</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Navigation / progress ── */}
        <div className="hc-navigation">
          <button
            id="hero-play-pause-btn"
            onClick={togglePlay}
            className="hc-play-pause"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
          {/* Progress bar */}
          <div className="hc-progress-track" aria-hidden="true">
            {isPlaying && !reducedMotion.current && (
              <div key={progressKey} className="hc-progress-fill animate-hero-progress" />
            )}
          </div>
          {/* Slide dots */}
          <div className="hc-dots" aria-hidden="true">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hc-dot${i === currentSlide ? " hc-dot--active" : ""}`}
                onClick={() => { setCurrentSlide(i); setProgressKey(k => k + 1) }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 2 — BROWSE YOUR FAVOURITES (Category carousel)
   Matches: article.our-categories
───────────────────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { name: "Bacon",              slug: "bacon",            icon: `${CDN}/media/zqhho4bv/frame-59.svg` },
  { name: "Biltong",            slug: "biltong",          icon: `${CDN}/media/bfqmhlh2/frame-59-1.svg` },
  { name: "Cold Meats",         slug: "cold-meats",       icon: `${CDN}/media/5bzlbsb5/frame-59-2.svg` },
  { name: "Ready Made Meals",   slug: "ready-made-meals", icon: `${CDN}/media/vlxiy5eb/frame-59-3.svg` },
  { name: "Fresh & Smoked",     slug: "fresh-smoked",     icon: `${CDN}/media/3z2jccwo/frame-59-4.svg` },
  { name: "Value Packs",        slug: "value-packs",      icon: `${CDN}/media/31fldhw2/frame-59-5.svg` },
  { name: "Polony & Spreads",   slug: "polony-spreads",   icon: `${CDN}/media/o0lhbrni/frame-59-6.svg` },
  { name: "Viennas & Sausages", slug: "viennas-sausages", icon: `${CDN}/media/15yk4er5/frame-59-7.svg` },
  { name: "Kids",               slug: "kids",             icon: `${CDN}/media/2imhx3zl/frame-59-8.svg` },
]

function CategoriesSection() {
  return (
    <article className="our-categories">
      <section className="oc-title">
        <h3>
          BROWSE YOUR
          <span>FAVOURITES</span>
        </h3>
      </section>
      <section className="oc-carousel">
        <div className="oc-wrapper">
          {CATEGORIES.map(cat => (
            <div key={cat.slug} className="oc-slide">
              <div className="oc-img-holder">
                <a href={`/categories?category=${cat.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.icon} alt={cat.name} loading="lazy" />
                </a>
              </div>
              <div className="oc-info">
                <a href={`/categories?category=${cat.slug}`} className="oc-label">
                  {cat.name}
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Arrows */}
        <button
          className="oc-arrow oc-arrow--prev"
          aria-label="Previous categories"
          onClick={() => {
            const el = document.querySelector(".oc-wrapper") as HTMLElement
            if (el) el.scrollBy({ left: -200, behavior: "smooth" })
          }}
        />
        <button
          className="oc-arrow oc-arrow--next"
          aria-label="Next categories"
          onClick={() => {
            const el = document.querySelector(".oc-wrapper") as HTMLElement
            if (el) el.scrollBy({ left: 200, behavior: "smooth" })
          }}
        />
      </section>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED — ICON TICKER BELT
   Matches: article.ticker-stickers > section.ticker.icon-belt
───────────────────────────────────────────────────────────────────────────── */

const TICKER_IMAGES = [
  { src: `${CDN}/media/2fmjgwej/good-pork.png`,   alt: "good-pork" },
  { src: `${CDN}/media/ddvie2om/mzansi-fav.png`,  alt: "mzansi-fav" },
  { src: `${CDN}/media/gqll4s22/og-polony.png`,   alt: "og-polony" },
  { src: `${CDN}/media/3qtefn2i/tjop-tjop.png`,   alt: "tjop-tjop" },
]

function TickerBelt() {
  // Duplicate content for seamless loop
  const items = [...TICKER_IMAGES, ...TICKER_IMAGES, ...TICKER_IMAGES]
  return (
    <article className="ticker-stickers">
      <section className="ticker icon-belt">
        <div className="ticker-wrapper">
          {[0, 1, 2].map(set => (
            <div key={set} className="ticker-content">
              {TICKER_IMAGES.map(img => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={img.alt} src={img.src} alt={img.alt} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED — PRODUCT CARD
   Used by: Sizzling Specials and SA Favourites sections
───────────────────────────────────────────────────────────────────────────── */

interface ProductItem {
  id: string
  name: string
  price: string
  originalPrice?: string
  saveBadge?: string
  image: string
  url: string
  hasVariants?: boolean
}

const SPECIALS_PRODUCTS: ProductItem[] = [
  {
    id: "deli-rindless-back-bacon",
    name: "Eskort Deli Rindless Back Bacon",
    price: "R159,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/eskort-deli-rindless-back-bacon/",
    hasVariants: true,
  },
  {
    id: "rindless-back-bacon",
    name: "Rindless Back Bacon",
    price: "R179,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/rindless-back-bacon/",
    hasVariants: true,
  },
  {
    id: "quick-add-test",
    name: "Quick Add Test",
    price: "R85,00",
    originalPrice: "R100,00",
    saveBadge: "Save 15%",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/quick-add-test/",
    hasVariants: false,
  },
  {
    id: "deli-shoulder-bacon",
    name: "Eskort Deli Shoulder Bacon",
    price: "R149,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/eskort-deli-shoulder-bacon/",
    hasVariants: true,
  },
  {
    id: "shoulder-bacon",
    name: "Shoulder Bacon",
    price: "R164,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/shoulder-bacon/",
    hasVariants: true,
  },
  {
    id: "deli-diced-bacon",
    name: "Deli Diced Bacon",
    price: "R62,37",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/deli-diced-bacon/",
    hasVariants: true,
  },
  {
    id: "diced-bacon",
    name: "Diced Bacon",
    price: "R119,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/diced-bacon/",
    hasVariants: true,
  },
]

const FAVOURITES_PRODUCTS: ProductItem[] = [
  {
    id: "fav-diced-bacon",
    name: "Diced Bacon",
    price: "R119,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/diced-bacon/",
    hasVariants: true,
  },
  {
    id: "fav-double-smoked",
    name: "Double Smoked Diced Bacon",
    price: "R41,93",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/double-smoked-diced-bacon/",
    hasVariants: true,
  },
  {
    id: "fav-eskort-dice",
    name: "Eskort Dice bacon",
    price: "R9,63",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/eskort-dice-bacon/",
    hasVariants: true,
  },
  {
    id: "fav-rindless-back",
    name: "Eskort Rindless Back Bacon",
    price: "R329,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/eskort-rindless-back-bacon/",
    hasVariants: true,
  },
  {
    id: "fav-rindless-back-2",
    name: "Rindless Back Bacon",
    price: "R179,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/rindless-back-bacon/",
    hasVariants: true,
  },
  {
    id: "fav-deli-shoulder",
    name: "Eskort Deli Shoulder Bacon",
    price: "R149,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/eskort-deli-shoulder-bacon/",
    hasVariants: true,
  },
  {
    id: "fav-shoulder",
    name: "Shoulder Bacon",
    price: "R164,99",
    image: `${CDN}/media/amollfbf/deals-01.png?width=500&height=500`,
    url: "/shop-online/bacon/shoulder-bacon/",
    hasVariants: true,
  },
]

/* Standard product card (specials style — details top, image bottom) */
function ProductCard({
  product,
  gold = false,
  onAdd,
}: {
  product: ProductItem
  gold?: boolean
  onAdd: (p: ProductItem) => void
}) {
  const [count, setCount] = useState(0)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (product.hasVariants) {
      window.location.href = product.url
      return
    }
    setCount(c => c + 1)
    onAdd(product)
  }

  function handleRemove(e: React.MouseEvent) {
    e.preventDefault()
    setCount(c => Math.max(0, c - 1))
  }

  return (
    <div className={`product-card${gold ? " gold" : ""}`}>
      {/* For gold layout — image first */}
      {gold && (
        <div className="product-image">
          <a href={product.url}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} />
          </a>
        </div>
      )}

      <div className="product-details">
        {!gold && (
          <div className="product-header">
            {product.saveBadge && <span className="save">{product.saveBadge}</span>}
          </div>
        )}
        <h4 className="product-title">{product.name}</h4>
        <div className="product-pricing">
          {product.originalPrice && (
            <h5 className="reducedPrice">
              Was <span>{product.originalPrice}</span>
            </h5>
          )}
          <h2 className="currentPrice">{product.price}</h2>
          <div className={`addtoCart${count > 0 ? " has-items" : ""}`}>
            <button type="button" className="add" aria-label="Add to cart" onClick={handleAdd}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.33276 7.99996H12.6672M7.99996 3.33276V12.6672" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="productCount">{count > 0 ? count : "Add"}</span>
            <button type="button" className="remove" aria-label="Remove from cart" onClick={handleRemove}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.33276 8H12.6672" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* For standard layout — image bottom */}
      {!gold && (
        <div className="product-image">
          <a href={product.url}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} />
          </a>
        </div>
      )}
    </div>
  )
}

/* Carousel wrapper shared between specials and favourites */
function ProductCarousel({
  id,
  products,
  gold = false,
  onAdd,
}: {
  id: string
  products: ProductItem[]
  gold?: boolean
  onAdd: (p: ProductItem) => void
}) {
  function scroll(dir: number) {
    const el = document.getElementById(id)
    if (el) el.scrollBy({ left: dir * 260, behavior: "smooth" })
  }
  return (
    <section className="product-carousel-outer">
      <div id={id} className="product-carousel">
        {products.map(p => (
          <div key={p.id} className="slide">
            <ProductCard product={p} gold={gold} onAdd={onAdd} />
          </div>
        ))}
      </div>
      <div className="navigation">
        <div className="arrow-prev" role="button" tabIndex={0} aria-label="Previous" onClick={() => scroll(-1)} />
        <div className="arrow-next" role="button" tabIndex={0} aria-label="Next" onClick={() => scroll(1)} />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 4 — SIZZLING SPECIALS
   Matches: div.general-slider-block > article.product-preview
───────────────────────────────────────────────────────────────────────────── */

function SizzlingSpecials({ onAdd }: { onAdd: (p: ProductItem) => void }) {
  return (
    <div className="general-slider-block">
      <article className="product-preview">
        <section className="gs-title">
          <h3>
            Sizzling
            <span>Specials</span>
          </h3>
          <p>
            Great taste doesn&apos;t have to cost more. Discover this week&apos;s hottest
            deals and stock up on your favourites while they last.
          </p>
          <div className="cta-holder">
            <a href="/categories" className="btn red">SHOP SPECIALS</a>
          </div>
        </section>
        <ProductCarousel
          id="specials-scroll"
          products={SPECIALS_PRODUCTS}
          onAdd={onAdd}
        />
      </article>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 5 — FULL-WIDTH SPECIALS BANNER
   Matches: article.our-specials > section.specials-carousel
───────────────────────────────────────────────────────────────────────────── */

const SPECIALS_BANNERS = [
  { src: `${CDN}/media/t5flcls1/image-mask.png`, alt: "rib-rack" },
  { src: `${CDN}/media/jqwomz3n/image-label.png`, alt: "specials-label" },
]

function SpecialsBanner() {
  const [active, setActive] = useState(0)
  return (
    <article className="our-specials">
      <section className="specials-carousel" aria-label="Specials banner">
        <div className="sb-wrapper">
          {SPECIALS_BANNERS.map((b, i) => (
            <div
              key={i}
              className="sb-slide"
              role="group"
              aria-label={`${i + 1} / ${SPECIALS_BANNERS.length}`}
              style={{
                opacity: i === active ? 1 : 0,
                pointerEvents: i === active ? "auto" : "none",
                transition: "opacity 0.4s ease",
              }}
            >
              <a href="/categories">
                <div className="media-holder prime-red">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="single" src={b.src} alt={b.alt} />
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="navigation">
          <div
            className="arrow-prev"
            role="button" tabIndex={0} aria-label="Previous slide"
            onClick={() => setActive(a => (a - 1 + SPECIALS_BANNERS.length) % SPECIALS_BANNERS.length)}
          />
          <div
            className="arrow-next"
            role="button" tabIndex={0} aria-label="Next slide"
            onClick={() => setActive(a => (a + 1) % SPECIALS_BANNERS.length)}
          />
        </div>
        <div className="swiper-pagination" aria-hidden="true">
          {SPECIALS_BANNERS.map((_, i) => (
            <span
              key={i}
              className={`swiper-pagination-bullet${i === active ? " swiper-pagination-bullet-active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </section>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 7 — DISCOVER / QUALITY YOU CAN TASTE
   Matches: article.discover-area
───────────────────────────────────────────────────────────────────────────── */

function DiscoverArea() {
  return (
    <article className="discover-area">
      <section className="banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${CDN}/media/jqwomz3n/image-label.png`} alt="sausage-on-fork" />
      </section>
      <section className="da-title">
        <h2>
          QUALITY YOU
          <span>CAN TASTE</span>
        </h2>
        <p>
          Great taste doesn&apos;t have to cost more. Discover this week&apos;s hottest
          deals and stock up on your favourites while they last.
        </p>
        <div className="cta-holder">
          <a href="/about-us" className="btn black">READ MORE</a>
        </div>
      </section>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 8 — RECIPES MADE EASY
   Matches: div.general-slider-block > article.recipes-preview
───────────────────────────────────────────────────────────────────────────── */

interface RecipeItem {
  id: string
  title: string
  totalTime: string
  thumb: string
  url: string
}

const RECIPES: RecipeItem[] = [
  {
    id: "shakshuka",
    title: "5 Ingredient Shakshuka with Bacon Grillers",
    totalTime: "30min",
    thumb: `${CDN}/media/yw2lwcbl/grillers.jpg`,
    url: "/recipes/5-ingredient-shakshuka-with-bacon-grillers/",
  },
  {
    id: "espetada",
    title: "Braai Espetada with Garlic Pasta Salad",
    totalTime: "40min",
    thumb: `${CDN}/media/3ynbv0eq/eskort-espatada-pasta-salad-braai.jpg`,
    url: "/recipes/braai-espetada-with-garlic-pasta-salad/",
  },
  {
    id: "hawaiian",
    title: "5 Ingredient Hawaiian Pizza",
    totalTime: "30min",
    thumb: `${CDN}/media/forpwah2/eskort-hawaiian-pizza-5-ingredient.jpg`,
    url: "/recipes/5-ingredient-hawaiian-pizza/",
  },
  {
    id: "butternut-bake",
    title: "Cheesy Bacon & Butternut Bake",
    totalTime: "35min",
    thumb: `${CDN}/media/dksc2y2v/eskort-cheesy-bacon-and-butternut-bake.jpg`,
    url: "/recipes/cheesy-bacon-butternut-bake/",
  },
  {
    id: "frikkadel-bake",
    title: "Easy Tomato & Frikkadel Bake",
    totalTime: "30min",
    thumb: `${CDN}/media/xiuprm1p/eskort-easy-tomato-and-frikkadel-bake.jpg`,
    url: "/recipes/easy-tomato-frikkadel-bake/",
  },
  {
    id: "alfredo",
    title: "Alfredo Pasta Rice with Streaky Bacon",
    totalTime: "25min",
    thumb: `${CDN}/media/snlazsmi/eskort-one-pan-one-pot-dishes-alfredo-pasta-rice.jpg`,
    url: "/recipes/alfredo-pasta-rice-with-streaky-bacon/",
  },
  {
    id: "frikkadels-pumpkin",
    title: "Frikkadels in a Spicy Pumpkin Sauce",
    totalTime: "35min",
    thumb: `${CDN}/media/lzihf31m/atipasto-plate-meat-balls-in-pumpkin-sauce.jpg`,
    url: "/recipes/frikkadels-in-a-spicy-pumpkin-sauce/",
  },
  {
    id: "meatball-sarmie",
    title: "Mediterranean Meatball Sarmie with Tzatziki",
    totalTime: "20min",
    thumb: `${CDN}/media/4smfxkh2/mediterranean-meatball-sub.jpg`,
    url: "/recipes/mediterranean-meatball-sarmie-with-tzatziki/",
  },
]

function RecipeCard({ recipe }: { recipe: RecipeItem }) {
  return (
    <div className="recipe-card">
      <div className="recipe-details">
        <div className="recipe-header">
          <p className="recipe-timing">
            Total:<span className="timing">{recipe.totalTime}</span>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="recipe-thumb"
            src={recipe.thumb}
            alt={recipe.title}
          />
          {/* Video overlay on hover */}
          <div className="media-thumb">
            <div className="media-holder">
              <video
                src="/video/making-a-sandwich.mp4"
                muted
                autoPlay
                playsInline
                loop
                preload="auto"
                aria-label="recipe preview"
              />
            </div>
          </div>
        </div>
        <div className="recipe-info">
          <h4>{recipe.title}</h4>
          <a href={recipe.url}>View Recipe</a>
        </div>
      </div>
    </div>
  )
}

function RecipesSection() {
  function scroll(dir: number) {
    const el = document.getElementById("recipes-scroll")
    if (el) el.scrollBy({ left: dir * 230, behavior: "smooth" })
  }
  return (
    <div className="general-slider-block">
      <article className="recipes-preview">
        <section className="gs-title">
          <h3>
            Recipes Made
            <span>Easy</span>
          </h3>
          <p>
            Great taste doesn&apos;t have to cost more. Discover this week&apos;s hottest
            deals and stock up on your favourites while they last.
          </p>
          <div className="cta-holder">
            <a href="/recipes" className="btn">ALL RECIPES</a>
          </div>
        </section>
        <section className="recipe-carousel-outer">
          <div id="recipes-scroll" className="recipe-carousel">
            {RECIPES.map(r => (
              <div key={r.id} className="slide">
                <RecipeCard recipe={r} />
              </div>
            ))}
          </div>
          <div className="navigation">
            <div className="arrow-prev" role="button" tabIndex={0} aria-label="Previous" onClick={() => scroll(-1)} />
            <div className="arrow-next" role="button" tabIndex={0} aria-label="Next" onClick={() => scroll(1)} />
          </div>
        </section>
      </article>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 9 — HERITAGE INFO CARDS
   Matches: article.info-card-area
───────────────────────────────────────────────────────────────────────────── */

function InfoCardArea() {
  return (
    <article className="info-card-area">
      {/* Card 1 — image thumb */}
      <div className="info-card">
        <div className="details">
          <div className="info">
            <div className="ic-title">
              <p className="year-est">EST.1917</p>
              <h3>
                OVER 100 YEARS
                <span>SA HERITAGE</span>
              </h3>
            </div>
            <div className="ic-body">
              <p>
                From humble beginnings in 1917 to becoming one of South Africa&apos;s
                most trusted food brands, our story is built on quality, innovation
                and bringing people together.
              </p>
            </div>
            <div className="cta-holder">
              <a href="/about-us" className="btn">READ MORE</a>
            </div>
          </div>
          <div className="thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${CDN}/media/zrslohcc/d5399e0e865fe911904a71340667a0788f1ff57d.jpg`}
              alt="braai-image"
            />
          </div>
        </div>
      </div>

      {/* Card 2 — video thumb */}
      <div className="info-card">
        <div className="details">
          <div className="info">
            <div className="ic-title">
              <p className="year-est">EST.1917</p>
              <h3>
                OVER 100 YEARS
                <span>SA HERITAGE</span>
              </h3>
            </div>
            <div className="ic-body">
              <p>
                From humble beginnings in 1917 to becoming one of South Africa&apos;s
                most trusted food brands, our story is built on quality, innovation
                and bringing people together.
              </p>
            </div>
            <div className="cta-holder">
              <a href="/about-us" className="btn">READ MORE</a>
            </div>
          </div>
          <div className="thumb">
            <div className="media-holder">
              <video
                src="/video/ogilvy-home-card.mp4"
                muted
                autoPlay
                playsInline
                loop
                preload="auto"
                aria-label="ogilvy-home-card"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 10 — SOUTH AFRICA'S FAVOURITES (Gold product cards)
   Matches: div.general-slider-block > article.product-preview.favourites
───────────────────────────────────────────────────────────────────────────── */

function SAFavourites({ onAdd }: { onAdd: (p: ProductItem) => void }) {
  return (
    <div className="general-slider-block">
      <article className="product-preview favourites">
        <section className="gs-title">
          <h3>
            south africa&apos;s
            <span>favorites</span>
          </h3>
          <p>
            Great taste doesn&apos;t have to cost more. Discover this week&apos;s hottest
            deals and stock up on your favourites while they last.
          </p>
          <div className="cta-holder">
            <a href="/categories" className="btn black">SHOP FAVOURITES</a>
          </div>
        </section>
        <ProductCarousel
          id="favourites-scroll"
          products={FAVOURITES_PRODUCTS}
          gold
          onAdd={onAdd}
        />
      </article>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT EXPORT — EskortHomepage
   Renders all 10 template sections in correct order
───────────────────────────────────────────────────────────────────────────── */

export function EskortHomepage() {
  const { addItem }        = useCartStore()
  const { addNotification } = useNotificationsStore()

  function handleAddProduct(product: ProductItem) {
    addItem({
      id: product.id,
      name: product.name,
      priceLabel: product.price,
      image: product.image,
    })
    addNotification(
      "cart",
      "Added to cart!",
      `${product.name} (${product.price}) has been added to your cart.`,
    )
  }

  return (
    <div className="eskort-homepage">
      {/* 1. Hero video carousel */}
      <HeroCarousel />

      {/* 2. Browse your favourites — category icons */}
      <CategoriesSection />

      {/* 3. Icon ticker belt */}
      <TickerBelt />

      {/* 4. Sizzling Specials — product carousel */}
      <SizzlingSpecials onAdd={handleAddProduct} />

      {/* 5. Full-width specials banner */}
      <SpecialsBanner />

      {/* 6. Icon ticker belt (repeated) */}
      <TickerBelt />

      {/* 7. Discover / Quality you can taste */}
      <DiscoverArea />

      {/* 8. Recipes Made Easy */}
      <RecipesSection />

      {/* 9. Heritage info cards */}
      <InfoCardArea />

      {/* 10. South Africa's Favourites — gold product carousel */}
      <SAFavourites onAdd={handleAddProduct} />
    </div>
  )
}
