// @ts-nocheck

"use client"

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "./styles.css";
import { HomepageHeader } from "./header";

export function EskortHomepage() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    try {
      (() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const cartCount = document.querySelector(".cart-count");
        let cartTotal = 0;

        const scrollCarousel = (track, direction) => {
          const item = track.firstElementChild;
          if (!item) return;
          const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
          track.scrollBy({
            left: direction * (item.getBoundingClientRect().width + gap),
            behavior: reducedMotion.matches ? "auto" : "smooth"
          });
        };

        document.querySelectorAll(".carousel-shell").forEach((shell) => {
          const track = shell.querySelector("[data-carousel]");
          shell.querySelector("[data-carousel-prev]").addEventListener("click", () => scrollCarousel(track, -1));
          shell.querySelector("[data-carousel-next]").addEventListener("click", () => scrollCarousel(track, 1));
        });

        document.querySelectorAll("[data-controls]").forEach((control) => {
          control.addEventListener("click", () => {
            const track = document.getElementById(control.dataset.controls);
            scrollCarousel(track, Number(control.dataset.direction));
          });
        });

        document.querySelectorAll("[data-carousel]").forEach((track) => {
          track.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollCarousel(track, -1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollCarousel(track, 1);
            }
          });
        });

        const updateCart = (change) => {
          cartTotal = Math.max(0, cartTotal + change);
          cartCount.textContent = String(cartTotal);
          cartCount.setAttribute("aria-label", `${cartTotal} ${cartTotal === 1 ? "item" : "items"}`);
        };

        document.querySelectorAll("[data-add]").forEach((button) => {
          let quantity = 0;
          const product = button.dataset.product;

          const renderQuantity = () => {
            if (quantity === 0) {
              button.classList.remove("quantity-control");
              button.textContent = "+ Add";
              button.setAttribute("aria-label", `Add ${product} to cart`);
              return;
            }

            button.classList.add("quantity-control");
            button.innerHTML = `<b aria-hidden="true">−</b><span>${quantity}</span><b aria-hidden="true">+</b>`;
            button.setAttribute("aria-label", `${quantity} ${product} in cart. Click left side to decrease or right side to increase.`);
          };

          button.addEventListener("click", (event) => {
            if (quantity === 0) {
              quantity = 1;
              updateCart(1);
            } else {
              const bounds = button.getBoundingClientRect();
              const increase = event.clientX >= bounds.left + bounds.width / 2;
              quantity += increase ? 1 : -1;
              updateCart(increase ? 1 : -1);
            }
            renderQuantity();
          });

          renderQuantity();
        });

        document.querySelectorAll(".wishlist-button").forEach((button) => {
          button.addEventListener("click", () => {
            const active = button.classList.toggle("active");
            const label = button.getAttribute("aria-label");
            button.setAttribute("aria-pressed", String(active));
            button.setAttribute(
              "aria-label",
              active ? label.replace(/^Add/, "Remove").replace(/ to wishlist$/, " from wishlist") : label.replace(/^Remove/, "Add").replace(/ from wishlist$/, " to wishlist")
            );
            button.querySelector("img").src = active ? "images1/icon-heart-active.svg" : "images1/icon-heart.svg";
          });
        });

        const newsletter = document.querySelector(".newsletter-form");
        const email = newsletter && newsletter.querySelector("input");
        const message = newsletter && newsletter.querySelector(".form-message");

        newsletter && newsletter.addEventListener("submit", (event) => {
          event.preventDefault();
          const valid = email.validity.valid && email.value.trim() !== "";
          email.setAttribute("aria-invalid", String(!valid));
          message.classList.toggle("success", valid);
          message.textContent = valid
            ? "Thanks. You're on the Eskort list."
            : "Please enter a valid email address.";
          if (!valid) email.focus();
          if (valid) newsletter.reset();
        });

        email && email.addEventListener("input", () => {
          email.removeAttribute("aria-invalid");
          message.textContent = "";
          message.classList.remove("success");
        });

        const promotion = document.querySelector(".rib-rack-art");
        document.querySelectorAll(".campaign-arrow").forEach((button) => {
          button.addEventListener("click", () => {
            promotion.animate(
              [
                { opacity: 0.45, transform: "scale(1.015)" },
                { opacity: 1, transform: "scale(1)" }
              ],
              { duration: reducedMotion.matches ? 1 : 360, easing: "ease-out" }
            );
          });
        });

        const hero = document.querySelector("[data-hero]");

        if (hero) {
          const slides = [...hero.querySelectorAll("[data-hero-slide]")];
          const pagination = [...hero.querySelectorAll(".hero-pagination button")];
          const playbackButton = hero.querySelector(".hero-playback");
          const playbackLabel = hero.querySelector(".hero-playback-label");
          const progressValue = hero.querySelector("#Fill");
          const progressPig = hero.querySelector("#Timer");
          const imageDuration = 8000;
          const progressDistance = 157;
          let activeIndex = 0;
          let imageElapsed = 0;
          let lastFrame = performance.now();
          let paused = reducedMotion.matches;

          const activeVideo = () => slides[activeIndex].querySelector("video");

          const renderProgress = (value) => {
            const progress = Math.min(1, Math.max(0, value || 0));
            const pigX = progressDistance * progress;
            progressValue.style.strokeDasharray = `${progress} 1`;
            progressPig.setAttribute("transform", `translate(${pigX} 0)`);
          };

          const renderPlayback = () => {
            playbackButton.setAttribute("aria-pressed", String(paused));
            playbackButton.setAttribute("aria-label", paused ? "Play hero slideshow" : "Pause hero slideshow");
            playbackLabel.textContent = paused ? "Play" : "Pause";
          };

          const playActive = () => {
            if (paused) return;
            const video = activeVideo();
            if (video) video.play().catch(() => { });
          };

          const showSlide = (index) => {
            slides.forEach((slide) => {
              const video = slide.querySelector("video");
              slide.classList.remove("active");
              if (video) video.pause();
            });

            activeIndex = (index + slides.length) % slides.length;
            imageElapsed = 0;
            const slide = slides[activeIndex];
            const video = slide.querySelector("video");
            slide.classList.add("active");
            if (video) video.currentTime = 0;

            pagination.forEach((button, buttonIndex) => {
              const active = buttonIndex === activeIndex;
              button.classList.toggle("active", active);
              if (active) {
                button.setAttribute("aria-current", "true");
              } else {
                button.removeAttribute("aria-current");
              }
            });

            renderProgress(0);
            playActive();
          };

          const showNextSlide = () => showSlide(activeIndex + 1);

          slides.forEach((slide, index) => {
            const video = slide.querySelector("video");
            if (video) {
              video.addEventListener("ended", () => {
                if (index === activeIndex && !paused) showNextSlide();
              });
            }
          });

          pagination.forEach((button, index) => {
            button.addEventListener("click", () => showSlide(index));
          });

          playbackButton.addEventListener("click", () => {
            paused = !paused;
            const video = activeVideo();
            if (video) {
              if (paused) {
                video.pause();
              } else {
                video.play().catch(() => { });
              }
            }
            renderPlayback();
          });

          const tick = (now) => {
            const elapsed = Math.min(now - lastFrame, 100);
            lastFrame = now;

            if (!paused && !document.hidden) {
              const video = activeVideo();
              if (video) {
                if (Number.isFinite(video.duration) && video.duration > 0) {
                  renderProgress(video.currentTime / video.duration);
                }
              } else {
                imageElapsed += elapsed;
                renderProgress(imageElapsed / imageDuration);
                if (imageElapsed >= imageDuration) showNextSlide();
              }
            }

            requestAnimationFrame(tick);
          };

          const applyMotionPreference = (event) => {
            if (!event.matches) return;
            paused = true;
            const video = activeVideo();
            if (video) video.pause();
            showSlide(2);
            renderPlayback();
          };

          renderPlayback();
          showSlide(reducedMotion.matches ? 2 : 0);
          requestAnimationFrame(tick);
          reducedMotion.addEventListener?.("change", applyMotionPreference);
        }
      })();

    } catch (e) {
      console.error("Error in homepage script:", e);
    }
  }, []);

  return (
    <div className="eskort-homepage">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <HomepageHeader />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title" data-hero>
          <div className="hero-media" aria-hidden="true">
            <div className="hero-slide active" data-hero-slide>
              <video className="hero-video" muted playsInline preload="metadata" poster="images1/banner-desktop-image.png">
                <source src="video/ogilvy-home-banner.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="hero-slide" data-hero-slide>
              <video className="hero-video hero-video-bongi" muted playsInline preload="metadata">
                <source src="video/eskort-bongi-banner.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="hero-slide" data-hero-slide>
              <img className="hero-image" src="images1/occasions.png" alt="" />
            </div>
          </div>
          <div className="hero-shade"></div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="proof-pill">Loved by 41K+ across SA</p>
              <h1 id="hero-title"><span>From Our Table</span><em><b>To Yours</b><img className="title-squiggle"
                src="images1/deco/deco-title-squiggle.svg" alt="" width="172" height="112" /></em></h1>
              <p className="hero-description">Whether it's a weekday breakfast, a family dinner or a weekend braai, discover
                delicious products made with the quality South Africans have trusted for over 100 years.</p>
              <div className="button-row">
                <a className="button button-yellow button-cta" href="#favourites">Products</a>
                <a className="button button-outline button-cta" href="#specials">Specials</a>
                <Link id="hero-myskaftin-cta" className="button button-red button-cta" href="/skaftin">mySkaftin</Link>
              </div>
            </div>
            <div className="hero-controls">
              <svg id="progress" width="188" height="58" viewBox="0 0 188 58" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'hidden' }}>
                <g id="Progress Bar">
                  <line id="Track" x1="186.5" y1="56.5" x2="29.5001" y2="56.5" stroke="white" strokeOpacity="0.2"
                    strokeWidth="3" strokeLinecap="round"></line>
                  <path id="Fill" d="M29.5001 56.5L186.5 56.5" pathLength="1" stroke="white" strokeWidth="3"
                    strokeLinecap="round" style={{ strokeDasharray: '0 1' }}></path>
                  <g id="Timer">
                    <g id="Group">
                      <path id="Vector"
                        d="M39.0431 30.6401C39.1911 30.7369 39.2993 30.8166 39.3619 30.8621C39.2481 30.7938 39.1456 30.7198 39.0431 30.6401Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_2"
                        d="M45.5444 21.6672C46.5009 22.3163 47.2752 23.2215 47.6737 24.3033C47.8901 24.9011 48.0096 25.5444 48.0096 26.2163C48.0096 29.2907 45.5159 31.7901 42.4358 31.7901C41.3256 31.7901 40.2951 31.4656 39.424 30.9077C39.424 30.9077 39.424 30.9077 39.4069 30.8963C39.3898 30.8906 39.3727 30.8735 39.3613 30.8621C39.2987 30.8166 39.1905 30.7425 39.0425 30.6401C39.0368 30.6401 39.0254 30.6287 39.014 30.6173C36.7196 29.0915 25.4182 21.9633 12.4144 30.5831C12.4144 30.5831 10.6324 31.8926 8.91869 31.7844C5.84994 31.5681 3.34485 29.2907 3.34485 26.2106C3.34485 24.5025 4.10776 22.9767 5.31476 21.9576C5.31476 21.9576 5.32046 21.9462 5.33754 21.9348C5.38309 21.9006 5.49695 21.8095 5.67914 21.6729C8.12161 19.851 18.9732 12.1193 38.1429 18.086"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_3" d="M48.506 28.7953L49.6447 31.2321" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_4" d="M48.506 28.2374L50.9997 27.9869" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_5" d="M3.48744 30.1106L2.34875 32.5474" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_6" d="M3.48815 29.5469L1.00012 29.3021" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_7" d="M40.9688 19.1108L40.9005 19.1792" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_8" d="M8.30503 28.3001C7.34285 28.135 6.6084 27.1215 6.74504 26.1537" stroke="white"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_9" d="M25.6642 27.9072V46.5305" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_10"
                        d="M18.9741 27.9072C18.9741 27.9072 17.7387 36.5726 25.6696 36.7264C32.365 36.4303 32.718 31.6478 32.365 27.9072"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_11"
                        d="M21.6673 4.46164C21.6673 4.46164 20.5856 5.34981 20.5856 6.58529C20.5856 7.82076 21.9691 7.36529 21.9691 9.01069C21.9691 10.6561 20.3351 11.3906 20.3351 11.3906"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path id="Vector_12"
                        d="M27.0082 1.00003C27.0082 1.00003 25.9264 1.8882 25.9264 3.12368C25.9264 4.35916 27.3099 3.90369 27.3099 5.54909C27.3099 7.19449 25.6759 7.92894 25.6759 7.92894"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                  </g>
                </g>
              </svg>
              <button className="hero-playback" type="button" aria-label="Pause hero slideshow" aria-pressed="false">
                <span className="hero-pause-icon" aria-hidden="true"></span>
                <span className="hero-playback-label">Pause</span>
              </button>

            </div>
          </div>
        </section>

        <section className="categories section-dark" aria-labelledby="categories-title">
          <div className="container">
            <h2 className="section-title centered light" id="categories-title"><span>Browse Your</span><em>Favourites</em></h2>
            <div className="carousel-shell category-shell">
              <button className="carousel-control prev light-control" type="button" data-carousel-prev
                aria-label="Previous product categories"><img src="images1/icons/btn-arrow-light.svg"
                  style={{ transform: 'rotate(180deg)' }} alt="" aria-hidden="true" /></button>
              <div className="carousel-track category-track" data-carousel tabIndex="0" aria-label="Product categories">
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/bacon.png" alt="Bacon" width="180"
                  height="180" /></span><strong>Bacon</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/biltong.png" alt="Biltong" width="180"
                  height="180" /></span><strong>Biltong</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/braai.png" alt="Braai" width="180"
                  height="180" /></span><strong>Braai</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/cold-meats.png" alt="Cold Meats" width="180"
                  height="180" /></span><strong>Cold Meats</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/polony-spreads.png" alt="Spreads" width="180"
                  height="180" /></span><strong>Spreads</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/hampers.png" alt="Hampers" width="180"
                  height="180" /></span><strong>Hampers</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/pastry.png" alt="Pastry" width="180"
                  height="180" /></span><strong>Pastry</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/convenience.png" alt="Deli" width="180"
                  height="180" /></span><strong>Deli</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
                <a className="category-card" href="#"><span className="category-image"><img
                  src="images1/product-categories/sauces-spices.png" alt="Sauces &amp; Spices" width="180"
                  height="180" /></span><strong>Sauces &amp; Spices</strong><img className="category-arrow"
                    src="images1/icons/btn-arrow-light.svg" alt="" aria-hidden="true" /></a>
              </div>
              <button className="carousel-control next light-control" type="button" data-carousel-next
                aria-label="Next product categories"><img src="images1/icons/btn-arrow-light.svg" alt=""
                  aria-hidden="true" /></button>
            </div>
          </div>
        </section>

        <div className="category-marquee-stack">
          <div className="marquee-grunge marquee-grunge-before" aria-hidden="true"></div>
          <section className="sticker-marquee sticker-marquee-first rough-cream" aria-label="Eskort favourites">
            <div className="marquee-track">
              <div className="sticker-set">
                <img src="/images1/images1/stickers/good-pork.png" alt="Good pork" />
                <img src="/images1/images1/stickers/tjop-tjop.png" alt="Tjop tjop" />
                <img src="/images1/images1/stickers/mzansi-fav.png" alt="Mzansi favourite" />
                <img src="/images1/images1/stickers/top-of-the-tjops.png" alt="Top of the tjops" />
                <img src="/images1/images1/stickers/for-vark-steaks.png" alt="For vark's sake" />
                <img src="/images1/images1/stickers/og-polony.png" alt="OG Polony" />
              </div>
              <div className="sticker-set" aria-hidden="true">
                <img src="/images1/images1/stickers/good-pork.png" alt="" />
                <img src="/images1/images1/stickers/tjop-tjop.png" alt="" />
                <img src="/images1/images1/stickers/mzansi-fav.png" alt="" />
                <img src="/images1/images1/stickers/top-of-the-tjops.png" alt="" />
                <img src="/images1/images1/stickers/for-vark-steaks.png" alt="" />
                <img src="/images1/images1/stickers/og-polony.png" alt="" />
              </div>
            </div>
          </section>
          <div className="marquee-grunge marquee-grunge-after" aria-hidden="true"></div>
        </div>

        <section className="specials" id="specials" aria-labelledby="specials-title">
          <div className="container split-carousel">
            <div className="section-intro specials-intro">
              <img className="intro-icon" src="images1/deco/deco-flame.svg" alt="" width="55" height="65" />
              <h2 className="section-title" id="specials-title"><span>Sizzling</span><em>Specials</em></h2>
              <p>Great taste doesn't have to cost more. Discover this week's hottest deals and stock up on your favourites
                while they last.</p>
              <a className="button button-dark button-cta" href="#">Shop Specials</a>
            </div>
            <div className="product-carousel">
              <div className="carousel-track product-track" id="specials-track" data-carousel tabIndex="0"
                aria-label="Special products">
                <article className="product-card special-card">
                  <span className="sale-pill">On Sale</span>
                  <button className="wishlist-button" type="button" aria-label="Add Double Smoked Ham to wishlist"><img
                    src="images1/icon-heart.svg" alt="" width="22" height="22" /></button>
                  <div className="product-copy">
                    <h3>Double Smoked Ham</h3><del>R000.00</del><strong>R000.00</strong>
                  </div>
                  <button className="add-button red-add" type="button" data-add data-product="Double Smoked Ham">+ Add</button>
                  <img className="product-image" src="/images1/images1/product-specials/double-smoked-ham.png" alt="Double Smoked Ham"
                    width="280" height="260" />
                </article>
                <article className="product-card special-card">
                  <span className="sale-pill">On Sale</span>
                  <button className="wishlist-button" type="button" aria-label="Add Braai Spice to wishlist"><img
                    src="images1/icon-heart.svg" alt="" width="22" height="22" /></button>
                  <div className="product-copy">
                    <h3>Braai Spice</h3><del>R000.00</del><strong>R000.00</strong>
                  </div>
                  <button className="add-button red-add" type="button" data-add data-product="Braai Spice">+ Add</button>
                  <img className="product-image" src="/images1/images1/product-specials/braai-spice.png" alt="Braai Spice" width="280"
                    height="260" />
                </article>
                <article className="product-card special-card">
                  <span className="sale-pill">On Sale</span>
                  <button className="wishlist-button" type="button" aria-label="Add Big Braai Box to wishlist"><img
                    src="images1/icon-heart.svg" alt="" width="22" height="22" /></button>
                  <div className="product-copy">
                    <h3>Big Braai Box</h3><del>R000.00</del><strong>R000.00</strong>
                  </div>
                  <button className="add-button red-add" type="button" data-add data-product="Big Braai Box">+ Add</button>
                  <img className="product-image" src="/images1/images1/product-specials/braai-box.png" alt="Big Braai Box" width="280"
                    height="260" />
                </article>
              </div>
            </div>
          </div>
        </section>

        <div className="rib-rack-grunge-before" aria-hidden="true"></div>
        <section className="rib-rack rough-red" aria-label="Rib Rack Shack promotion">
          <button className="campaign-arrow campaign-prev" type="button" aria-label="Previous promotion"><span
            className="arrow-icon arrow-left" aria-hidden="true"></span></button>
          <div className="rib-rack-art" aria-hidden="true">
            <img className="rib-rack-logo" src="/images1/images1/rib-rack/rib-rack-shack.png" alt="" width="1118" height="598" />
            <div className="rib-rack-callout">
              <em>Every Thursday</em>
              <img src="images1/carousel-arrow-white.svg" alt="" width="99" height="161" />
            </div>
            <picture className="rib-rack-ribs">
              <source media="(max-width: 640px)" srcSet="/images1/images1/rib-rack/rib-rack-shack-mobile.png" />
              <img src="/images1/images1/rib-rack/rib.png" alt="" width="1814" height="1024" />
            </picture>
          </div>
          <button className="campaign-arrow campaign-next" type="button" aria-label="Next promotion"><span
            className="arrow-icon arrow-right" aria-hidden="true"></span></button>
        </section>

        <div className="rib-marquee-stack">
          <div className="marquee-grunge marquee-grunge-before" aria-hidden="true"></div>
          <section className="sticker-marquee rough-cream" aria-label="Eskort favourites">
            <div className="marquee-track">
              <div className="sticker-set">
                <img src="/images1/images1/stickers/good-pork.png" alt="Good pork" />
                <img src="/images1/images1/stickers/tjop-tjop.png" alt="Tjop tjop" />
                <img src="/images1/images1/stickers/mzansi-fav.png" alt="Mzansi favourite" />
                <img src="/images1/images1/stickers/top-of-the-tjops.png" alt="Top of the tjops" />
                <img src="/images1/images1/stickers/for-vark-steaks.png" alt="For vark's sake" />
                <img src="/images1/images1/stickers/og-polony.png" alt="OG Polony" />
              </div>
              <div className="sticker-set" aria-hidden="true">
                <img src="/images1/images1/stickers/good-pork.png" alt="" />
                <img src="/images1/images1/stickers/tjop-tjop.png" alt="" />
                <img src="/images1/images1/stickers/mzansi-fav.png" alt="" />
                <img src="/images1/images1/stickers/top-of-the-tjops.png" alt="" />
                <img src="/images1/images1/stickers/for-vark-steaks.png" alt="" />
                <img src="/images1/images1/stickers/og-polony.png" alt="" />
              </div>
            </div>
          </section>
          <div className="marquee-grunge marquee-grunge-after" aria-hidden="true"></div>
        </div>

        <section className="quality rough-gold" id="quality" aria-labelledby="quality-title">
          <img className="quality-food" src="images1/banners/grilled-sausage.png"
            alt="Grilled Eskort sausage with rosemary on a fork" width="800" height="500" />
          <div className="container quality-inner">
            <div className="quality-spacer" aria-hidden="true"></div>
            <div className="quality-copy">
              <h2 className="section-title light" id="quality-title"><span>Quality You</span><em>Can Taste</em></h2>
              <p>Great taste doesn't have to cost more. Discover this week's hottest deals and stock up on your favourites
                while they last.</p>
              <a className="button button-dark button-cta" href="#">Read More</a>
            </div>
          </div>
        </section>

        <section className="recipes section-dark rough-bottom" id="recipes" aria-labelledby="recipes-title">
          <div className="container split-carousel">
            <div className="section-intro recipes-intro">
              <h2 className="section-title light" id="recipes-title"><span>Recipes Made</span><em>Easy</em></h2>
              <p>Great taste doesn't have to cost more. Discover this week's hottest deals and stock up on your favourites
                while they last.</p>
              <a className="button button-yellow button-cta" href="#">All Recipes</a>
            </div>
            <div className="recipe-carousel">
              <div className="carousel-track recipe-track" id="recipes-track" data-carousel tabIndex="0" aria-label="Recipes">
                <article className="recipe-card">
                  <div className="recipe-image"><video autoPlay muted loop playsInline poster="images1/recipes/recipe-1.png"
                    aria-label="Making a pistachio pesto, ham and burrata focaccia sandwich">
                    <source src="video/making-a-sandwich.mp4" type="video/mp4" />
                  </video><span className="time-pill">Total: 45 min</span></div>
                  <p className="stars" aria-label="5 out of 5 stars">
                    <span></span><span></span><span></span><span></span><span></span>
                  </p>
                  <h3>Pistachio Pesto, Ham and Burrata Focaccia Sandwich</h3>
                  <a href="#">View Recipe</a>
                </article>
                <article className="recipe-card">
                  <div className="recipe-image"><img src="images1/recipes/recipe-2.png" alt="Eskort family recipe" width="390"
                    height="310" /><span className="time-pill">Total: 45 min</span></div>
                  <p className="stars" aria-label="5 out of 5 stars">
                    <span></span><span></span><span></span><span></span><span></span>
                  </p>
                  <h3>Smoky Bacon and Roasted Tomato Breakfast</h3>
                  <a href="#">View Recipe</a>
                </article>
                <article className="recipe-card">
                  <div className="recipe-image"><img src="images1/recipes/recipe-3.png" alt="Eskort pork recipe" width="390"
                    height="310" /><span className="time-pill">Total: 45 min</span></div>
                  <p className="stars" aria-label="5 out of 5 stars">
                    <span></span><span></span><span></span><span></span><span></span>
                  </p>
                  <h3>Sticky Pork Ribs with Fresh Summer Slaw</h3>
                  <a href="#">View Recipe</a>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="heritage rough-cream" id="heritage" aria-label="Our heritage and community">
          <div className="container heritage-grid">
            <article className="story-card">
              <video autoPlay muted loop playsInline poster="images1/cards/card-1.png"
                aria-label="Eskort's South African heritage">
                <source src="video/ogilvy-home-card.mp4" type="video/mp4" />
              </video>
              <div className="story-shade"></div>
              <div className="story-copy">
                <span className="story-pill">Est. 1917</span>
                <h2><span>Over 100 Years</span><em>SA Heritage</em><img className="story-title-squiggle"
                  src="images1/deco/deco-title-squiggle.svg" alt="" width="220" height="25" /></h2>
                <p>From humble beginnings in 1917 to becoming one of South Africa's most trusted food brands, our story is
                  built on quality, innovation and bringing people together.</p>
                <a className="button button-yellow button-cta" href="#">Read More</a>
              </div>
            </article>
            <article className="story-card" id="community">
              <img src="images1/cards/card-2.png" alt="Eskort community involvement" width="570" height="430" />
              <div className="story-shade"></div>
              <div className="story-copy">
                <span className="story-pill">Social Engagement</span>
                <h2><span>Growing</span><em>Together</em><img className="story-title-squiggle"
                  src="images1/deco/deco-title-squiggle.svg" alt="" width="220" height="25" /></h2>
                <p>We're investing in the people and communities that have always been part of our story.</p>
                <a className="button button-yellow button-cta" href="#">Read More</a>
              </div>
            </article>
          </div>
        </section>

        <section className="favourites" id="favourites" aria-labelledby="favourites-title">
          <div className="container split-carousel">
            <div className="section-intro favourites-intro">
              <h2 className="section-title green" id="favourites-title"><span>South Africa's</span><em>Favourites</em></h2>
              <p>Great taste doesn't have to cost more. Discover this week's hottest deals and stock up on your favourites
                while they last.</p>
              <a className="button button-dark button-cta" href="#">Shop Favorites</a>
            </div>
            <div className="product-carousel favourites-carousel">
              <div className="carousel-track product-track" id="favourites-track" data-carousel tabIndex="0"
                aria-label="Favourite products">
                <article className="product-card favourite-card">
                  <button className="wishlist-button" type="button" aria-label="Add Double Smoked Ham to wishlist"><img
                    src="images1/icon-heart.svg" alt="" width="22" height="22" /></button>
                  <img className="product-image" src="/images1/images1/favourites/double-smoked-ham.png" alt="Double Smoked Ham"
                    width="280" height="260" />
                  <div className="product-copy">
                    <p className="white-stars" aria-label="5 out of 5 stars">
                      <span></span><span></span><span></span><span></span><span></span>
                    </p>
                    <h3>Double Smoked Ham</h3><strong>R000.00</strong>
                  </div>
                  <button className="add-button" type="button" data-add data-product="Double Smoked Ham">+ Add</button>
                </article>
                <article className="product-card favourite-card">
                  <button className="wishlist-button" type="button" aria-label="Add Eskort Hamper to wishlist"><img
                    src="images1/icon-heart.svg" alt="" width="22" height="22" /></button>
                  <img className="product-image" src="/images1/images1/favourites/hamper.png" alt="Eskort Hamper" width="280"
                    height="260" />
                  <div className="product-copy">
                    <p className="white-stars" aria-label="5 out of 5 stars">
                      <span></span><span></span><span></span><span></span><span></span>
                    </p>
                    <h3>Family Hamper</h3><strong>R000.00</strong>
                  </div>
                  <button className="add-button" type="button" data-add data-product="Family Hamper">+ Add</button>
                </article>
                <article className="product-card favourite-card">
                  <button className="wishlist-button" type="button" aria-label="Add Sliced French Polony to wishlist"><img
                    src="images1/icon-heart.svg" alt="" width="22" height="22" /></button>
                  <img className="product-image" src="/images1/images1/favourites/sliced-french-polony.png" alt="Sliced French Polony"
                    width="280" height="260" />
                  <div className="product-copy">
                    <p className="white-stars" aria-label="5 out of 5 stars">
                      <span></span><span></span><span></span><span></span><span></span>
                    </p>
                    <h3>Sliced French Polony</h3><strong>R000.00</strong>
                  </div>
                  <button className="add-button" type="button" data-add data-product="Sliced French Polony">+ Add</button>
                </article>
                <article className="product-card favourite-card">
                  <button className="wishlist-button" type="button" aria-label="Add BBQ Spare Rib to wishlist"><img
                    src="images1/icon-heart.svg" alt="" width="22" height="22" /></button>
                  <img className="product-image" src="/images1/images1/favourites/bbq-spare-rib.png" alt="BBQ Spare Rib" width="280"
                    height="260" />
                  <div className="product-copy">
                    <p className="white-stars" aria-label="5 out of 5 stars">
                      <span></span><span></span><span></span><span></span><span></span>
                    </p>
                    <h3>BBQ Spare Rib</h3><strong>R000.00</strong>
                  </div>
                  <button className="add-button" type="button" data-add data-product="BBQ Spare Rib">+ Add</button>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="store-locator" id="store-locator" aria-labelledby="store-title">
          <div className="container store-inner">
            <div className="anim-block">
              <svg className="deco" id="splash-left" xmlns="http://www.w3.org/2000/svg" width="32" height="33"
                viewBox="0 0 32 33" fill="none">
                <path
                  d="M24.4217 23.6873C21.3701 25.1097 18.3934 26.6967 15.5068 28.4405C15.0251 28.7266 14.7928 29.3102 15.0602 29.8307C15.3039 30.3053 15.9725 30.5712 16.4504 30.2774C19.3369 28.5336 22.3136 26.9466 25.3653 25.5242C26.5752 24.9608 25.6278 23.1162 24.4178 23.6796L24.4217 23.6873Z"
                  fill="#A4F3C1" stroke="#A4F3C1"></path>
                <path
                  d="M21.7665 4.97859C21.1308 4.90852 20.4987 4.82688 19.8703 4.7144C19.8202 4.7111 19.6351 4.67076 19.7739 4.69619C19.6891 4.68171 19.6042 4.66724 19.5155 4.64511C19.3651 4.61596 19.2107 4.57919 19.0603 4.55004C18.744 4.48035 18.4238 4.40302 18.1035 4.32568C16.8455 4.00454 15.6172 3.59069 14.415 3.09577C13.9125 2.88957 13.2508 3.25847 13.1139 3.76408C12.9547 4.3392 13.245 4.84788 13.7822 5.06525C16.2948 6.09626 18.9534 6.75239 21.6581 7.04629C22.2013 7.10582 22.7462 6.60347 22.7519 6.06849C22.761 5.48346 22.3483 5.03769 21.7742 4.97465L21.7665 4.97859Z"
                  fill="#A4F3C1" stroke="#A4F3C1"></path>
                <path
                  d="M21.2017 15.2909C16.3851 17.1942 11.4253 18.6681 6.35699 19.7237C5.04772 19.9996 5.46993 22.0269 6.7792 21.751C12.0318 20.6588 17.1639 19.1061 22.1491 17.1355C23.3868 16.6449 22.4317 14.8043 21.2017 15.2909Z"
                  fill="#A4F3C1" stroke="#A4F3C1"></path>
              </svg>
              <svg id="pig" xmlns="http://www.w3.org/2000/svg" width="92" height="65" viewBox="0 0 92 65" fill="none">
                <path
                  d="M67.459 14.2141C64.7597 12.3969 64.5922 9.28307 64.9715 6.85725C65.2714 4.9166 65.9418 1 65.9418 1C69.3468 1 74.6572 5.73696 75.3717 6.06334C75.3805 6.07216 75.4069 6.0898 75.4245 6.0898H75.451C79.0501 6.38972 82.1992 6.9631 83.4077 6.9631C84.9955 6.9631 85.4983 5.18122 85.6571 3.83159C85.7453 3.07297 86.601 2.66719 87.2449 3.07297C88.2594 3.71691 89.5473 4.87248 90.3412 6.84842C91.8055 10.5004 89.2562 12.935 89.2562 12.935C89.2562 22.3031 80.1792 36.3552 72.3813 43.421C69.8408 45.7233 67.7854 47.2758 66.1711 48.3255"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M59.45 51.3776C56.7154 52.4715 51.1669 54.2004 43.4837 54.2004C32.2808 54.2004 22.3658 50.0456 22.3658 50.0456C16.5791 54.5532 11.2423 50.0456 7.82851 52.7361C5.71143 54.4033 5.288 57.3849 5.27035 59.4049C5.26153 60.5693 4.3001 61.5043 3.1357 61.5043C1.9272 61.5043 0.965656 60.5075 1.00094 59.299C1.08915 56.3351 1.66254 51.1306 4.43239 48.3608C7.70504 45.0881 8.79887 46.8788 10.5014 44.1972C12.2038 41.5156 9.04587 36.9197 12.8302 31.1948C20.337 19.7979 38.2616 24.3761 44.3482 22.0737C50.4348 19.7538 56.0185 7.854 64.8309 7.854"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M18.8818 51.8184C19.217 54.7912 19.9845 57.9668 21.6605 60.0486C22.0839 60.5866 22.7455 60.8777 23.4248 60.8777C25.1978 60.8777 26.2828 58.9547 25.3919 57.4287C24.2716 55.4968 23.2659 53.5474 24.6068 50.8657"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M65.6777 43.712C65.466 46.2437 65.1219 56.2381 66.1981 60.5516C66.6127 62.2012 65.3954 63.8066 63.6929 63.8066H63.6488C62.6255 63.8066 61.7081 63.2068 61.2846 62.2806C60.4202 60.3752 59.0353 53.7593 59.441 46.9494"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M71.1026 44.5502C70.5557 47.4082 70.247 52.2863 72.5052 57.7819C73.0168 59.0257 72.0906 60.393 70.741 60.393C70.1852 60.393 69.656 60.146 69.2943 59.7226C68.3857 58.664 66.6391 56.4146 65.413 53.636"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M13.6421 30.0567C13.6421 30.0567 8.20819 29.4745 9.56665 25.505C10.6869 22.2412 13.2011 24.2612 12.4072 25.505"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M74.243 13.1382C74.4914 13.1382 74.6929 12.9368 74.6929 12.6883C74.6929 12.4398 74.4914 12.2384 74.243 12.2384C73.9945 12.2384 73.7931 12.4398 73.7931 12.6883C73.7931 12.9368 73.9945 13.1382 74.243 13.1382Z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M25.118 27.7368C26.7676 27.2781 28.6642 26.9782 30.8342 26.8988" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <circle cx="21.6429" cy="29.0686" r="0.882116" fill="white" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}>
                </circle>
                <path d="M15.0969 37.5812C15.0969 37.5812 14.647 33.9116 18.8724 30.8242" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M69.0391 40.1303C69.0391 40.1303 71.4384 38.419 75.0198 33.6997" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
              </svg>
              <svg id="location" xmlns="http://www.w3.org/2000/svg" width="37" height="55" viewBox="0 0 37 55" fill="none">
                <path d="M29.5703 35.1199C30.3503 33.6999 30.4004 33.6099 31.1204 32.1899" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M32.8999 28.44C34.6499 24.51 35.84 20.93 35.84 18.42C35.84 8.79998 28.0399 1 18.4199 1C8.79992 1 1 8.79998 1 18.42C1 28.04 18.4199 53.45 18.4199 53.45C18.4199 53.45 22.5699 47.4 26.8199 40.08"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M18.4203 24.5198C21.7892 24.5198 24.5204 21.7887 24.5204 18.4198C24.5204 15.0509 21.7892 12.3198 18.4203 12.3198C15.0514 12.3198 12.3203 15.0509 12.3203 18.4198C12.3203 21.7887 15.0514 24.5198 18.4203 24.5198Z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
              </svg>
              <svg id="serving" xmlns="http://www.w3.org/2000/svg" width="79" height="84" viewBox="0 0 79 84" fill="none">
                <path
                  d="M37.7871 26.6238C37.1361 26.2939 36.4865 25.9761 35.8355 25.6462C28.0344 39.1327 25.135 58.3314 22.5725 64.2438C21.7764 66.0739 19.6474 66.9034 17.8226 66.1005C16.0168 65.3013 15.204 63.2072 16.01 61.4066C16.0259 61.3861 16.0296 61.3672 16.0387 61.3414C18.802 55.5083 23.9103 38.1531 31.9508 25.2455"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M50.1608 7.88757C47.5471 13.5418 45.0281 19.2147 42.6023 24.8944C41.8273 26.6972 39.5568 27.5261 37.7818 26.6308"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M30.6962 23.1149C28.9054 22.24 28.547 20.1375 29.7273 18.4742C33.2863 13.4327 36.9492 8.48272 41.2286 3.63927"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M19.0326 60.6363C20.3878 57.9724 21.7672 55.3053 23.1724 52.6473" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M12.831 66.3385C12.831 66.3385 10.9153 64.0886 12.6509 60.6379" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path
                  d="M50.5419 50.0379C49.0412 48.7324 48.9518 46.3252 50.3249 44.9205C54.6611 40.5253 64.6554 29.5367 69.3715 25.4688C73.4327 21.9638 77.7408 24.8341 75.6385 27.6726C66.7368 39.9999 40.5862 72.2222 36.2354 76.9886C36.2195 77.009 36.2089 77.0227 36.193 77.0432C34.8299 78.4773 32.5876 78.5088 31.1656 77.1441C29.7352 75.762 29.6923 73.4781 31.0865 72.0462C35.5867 67.4394 41.6434 63.0234 51.179 50.6958C50.6322 50.2173 51.0955 50.5218 50.5555 50.0485"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M41.8274 67.437C39.8945 69.7186 37.9648 72.0245 36.0623 74.3516" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M32.8383 81.8496C32.8383 81.8496 35.6439 82.7684 38.1861 79.8557" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M43.8747 4.9043L36.0022 16.2705" stroke="white" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
                <path d="M46.9587 6.60693L40.275 18.9058" stroke="white" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" style={{ stroke: 'rgba(255, 255, 255, 0.2)' }}></path>
              </svg>
              <svg className="deco" id="splash-right" xmlns="http://www.w3.org/2000/svg" width="32" height="33"
                viewBox="0 0 32 33" fill="none">
                <path
                  d="M6.97411 23.6868C10.0258 25.1091 13.0025 26.6961 15.889 28.4399C16.3708 28.7261 16.603 29.3097 16.3357 29.8302C16.0919 30.3047 15.4233 30.5707 14.9455 30.2769C12.059 28.533 9.08224 26.946 6.03059 25.5237C4.82065 24.9602 5.7681 23.1157 6.97804 23.6791L6.97411 23.6868Z"
                  fill="#A4F3C1" stroke="#A4F3C1"></path>
                <path
                  d="M9.62833 4.97854C10.2641 4.90847 10.8961 4.82682 11.5246 4.71435C11.5747 4.71104 11.7598 4.6707 11.621 4.69614C11.7058 4.68166 11.7906 4.66718 11.8794 4.64506C12.0298 4.6159 12.1841 4.57914 12.3345 4.54999C12.6509 4.4803 12.9711 4.40297 13.2913 4.32563C14.5494 4.00449 15.7777 3.59064 16.9798 3.09572C17.4824 2.88951 18.1441 3.25842 18.281 3.76403C18.4402 4.33915 18.1499 4.84783 17.6126 5.0652C15.1001 6.09621 12.4415 6.75234 9.73681 7.04624C9.19356 7.10576 8.64869 6.60342 8.64295 6.06844C8.6339 5.48341 9.04659 5.03764 9.62067 4.9746L9.62833 4.97854Z"
                  fill="#A4F3C1" stroke="#A4F3C1"></path>
                <path
                  d="M10.1942 15.2904C15.0108 17.1937 19.9706 18.6676 25.0389 19.7231C26.3481 19.999 25.9259 22.0263 24.6166 21.7504C19.364 20.6582 14.2319 19.1055 9.24671 17.135C8.00904 16.6443 8.96414 14.8037 10.1942 15.2904Z"
                  fill="#A4F3C1" stroke="#A4F3C1"></path>
              </svg>
            </div>
            <h2 className="section-title centered light" id="store-title"><span>Find An Eskort</span><em>Near You</em></h2>
            <div className="button-row centered-buttons">
              <a className="button button-dark" href="#">Find A Store</a>
              <a className="button button-outline" href="#">Shop Online</a>
              <a className="button button-outline" href="#recipes">Find A Recipe</a>
            </div>
          </div>
        </section>
      </main>

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
            <form className="newsletter-form" noValidate>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="Email*" required />
              <button className="button button-yellow button-cta" type="submit">Subscribe</button>
              <p className="form-message" aria-live="polite"></p>
            </form>
          </section>
          <img className="footer-pig footer-pig-right" src="/images1/deco/porki-footer.svg" alt="" width="160" height="160" />
          <div className="footer-outlines" aria-hidden="true">
            <img className="footer-outline" src="/images1/deco/eskort-vector.svg" alt="" width="879" height="130" />
            <img className="footer-outline" src="/images1/deco/eskort-vector.svg" alt="" width="879" height="130" />
            <img className="footer-outline" src="/images1/deco/eskort-vector.svg" alt="" width="879" height="130" />
          </div>
          <div className="footer-main">
            <a className="footer-brand" href="#" aria-label="Eskort home">
              <img src="/images1/logo-footer.svg" alt="Eskort" width="150" height="70" />
            </a>
            <nav className="footer-links" aria-label="Footer navigation">
              <div><a href="#">Shop Online</a><a href="#recipes">Recipes</a><a href="#store-locator">Store Locator</a><a href="#heritage">About Us</a></div>
              <div><a href="#quality">Quality & Safety</a><a href="#">FAQs</a><a href="#">News</a><a href="#">Contact Us</a></div>
              <div><a href="#">Disclaimer</a><a href="#">PAIA</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookies Settings</a></div>
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
    </div>
  );
}
