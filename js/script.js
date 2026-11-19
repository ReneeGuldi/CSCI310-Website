/* ============================================================
   script.js — pure JavaScript, no frameworks.
   ============================================================ */

/* ------------------------------------------------------------
   Shared helper — send a message to Renee through Web3Forms.
   Used by the contact form (below) and the chat assistant
   (chatbot.js). Returns { ok: boolean, message: string }.
   ------------------------------------------------------------ */
window.sendContactMessage = async function ({ name, email, topic, message, source }) {
  const cfg = window.SITE_CONFIG || {};
  if (!cfg.web3formsAccessKey) {
    return {
      ok: false,
      message: "The message service isn't set up yet. Please reach out on LinkedIn for now.",
    };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: cfg.web3formsAccessKey,
        subject: `Portfolio message: ${topic || "General"} (via ${source || "contact form"})`,
        from_name: "Renee Guldi Portfolio",
        name,
        email,
        topic: topic || "General",
        message,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { ok: true, message: "Thanks! Your message is on its way. Renee will get back to you by email." };
    }
    return { ok: false, message: data.message || "Something went wrong sending your message. Please try again." };
  } catch {
    return { ok: false, message: "Couldn't reach the message service. Check your connection and try again." };
  }
};

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
    if (themeToggle) {
      themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
      themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    }
  }

  let savedTheme = "dark";
  try { savedTheme = localStorage.getItem("theme") || "dark"; } catch { /* storage blocked */ }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch { /* storage blocked */ }
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
     Each card has data-project="p1".."p4"; the write-up comes
     from window.PROJECTS in js/projects.js.
     ------------------------------------------------------------ */
  const modal = document.getElementById("detailsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalExtra = document.getElementById("modalExtra");
  let lastFocused = null;

  // Small helper to build elements without innerHTML
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.appendChild(c));
    return node;
  }

  function openModal(project) {
    if (!modal || !project) return;
    lastFocused = document.activeElement;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.summary;
    if (modalEyebrow) modalEyebrow.textContent = project.eyebrow || "";

    if (modalExtra) {
      modalExtra.replaceChildren();
      if (project.highlights && project.highlights.length) {
        modalExtra.appendChild(el("h3", { class: "modal-subhead", text: "Highlights" }));
        modalExtra.appendChild(
          el("ul", { class: "modal-list" }, project.highlights.map((h) => el("li", { text: h })))
        );
      }
      if (project.tech && project.tech.length) {
        modalExtra.appendChild(el("h3", { class: "modal-subhead", text: "Built with" }));
        modalExtra.appendChild(
          el("ul", { class: "chip-row" }, project.tech.map((t) => el("li", { class: "chip", text: t })))
        );
      }
      if (project.note) {
        modalExtra.appendChild(el("p", { class: "modal-note", text: project.note }));
      }
      if (project.links && project.links.length) {
        modalExtra.appendChild(
          el(
            "div",
            { class: "btn-row" },
            project.links.map((l) => {
              const external = /^https?:/.test(l.href);
              const a = el("a", { class: l.primary ? "btn" : "btn btn-ghost", href: l.href, text: l.label });
              if (external) { a.target = "_blank"; a.rel = "noopener"; }
              return a;
            })
          )
        );
      }
    }

    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal || modal.getAttribute("aria-hidden") === "true") return;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll(".project-card[data-project]").forEach((card) => {
    card.addEventListener("click", () => {
      const data = (window.PROJECTS || {})[card.dataset.project];
      openModal(data);
    });
  });

  // Cards that still use the older data-title / data-desc attributes
  document.querySelectorAll(".project-card[data-title]").forEach((card) => {
    card.addEventListener("click", () => {
      openModal({ title: card.dataset.title, summary: card.dataset.desc });
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-close]").forEach((x) =>
      x.addEventListener("click", closeModal)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }


  /* --- EFFECT 5 — Back-to-top button that fades in after scrolling --- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  /* --- BONUS EFFECT — Mobile hamburger menu toggle --- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    // Close the menu after tapping a link (matters for #contact on the same page)
    navMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }


  /* ------------------------------------------------------------
     CONTACT FORM — validates, then sends through Web3Forms so
     no email address is ever published on the site.
     ------------------------------------------------------------ */
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");
  if (form && new URLSearchParams(location.search).get("topic") === "resume") {
    form.elements.topic.value = "Resume request";
  }
  if (form && statusEl) {
    const setStatus = (msg, kind) => {
      statusEl.textContent = msg;
      statusEl.className = `form-status ${kind || ""}`;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = form.elements; // note: form.name would be the form's own name, so use .elements
      if (f.botcheck && f.botcheck.checked) return; // honeypot tripped

      const name = f.name.value.trim();
      const email = f.email.value.trim();
      const message = f.message.value.trim();
      const topic = f.topic.value;

      // Mark empty / invalid fields so the user can see what to fix
      let firstBad = null;
      [f.name, f.email, f.message].forEach((input) => {
        const bad = !input.value.trim() || (input.type === "email" && !input.checkValidity());
        input.setAttribute("aria-invalid", String(bad));
        if (bad && !firstBad) firstBad = input;
      });
      if (firstBad) {
        setStatus("Please fill in your name, a valid email, and a message.", "is-error");
        firstBad.focus();
        return;
      }

      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      setStatus("Sending…", "");
      const result = await window.sendContactMessage({ name, email, topic, message, source: "contact form" });
      submitBtn.disabled = false;

      if (result.ok) {
        form.reset();
        setStatus(result.message, "is-success");
      } else {
        setStatus(result.message, "is-error");
      }
    });
  }

});

  /* --- EFFECT — Live Click Counter (JS Demo showcase) --- */

const counterBtn = document.getElementById("demoCounterBtn");
const counterText = document.getElementById("demoCounterText");
let clickCount = 0;
if (counterBtn && counterText) {
  counterBtn.addEventListener("click", () => {
    clickCount++;
    counterText.textContent = `Button clicked ${clickCount} time${clickCount === 1 ? "" : "s"}.`;
  });

}

  /* --- EFFECT — Live Updating Clock (JS Demo showcase) --- */
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