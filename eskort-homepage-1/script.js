(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const searchToggle = document.querySelector(".search-toggle");
  const searchPanel = document.querySelector(".search-panel");
  const cartCount = document.querySelector(".cart-count");
  let cartTotal = 0;

  const setExpanded = (button, panel, open) => {
    button.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  };

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    setExpanded(menuToggle, mobileNav, open);
    document.body.classList.toggle("menu-open", open);
    if (open && searchToggle.getAttribute("aria-expanded") === "true") {
      setExpanded(searchToggle, searchPanel, false);
    }
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      setExpanded(menuToggle, mobileNav, false);
      document.body.classList.remove("menu-open");
    }
  });

  searchToggle.addEventListener("click", () => {
    const open = searchToggle.getAttribute("aria-expanded") !== "true";
    setExpanded(searchToggle, searchPanel, open);
    if (open) {
      searchPanel.querySelector("input").focus();
      setExpanded(menuToggle, mobileNav, false);
      document.body.classList.remove("menu-open");
    }
  });

  searchPanel.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setExpanded(menuToggle, mobileNav, false);
    setExpanded(searchToggle, searchPanel, false);
    document.body.classList.remove("menu-open");
  });

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
  const email = newsletter.querySelector("input");
  const message = newsletter.querySelector(".form-message");

  newsletter.addEventListener("submit", (event) => {
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

  email.addEventListener("input", () => {
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
      if (video) video.play().catch(() => {});
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
          video.play().catch(() => {});
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
