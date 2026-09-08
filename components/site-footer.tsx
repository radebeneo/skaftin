"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import "./site-footer.css"

export function SiteFooter() {
  const [message, setMessage] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const email = form.elements.namedItem("email")
    const valid = email instanceof HTMLInputElement && email.validity.valid && email.value.trim() !== ""

    setIsValid(valid)
    setMessage(valid ? "Thanks. You're on the Eskort list." : "Please enter a valid email address.")

    if (valid) {
      form.reset()
    } else if (email instanceof HTMLInputElement) {
      email.focus()
    }
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <section className="newsletter" aria-labelledby="newsletter-title">
          <div className="newsletter-heading">
            <span className="mail-icon" aria-hidden="true"></span>
            <div>
              <h2 id="newsletter-title">Newsletter</h2>
              <p>Get all the latest specials and news</p>
            </div>
          </div>
          <form className="newsletter-form" noValidate onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input
              id="footer-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email*"
              required
              aria-invalid={isValid === false}
              onChange={() => {
                setIsValid(null)
                setMessage("")
              }}
            />
            <button className="button button-yellow button-cta" type="submit">Subscribe</button>
            <p className={`form-message${isValid ? " success" : ""}`} aria-live="polite">{message}</p>
          </form>
        </section>
        <img className="footer-pig footer-pig-right" src="/images1/deco/porki-footer.svg" alt="" width="160" height="160" />
        <div className="footer-outlines" aria-hidden="true">
          <img className="footer-outline" src="/images1/deco/eskort-vector.svg" alt="" width="879" height="130" />
          <img className="footer-outline" src="/images1/deco/eskort-vector.svg" alt="" width="879" height="130" />
          <img className="footer-outline" src="/images1/deco/eskort-vector.svg" alt="" width="879" height="130" />
        </div>
        <div className="footer-main">
          <Link className="footer-brand" href="/" aria-label="Eskort home">
            <img src="/images1/logo-footer.svg" alt="Eskort" width="150" height="70" />
          </Link>
          <nav className="footer-links" aria-label="Footer navigation">
            <div><Link href="/">Shop Online</Link><Link href="/#recipes">Recipes</Link><Link href="/#store-locator">Store Locator</Link><Link href="/#heritage">About Us</Link></div>
            <div><Link href="/#quality">Quality & Safety</Link><Link href="/">FAQs</Link><Link href="/">News</Link><Link href="/">Contact Us</Link></div>
            <div><Link href="/">Disclaimer</Link><Link href="/">PAIA</Link><Link href="/">Privacy Policy</Link><Link href="/">Terms of Service</Link><Link href="/">Cookies Settings</Link></div>
          </nav>
          <div className="socials">
            <a href="#" aria-label="Eskort on Facebook"><img src="/images1/facebook-icon.svg" alt="" width="25" height="25" /></a>
            <a href="#" aria-label="Eskort on Instagram"><img src="/images1/instagram-icon.svg" alt="" width="25" height="25" /></a>
            <a href="#" aria-label="Eskort on YouTube"><img src="/images1/youtube-icon.svg" alt="" width="25" height="25" /></a>
          </div>
        </div>
        <p className="copyright">&copy; 2026 Eskort. All rights reserved.</p>
      </div>
    </footer>
  )
}
