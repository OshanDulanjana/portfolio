(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Loader
     ------------------------------------------------------------------ */
  function hideLoader() {
    var loader = document.getElementById("loader");
    if (!loader) return;
    loader.classList.add("is-hidden");
    window.setTimeout(function () {
      loader.setAttribute("hidden", "");
    }, 450);
  }

  window.addEventListener("load", function () {
    window.setTimeout(hideLoader, prefersReducedMotion ? 0 : 350);
  });

  /* ------------------------------------------------------------------
     Sticky / compact navigation on scroll
     ------------------------------------------------------------------ */
  var header = document.getElementById("siteHeader");

  function updateHeaderState() {
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------ */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.style.overflow = "";
  }

  function openMobileMenu() {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
    document.body.style.overflow = "hidden";
  }

  navToggle.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.contains("is-open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenu.querySelectorAll("a[data-nav]").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMobileMenu();
    }
  });

  /* ------------------------------------------------------------------
     Scroll-spy for active nav link
     ------------------------------------------------------------------ */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[data-nav]'));

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isMatch);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------
     Scroll reveal for content blocks
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(
    ".highlight-card, .timeline-item, .edu-card, .cert-card, .skill-card, .lang-card, .contact-card"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
