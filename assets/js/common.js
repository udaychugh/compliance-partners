/* =========================================================
   NDIS Compliance Partners — common.js
   Shared, reusable Navigation + Footer components.
   Drop <div id="site-header"></div> and <div id="site-footer"></div>
   into any page, include this script, and call:
     NDISCP.init('page-key');
   page-key = 'home' | 'services' | 'registrations' | 'about' | 'contact'
   ========================================================= */

const NDISCP = (function () {

  const LOGO_PATH = "assets/images/logo.webp";

  const NAV_LINKS = [
    { key: "home",          label: "Home",                 href: "index.html" },
    { key: "services",      label: "Compliance Services",  href: "services.html" },
    { key: "registrations", label: "Business Registrations", href: "business-registrations.html" },
    { key: "about",         label: "About Us",             href: "about.html" },
    { key: "contact",       label: "Contact",              href: "contact.html" },
  ];

  function navHTML(active) {
    const links = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${l.key === active ? "active" : ""}">${l.label}</a>`
    ).join("");

    return `
      <div class="wrap nav">
        <a href="index.html" class="brand" aria-label="NDIS Compliance Partners home">
          <img src="${LOGO_PATH}" alt="NDIS Compliance Partners logo" width="46" height="46" />
          
        </a>

        <nav class="nav-links" id="navLinks">
          ${links}
          <a href="contact.html" class="btn btn-primary btn-sm nav-cta" style="display:none;">Book a Consult</a>
        </nav>

        <div class="nav-actions">
          <span class="nav-phone">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            0498475578
          </span>
          <a href="contact.html" class="btn btn-primary btn-sm">Book a Consult</a>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    return `
      <div class="wrap footer-top">
        <div class="footer-col">
          <div class="footer-brand">
            <span class="footer-brand-text">NDIS Compliance Partners</span>
          </div>
          <p class="footer-desc">Independent governance, risk, compliance, finance and business advisory support for NDIS providers across Australia &mdash; from first registration to full audit readiness.</p>
        </div>

        <div class="footer-col">
          <h4>Compliance Services</h4>
          <ul>
            <li><a href="services.html#governance">Governance</a></li>
            <li><a href="services.html#risk">Risk Management</a></li>
            <li><a href="services.html#compliance">NDIS Compliance</a></li>
            <li><a href="services.html#finance">Finance</a></li>
            <li><a href="services.html#advisory">Business Advisory</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Business Set-Up</h4>
          <ul>
            <li><a href="business-registrations.html#structure">Business Structure Advice</a></li>
            <li><a href="business-registrations.html#asic">ASIC &amp; ABN Registration</a></li>
            <li><a href="business-registrations.html#ato">ATO &amp; Tax Registrations</a></li>
            <li><a href="business-registrations.html#payroll">Payroll &amp; Super Set-Up</a></li>
            <li><a href="business-registrations.html#xero">Xero Set-Up</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Get In Touch</h4>
          <ul class="footer-contact">
            <li>&#9993; ndiscompliance@lgpartners.com.au</li>
            <li>&#9742; 0498475578</li>
          </ul>
        </div>
      </div>

      <div class="wrap footer-bottom">
        <span>&copy; ${year} NDIS Compliance Partners. All rights reserved.</span>
        <div class="footer-legal">
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms-of-use.html">Terms of Use</a>
          <a href="complaints-process.html">Complaints Process</a>
        </div>
      </div>
    `;
  }

  function mountNav(active) {
    const el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML = navHTML(active);

    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          links.classList.remove("open");
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }
  }

  function mountFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    el.innerHTML = footerHTML();
  }

  function showPreloader() {
    if (document.getElementById("preloader")) return;

    const preloader = document.createElement("div");
    preloader.id = "preloader";
    preloader.innerHTML = `
      <img src="assets/images/splash.webp" alt="NDIS Compliance Partners" class="preloader-logo" />
      <div class="preloader-spinner"></div>
    `;

    document.body.insertBefore(preloader, document.body.firstChild);

    const fadeOut = () => {
      preloader.classList.add("fade-out");
      preloader.addEventListener("transitionend", () => {
        preloader.remove();
      });
      // Fallback to guarantee removal
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.remove();
        }
      }, 600);
    };

    if (document.readyState === "complete") {
      setTimeout(fadeOut, 400);
    } else {
      window.addEventListener("load", () => {
        setTimeout(fadeOut, 300);
      });
    }
  }

  function init(activePage) {
    showPreloader();
    mountNav(activePage || "");
    mountFooter();
  }

  return { init };
})();
