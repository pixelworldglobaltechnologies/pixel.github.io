/* =========================================================
   PIXEL WORLD GLOBAL TECHNOLOGIES
   Interactive UI
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      menuButton.classList.toggle("active");
      nav.classList.toggle("active");

      const isOpen = nav.classList.contains("active");

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

    });

    // Close menu after clicking a navigation link

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menuButton.classList.remove("active");
        nav.classList.remove("active");

      });

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const header = document.querySelector(".header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) return;

    const progress =
      (scrollTop / documentHeight) * 100;

    document.documentElement.style.setProperty(
      "--scroll-progress",
      `${progress}%`
    );

  }

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".service-card, " +
    ".about-main-card, " +
    ".about-content, " +
    ".process-card, " +
    ".audience-item, " +
    ".contact-content, " +
    ".form-card"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =======================================================
     STAGGER SERVICE CARDS
  ======================================================= */

  document
    .querySelectorAll(".services-grid .service-card")
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 70}ms`;

    });


  /* =======================================================
     STAGGER AUDIENCE CARDS
  ======================================================= */

  document
    .querySelectorAll(".audience-item")
    .forEach((item, index) => {

      item.style.transitionDelay =
        `${index * 70}ms`;

    });


  /* =======================================================
     HERO 3D TILT
     Desktop only
  ======================================================= */

  const techCard =
    document.querySelector(".main-tech-card");

  if (
    techCard &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    const heroVisual =
      document.querySelector(".hero-visual");

    heroVisual.addEventListener(
      "mousemove",
      event => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const rotateY =
          (x - 0.5) * 8;

        const rotateX =
          (0.5 - y) * 8;

        techCard.style.animation = "none";

        techCard.style.transform =
          `translateY(-4px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );

    heroVisual.addEventListener(
      "mouseleave",
      () => {

        techCard.style.animation =
          "cardFloat 6s ease-in-out infinite";

        techCard.style.transform = "";

      }
    );

  }


  /* =======================================================
     SERVICE CARD MOUSE GLOW
  ======================================================= */

  const serviceCards =
    document.querySelectorAll(".service-card");

  serviceCards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        card.style.background = `
          radial-gradient(
            220px circle at ${x}px ${y}px,
            rgba(92,225,230,.07),
            transparent 70%
          ),
          linear-gradient(
            145deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.018)
          )
        `;

      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.background = "";

      }
    );

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =======================================================
     CONTACT FORM
     
     IMPORTANT:
     Keep your existing form submission logic here if you
     already connected this form to Google Apps Script,
     Formspree, EmailJS, etc.
  ======================================================= */

  const form =
    document.getElementById("contactForm");

  const submitButton =
    document.getElementById("submitButton");

  if (form && submitButton) {

    form.addEventListener(
      "submit",
      event => {

        /*
          Do not preventDefault() here if your existing
          submission code is located elsewhere.

          This UI code only handles the button state.
        */

        submitButton.classList.add("loading");

        submitButton.disabled = true;

      }
    );

  }


  /* =======================================================
     ACTIVE SECTION NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(
      '.nav a[href^="#"]'
    );

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {

            link.classList.remove("active");

            if (
              link.getAttribute("href") ===
              `#${entry.target.id}`
            ) {

              link.classList.add("active");

            }

          });

        });

      },
      {
        threshold: 0.35
      }
    );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     CURRENT YEAR
     
     Automatically keeps footer year updated.
  ======================================================= */

  const footerText =
    document.querySelector(".footer-bottom p");

  if (footerText) {

    footerText.innerHTML =
      footerText.innerHTML.replace(
        /©\s*\d{4}/,
        `© ${new Date().getFullYear()}`
      );

  }

});