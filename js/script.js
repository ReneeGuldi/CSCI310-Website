/* ============================================================
   script.js — pure JavaScript, no frameworks.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // Footer year (small utility, not counted as one of the 5 effects)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ------------------------------------------------------------
     EFFECT 1 — Dark / light theme toggle
     ------------------------------------------------------------ */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }


  /* ------------------------------------------------------------
     EFFECT 2 — Time-of-day greeting on the homepage hero
     ------------------------------------------------------------ */
  const greeting = document.getElementById("greeting");
  if (greeting) {
    const hour = new Date().getHours();
    let text = "Good evening";
    if (hour < 12) text = "Good morning";
    else if (hour < 18) text = "Good afternoon";
    greeting.textContent = `${text}, thanks for stopping by`;
  }


  /* ------------------------------------------------------------
     EFFECT 3 — Scroll-reveal for the project cards
     ------------------------------------------------------------ */
  const cards = document.querySelectorAll(".project-card");
  if (cards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
  }


  /* ------------------------------------------------------------
     EFFECT 4 — Project details modal
     ------------------------------------------------------------ */
  const modal = document.getElementById("detailsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");

  function openModal(title, desc) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".project-card[data-title]").forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.dataset.title, card.dataset.desc);
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-close]").forEach((el) =>
      el.addEventListener("click", closeModal)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }


  /* ------------------------------------------------------------
     EFFECT 5 — Back-to-top button that fades in after scrolling
     ------------------------------------------------------------ */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  /* ------------------------------------------------------------
     BONUS EFFECT — Mobile hamburger menu toggle
     ------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

});

  /* ------------------------------------------------------------
     EFFECT — Live Click Counter (JS Demo showcase)
     ------------------------------------------------------------ */

const counterBtn = document.getElementById("demoCounterBtn");
const counterText = document.getElementById("demoCounterText");
let clickCount = 0;
if (counterBtn && counterText) {
  counterBtn.addEventListener("click", () => {
    clickCount++;
    counterText.textContent = `Button clicked ${clickCount} time${clickCount === 1 ? "" : "s"}.`;
  });

}

  /* ------------------------------------------------------------
     EFFECT — Live Updating Clock (JS Demo showcase)
     ------------------------------------------------------------ */
const demoClock = document.getElementById("demoClock");
if (demoClock){
    function updateClock() {
        demoClock.textContent = new Date().toLocaleTimeString();
    }
    updateClock();
    setInterval(updateClock, 1000);
}



/* ============================================================
   END OF SCRIPT
   ============================================================ */