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
  const FB_PAGE_URL = "https://www.facebook.com/ndiscompliancepartners/";

  // Number of days to snooze the Facebook follow prompt when user clicks Cancel / Close
  const FB_POPUP_SNOOZE_DAYS = 5;

  const NAV_LINKS = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "services", label: "Compliance Services", href: "services.html" },
    {
      key: "registrations",
      label: "Business Registrations",
      href: "business-registrations.html",
    },
    { key: "about", label: "About Us", href: "about.html" },
    { key: "contact", label: "Contact", href: "contact.html" },
  ];

  function navHTML(active) {
    const links = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${l.key === active ? "active" : ""}">${l.label}</a>`,
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
            <li>&#9993; <a href="mailto:ndiscompliance@lgpartners.com.au">ndiscompliance@lgpartners.com.au</a></li>
            <li>&#9742; <a href="tel:0498475578">0498475578</a></li>
            <li>
              <a href="${FB_PAGE_URL}" target="_blank" rel="noopener noreferrer" class="footer-fb-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="flex-shrink:0;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span>Follow on Facebook</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="wrap footer-disclaimer">
        <p><em>NDIS Compliance Partners is an independent consulting business and is not affiliated with, endorsed by, or acting on behalf of the National Disability Insurance Agency (NDIA) or the NDIS Quality and Safeguards Commission.</em></p>
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
        }),
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

  function initFBModal() {
    try {
      const isFollowed = localStorage.getItem("ndiscp_fb_followed");
      if (isFollowed === "true") return;

      const dismissedUntil = localStorage.getItem("ndiscp_fb_dismissed_until");
      if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
        return;
      }
    } catch (e) {
      // Ignore storage errors in restricted context
    }

    setTimeout(showFBModal, 1000);
  }

  function showFBModal() {
    if (document.getElementById("fb-follow-modal")) return;

    const modal = document.createElement("div");
    modal.id = "fb-follow-modal";
    modal.className = "fb-modal-overlay";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "fb-modal-title");

    modal.innerHTML = `
      <div class="fb-modal-card">
        <button class="fb-modal-close" id="fbModalClose" aria-label="Close modal">&times;</button>
        <div class="fb-modal-header">
          <div class="fb-modal-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          <span class="fb-modal-badge">Official Facebook Page</span>
        </div>
        <h3 id="fb-modal-title" class="fb-modal-title">Stay Updated on Facebook!</h3>
        <p class="fb-modal-desc">
          Follow <strong>NDIS Compliance Partners</strong> on Facebook for mandatory NDIS regulatory updates, audit readiness tips, and governance insights.
        </p>
        <div class="fb-modal-actions">
          <a href="${FB_PAGE_URL}" target="_blank" rel="noopener noreferrer" class="btn fb-modal-btn-follow" id="fbModalFollow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Follow Us on Facebook
          </a>
          <button class="btn fb-modal-btn-cancel" id="fbModalCancel">Maybe Later</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.classList.add("show");
    });

    const snoozeModal = () => {
      try {
        const snoozeTime =
          Date.now() + FB_POPUP_SNOOZE_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem(
          "ndiscp_fb_dismissed_until",
          snoozeTime.toString(),
        );
      } catch (e) {}
      closeModal();
    };

    const followModal = () => {
      try {
        localStorage.setItem("ndiscp_fb_followed", "true");
      } catch (e) {}
      closeModal();
    };

    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
      }, 300);
    };

    const followBtn = document.getElementById("fbModalFollow");
    const cancelBtn = document.getElementById("fbModalCancel");
    const closeBtn = document.getElementById("fbModalClose");

    if (followBtn) followBtn.addEventListener("click", followModal);
    if (cancelBtn) cancelBtn.addEventListener("click", snoozeModal);
    if (closeBtn) closeBtn.addEventListener("click", snoozeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        snoozeModal();
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        snoozeModal();
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }

  function init(activePage) {
    showPreloader();
    mountNav(activePage || "");
    mountFooter();
    initFBModal();
  }

  return { init };
})();
