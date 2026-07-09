/* =========================================================
   Pabrik Tahu Sehat Sari — main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Hamburger menu (mobile) ---------- */
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen);
    });

    // Tutup menu ketika salah satu link diklik
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Tahun otomatis di footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     SWIPER — semua slider diinisialisasi jika elemennya ada
     ========================================================= */
  if (typeof Swiper === "undefined") return;

  // 1. Hero (home) — background fade otomatis
  if (document.querySelector(".hero__swiper")) {
    new Swiper(".hero__swiper", {
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1200,
      autoplay: { delay: 4000, disableOnInteraction: false },
      allowTouchMove: false,
    });
  }

  // 2. Tentang singkat (home) — thumbnail vertikal + slider utama
  if (document.querySelector(".about-brief__swiper")) {
    let aboutThumbs = null;
    const thumbsEl = document.querySelector(".about-brief__thumbs");

    if (thumbsEl) {
      aboutThumbs = new Swiper(thumbsEl, {
        direction: "vertical",
        slidesPerView: 4,
        spaceBetween: 10,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
      });
    }

    new Swiper(".about-brief__swiper", {
      speed: 700,
      rewind: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: ".about-brief__swiper .swiper-pagination", clickable: true },
      thumbs: aboutThumbs ? { swiper: aboutThumbs } : undefined,
    });
  }

  // 2b. Profil (tentang kami) — foto utama + thumbnail horizontal
  if (document.querySelector(".about__swiper")) {
    let profileThumbs = null;
    const profileThumbsEl = document.querySelector(".about__thumbs");

    if (profileThumbsEl) {
      profileThumbs = new Swiper(profileThumbsEl, {
        slidesPerView: 3,
        spaceBetween: 12,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
      });
    }

    new Swiper(".about__swiper", {
      speed: 700,
      rewind: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: ".about__swiper .swiper-pagination", clickable: true },
      thumbs: profileThumbs ? { swiper: profileThumbs } : undefined,
    });
  }

  // 3. Produk (home & halaman produk)
  document.querySelectorAll(".products__swiper").forEach((el) => {
    new Swiper(el, {
      loop: true,
      speed: 700,
      autoplay: { delay: 3200, disableOnInteraction: false },
      grabCursor: true,
      pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
      navigation: {
        nextEl: el.querySelector(".swiper-button-next"),
        prevEl: el.querySelector(".swiper-button-prev"),
      },
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 28 },
      },
    });
  });

  // 4. Galeri foto (tentang kami, event) — beberapa slide per tampilan
  document.querySelectorAll(".gallery-swiper").forEach((el) => {
    new Swiper(el, {
      loop: true,
      speed: 700,
      autoplay: { delay: 3000, disableOnInteraction: false },
      grabCursor: true,
      pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
      navigation: {
        nextEl: el.querySelector(".swiper-button-next"),
        prevEl: el.querySelector(".swiper-button-prev"),
      },
      slidesPerView: 1,
      spaceBetween: 14,
      breakpoints: {
        560: { slidesPerView: 2, spaceBetween: 16 },
        992: { slidesPerView: 3, spaceBetween: 20 },
      },
    });
  });

  // 5. Slider tunggal (tentang kami: foto profil & banner besar)
  document.querySelectorAll(".single-swiper").forEach((el) => {
    new Swiper(el, {
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 900,
      autoplay: { delay: 3800, disableOnInteraction: false },
      pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
      navigation: {
        nextEl: el.querySelector(".swiper-button-next"),
        prevEl: el.querySelector(".swiper-button-prev"),
      },
    });
  });
});
