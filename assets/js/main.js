/* =========================================================
   NDIS Compliance Partners — main.js
   Page interaction behaviours shared across all pages.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initFAQ();
  initContactForm();
  initYearStamp();
});

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* ---------- FAQ accordion ---------- */
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

/* ---------- Contact form validation (client-side only demo) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const successBox = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: "name", check: (v) => v.trim().length > 1, msg: "Please enter your name." },
      {
        id: "email",
        check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        msg: "Please enter a valid email address.",
      },
      { id: "message", check: (v) => v.trim().length > 8, msg: "Tell us a little about what you need." },
    ];

    fields.forEach(({ id, check, msg }) => {
      const input = document.getElementById(id);
      const errEl = document.getElementById(id + "Err");
      if (!input) return;
      if (!check(input.value)) {
        valid = false;
        if (errEl) errEl.textContent = msg;
        input.style.borderColor = "#C0392B";
      } else {
        if (errEl) errEl.textContent = "";
        input.style.borderColor = "";
      }
    });

    if (!valid) return;

    // No backend wired up — this is a static front-end demo.
    // Replace this block with a fetch() call to your form endpoint.
    if (successBox) {
      successBox.classList.add("show");
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    form.reset();
  });
}

/* ---------- Footer year (fallback if common.js footer not used) ---------- */
function initYearStamp() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
