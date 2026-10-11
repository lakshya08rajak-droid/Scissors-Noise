/**
 * ============================================================================
 * SCISSORS NOISE – THE FAMILY SALON | SUBPAGE SHELL & CONTENT RENDERER
 * ============================================================================
 * Provides unified header, footer, and page content for:
 * - services.html, about.html, gallery.html, reviews.html,
 *   appointment.html, and contact.html
 * Matches the pre-rendered static HTML on each subpage to prevent layout shift
 * while keeping window.SALON_CONFIG edits synchronized across all pages.
 * ============================================================================
 */
(function () {
  "use strict";

  const config = window.SALON_CONFIG || {};
  const page = document.body ? document.body.dataset.page : "";
  const routes = [
    ["Home", "index.html", "home"],
    ["Services", "services.html", "services"],
    ["About", "about.html", "about"],
    ["Gallery", "gallery.html", "gallery"],
    ["Reviews", "reviews.html", "reviews"],
    ["Contact", "contact.html", "contact"],
  ];

  const phone = (config.contact && config.contact.phoneDisplay) || "+91 99875 67224";
  const phoneTel = (config.contact && config.contact.phoneTel) || "+919987567224";
  const waNumber = (config.contact && config.contact.whatsappNumber) || "919987567224";
  const defaultWaMsg =
    (config.contact && config.contact.defaultWhatsappMessage) ||
    "Hi Scissors Noise, I’d like to ask about an appointment.";
  const wa = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(defaultWaMsg);
  const address =
    (config.contact && config.contact.address && config.contact.address.full) ||
    "Shop No. 1 & 2, Vinay Vedanta, Plot No. A23, near Sanpada Railway Station, Sector 4, Sanpada, Navi Mumbai, Maharashtra 400705";
  const directionsUrl =
    (config.contact && config.contact.maps && config.contact.maps.directionsUrl) ||
    "https://www.google.com/maps/search/?api=1&query=Scissors+Noise+The+Family+Salon+Shop+No.+1+%26+2+Vinay+Vedanta+Plot+No.+A23+near+Sanpada+Railway+Station+Sector+4+Sanpada+Navi+Mumbai+Maharashtra+400705";
  const embedUrl =
    (config.contact && config.contact.maps && config.contact.maps.embedUrl) ||
    "https://maps.google.com/maps?q=Vinay%20Vedanta%2C%20Plot%20No.%20A23%2C%20Sector%204%2C%20Sanpada%2C%20Navi%20Mumbai%2C%20Maharashtra%20400705&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const googleReviewsUrl =
    (config.contact && config.contact.maps && config.contact.maps.googleReviewsUrlPlaceholder) ||
    "https://www.google.com/maps/search/?api=1&query=Scissors+Noise+The+Family+Salon+Sanpada+Navi+Mumbai";

  const titleMap = {
    services: "Our Services",
    about: "About Scissors Noise",
    gallery: "Salon Gallery",
    reviews: "Customer Reviews",
    appointment: "Book an Appointment",
    contact: "Visit & Contact",
  };

  function shellHeader() {
    const links = routes
      .map(
        ([label, href, key]) =>
          `<a href="${href}" class="nav-link${page === key ? " is-current" : ""}"${
            page === key ? ' aria-current="page"' : ""
          }>${label}</a>`
      )
      .join("");
    const mobileLinks = routes
      .map(
        ([label, href, key]) =>
          `<li><a href="${href}" class="mobile-nav-link${page === key ? " is-current" : ""}"${
            page === key ? ' aria-current="page"' : ""
          }><span>${label}</span><span aria-hidden="true">→</span></a></li>`
      )
      .join("");

    return `<header id="site-header" class="site-header">
      <div class="header-inner">
        <a href="index.html" class="brand-logo" aria-label="Scissors Noise – The Family Salon Home">
          <span class="brand-monogram" aria-hidden="true">SN</span>
          <span class="brand-text">
            <span class="brand-wordmark" data-config="shortName">Scissors Noise</span>
            <span class="brand-subtext" data-config="tagline">The Family Salon</span>
          </span>
        </a>
        <nav class="desktop-nav" aria-label="Primary Navigation">${links}</nav>
        <div class="header-actions">
          <a href="tel:${phoneTel}" class="btn btn-secondary btn-sm header-call-btn" data-config="phoneTel" aria-label="Call Scissors Noise at ${phone}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span data-config="phoneDisplay">${phone}</span>
          </a>
          <a href="appointment.html" class="btn btn-primary btn-sm">Book Appointment</a>
        </div>
        <button type="button" id="mobile-menu-toggle" class="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu-drawer" aria-label="Open navigation menu">
          <svg id="menu-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
          <svg id="menu-icon-close" style="display: none;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <nav id="mobile-menu-drawer" class="mobile-menu-drawer" aria-label="Mobile Navigation" aria-hidden="true">
        <ul class="mobile-nav-list">${mobileLinks}</ul>
        <div class="mobile-drawer-actions">
          <a href="appointment.html" class="btn btn-primary">Book Appointment</a>
          <a href="${wa}" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" data-whatsapp-direct>WhatsApp ${phone}</a>
          <a href="tel:${phoneTel}" class="btn btn-secondary" data-config="phoneTel">Call ${phone}</a>
        </div>
      </nav>
    </header>`;
  }

  function shellFooter() {
    return `<footer class="site-footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="brand-logo" style="margin-bottom: 1rem;">
              <span class="brand-monogram" style="background: var(--rose-gold-dark); color: #FFF;" aria-hidden="true">SN</span>
              <span class="brand-text">
                <span class="brand-wordmark" style="color: var(--bg-ivory);" data-config="shortName">Scissors Noise</span>
                <span class="brand-subtext" style="color: var(--rose-gold-light);" data-config="tagline">The Family Salon</span>
              </span>
            </a>
            <p class="footer-copy">Welcoming unisex family salon in Sector 4, Sanpada, Navi Mumbai offering professional hair, beauty, skin, brow, lash, nail, waxing, grooming, and bridal services.</p>
          </div>
          <div>
            <h2 class="footer-heading">Explore</h2>
            <ul class="footer-links">
              ${routes.map(([n, h]) => `<li><a href="${h}">${n}</a></li>`).join("")}
              <li><a href="appointment.html">Book Appointment</a></li>
            </ul>
          </div>
          <div>
            <h2 class="footer-heading">Service Categories</h2>
            <ul class="footer-links">
              <li><a href="appointment.html?service=Hair%20Services">Hair Styling &amp; Care</a></li>
              <li><a href="appointment.html?service=Skin%20and%20beauty">Skin &amp; Beauty</a></li>
              <li><a href="appointment.html?service=Brows%20and%20lashes">Brows &amp; Lashes</a></li>
              <li><a href="appointment.html?service=Nails">Nails &amp; Nail Art</a></li>
              <li><a href="appointment.html?service=Waxing%20and%20grooming">Waxing &amp; Grooming</a></li>
              <li><a href="appointment.html?service=Bridal%20and%20occasions">Bridal &amp; Occasions</a></li>
            </ul>
          </div>
          <div>
            <h2 class="footer-heading">Visit Scissors Noise</h2>
            <ul class="footer-links">
              <li data-config="fullAddress">${address}</li>
              <li><a href="tel:${phoneTel}" data-config="phoneTel" style="color: var(--rose-gold-light); font-weight: 600;">${phone}</a></li>
              <li><span data-config="hoursStatus">Open · Closes at 9:00 PM</span> (Typical visit: 1–4 hours)</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Scissors Noise – The Family Salon, Sanpada, Navi Mumbai</span>
          <span>Rated 4.9/5 from 550 Google reviews · Owner: Mrs. Vaishali</span>
        </div>
      </div>
    </footer>
    <a href="${wa}" class="floating-whatsapp" data-whatsapp-direct target="_blank" rel="noopener noreferrer" aria-label="Chat with Scissors Noise on WhatsApp (${phone})">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      <span class="floating-whatsapp-label">WhatsApp Us</span>
    </a>`;
  }

  function pageHeading(kicker, heading, intro) {
    return `<div class="section-header">
      <span class="section-kicker">${kicker}</span>
      <h1 class="section-title">${heading}</h1>
      <p class="section-subtitle">${intro}</p>
    </div>`;
  }

  function serviceContent() {
    const services = config.services || [];
    const filterButtons = [
      `<button type="button" class="category-tab is-active" data-service-filter="all" aria-pressed="true">All Categories (${services.length})</button>`,
      ...services.map(
        (s) =>
          `<button type="button" class="category-tab" data-service-filter="${s.id}" aria-pressed="false">${s.category}</button>`
      ),
    ].join("");

    const cards = services
      .map((service) => {
        const catBookValue =
          service.id === "hair"
            ? "Hair Services"
            : service.id === "botox-treatment"
            ? "Botox Treatment (Inquiry)"
            : service.category;
        const itemsHtml = service.items
          .map((item) => {
            const bookVal =
              item.name === "Botox Treatment"
                ? "Botox Treatment (Inquiry)"
                : `${service.category} — ${item.name}`;
            return `<li class="service-pill-item${item.requiresConfirmation ? " is-flagged-service" : ""}">
              <span>${item.name}</span>
              ${
                item.requiresConfirmation
                  ? '<span class="flag-tag" title="Flagged for salon confirmation before publishing">Confirm Before Publishing</span>'
                  : ""
              }
              <a href="appointment.html?service=${encodeURIComponent(bookVal)}" class="service-pill-book-btn" data-book-service="${bookVal}" aria-label="Book ${item.name}">${
                item.requiresConfirmation ? "Inquire" : "Book"
              }</a>
            </li>`;
          })
          .join("");

        return `<article class="service-category-card${
          service.requiresConfirmation ? " is-flagged-category" : ""
        }" data-service-category-card="${service.id}">
          <div class="service-card-top">
            <div class="service-card-header">
              <h2 class="service-category-title">${service.category}</h2>
              <span class="service-count-badge">${service.items.length} ${
          service.items.length === 1 ? "Service" : "Services"
        }</span>
            </div>
            <p class="service-category-desc">${service.tagline || service.description}</p>
            <ul class="service-pills-list" aria-label="${service.category} services">${itemsHtml}</ul>
            ${
              service.requiresConfirmation || service.items.some((i) => i.requiresConfirmation)
                ? `<div class="flag-note-box"><strong>Flagged for Salon Confirmation:</strong> Listed using exact supplied wording. Confirm preferred spelling and service details with the salon before publishing. No medical claims are made.</div>`
                : ""
            }
          </div>
          <div class="service-card-footer">
            <a class="btn btn-primary btn-sm" href="appointment.html?service=${encodeURIComponent(
              catBookValue
            )}" data-book-service="${catBookValue}">Book ${service.category}</a>
          </div>
        </article>`;
      })
      .join("");

    return `<section class="section-block section-white">
      <div class="section-container">
        ${pageHeading(
          "Salon Services",
          "Care for every occasion",
          "Explore the services Scissors Noise offers in Sector 4, Sanpada. Select any category or individual service to prefill your WhatsApp appointment request."
        )}
        <div class="services-toolbar" role="region" aria-label="Filter services by category">
          <div class="category-tabs">${filterButtons}</div>
        </div>
        <div class="confirmation-banner" role="note" aria-label="Items flagged for salon confirmation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>
            <strong>Editorial Note — Flagged for Salon Confirmation Before Publishing:</strong>
            “Nano plastian” (under Hair) and “Botox Treatment” are listed as supplied and flagged for salon confirmation before publication. No medical claims are made.
          </div>
        </div>
        <div class="services-grid">${cards}</div>
      </div>
    </section>`;
  }

  function galleryContent() {
    const cats = ["All", ...new Set((config.gallery || []).map((item) => item.category))];
    const filters = cats
      .map(
        (cat, i) =>
          `<button type="button" class="gallery-filter${
            i === 0 ? " is-active" : ""
          }" data-gallery-filter="${cat}" aria-pressed="${i === 0}">${cat}</button>`
      )
      .join("");
    return `<section class="section-block section-white">
      <div class="section-container">
        ${pageHeading(
          "Scissors Noise Portfolio",
          "A closer look at our salon",
          "Browse all 23 real salon photographs including interiors, hairstyles, colour work, and nail art. Select any image to view it larger."
        )}
        <div class="gallery-filters" role="group" aria-label="Filter gallery by category">${filters}</div>
        <div class="gallery-grid" id="gallery-grid" aria-live="polite"></div>
      </div>
    </section>`;
  }

  function reviewContent() {
    const reviews = (config.reviews || [])
      .map(
        (review) =>
          `<blockquote class="review-card">
            <div><p class="review-quote">“${review.quote}”</p></div>
            <footer class="review-footer"><span>${review.sourceLabel}</span></footer>
          </blockquote>`
      )
      .join("");
    return `<section class="section-block section-ivory">
      <div class="section-container">
        ${pageHeading(
          "Google Review Summary",
          "Kind words from customers",
          "Rated 4.9 / 5 across 550 Google reviews. The three review excerpts below are displayed exactly as supplied."
        )}
        <div class="reviews-summary-bar">
          <div class="reviews-score-big">
            <span class="score-number">4.9</span>
            <div>
              <div class="stars-row" aria-label="4.9 out of 5 rating">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <p style="font-size: 0.92rem; color: var(--plum-muted); margin-top: 0.2rem;">
                <strong>4.9 / 5</strong> rating based on <strong>550 Google reviews</strong>
              </p>
            </div>
          </div>
          <a class="btn btn-secondary btn-sm" href="${googleReviewsUrl}" data-config="googleReviewsUrl" target="_blank" rel="noopener noreferrer">View Google listing</a>
        </div>
        <div class="reviews-grid">${reviews}</div>
        <p style="margin-top: 1.75rem;"><a class="btn btn-primary" href="appointment.html">Book an Appointment</a></p>
      </div>
    </section>`;
  }

  function aboutContent() {
    return `<section class="section-block section-white">
      <div class="section-container">
        ${pageHeading(
          "About the Salon",
          "A welcoming place in Sanpada",
          "Scissors Noise – The Family Salon is a unisex salon near Sanpada Railway Station, serving individuals and families with hair, beauty, skin, nail, grooming, and bridal services."
        )}
        <div class="about-grid">
          <div class="about-image-wrapper">
            <img id="about-photo-img" src="images/salon/Image 21.jpeg" alt="Styling chairs and mirrors inside Scissors Noise salon" width="223" height="373" loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 class="section-title">Made for everyday care and special occasions</h2>
            <p class="section-subtitle">Find Scissors Noise at <strong>Shop No. 1 &amp; 2, Vinay Vedanta, Plot No. A23, near Sanpada Railway Station, Sector 4, Sanpada, Navi Mumbai, Maharashtra 400705</strong>.</p>
            <div class="about-facts-list">
              <div class="about-fact-card">
                <div class="about-fact-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                  <h3>Owner: Mrs. Vaishali</h3>
                  <p>Described in a supplied customer review as very soft-spoken and courteous towards the customers.</p>
                </div>
              </div>
              <div class="about-fact-card">
                <div class="about-fact-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h3>Hours &amp; Typical Visit Duration</h3>
                  <p>Open; closes at 9:00 PM. Typical visit duration is 1–4 hours depending on the services selected.</p>
                </div>
              </div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; margin-top: 1.25rem;">
              <a href="appointment.html" class="btn btn-primary">Book an Appointment</a>
              <a href="services.html" class="btn btn-secondary">Explore Services</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function contactContent() {
    return `<section class="section-block section-cream">
      <div class="section-container">
        ${pageHeading(
          "Visit & Contact",
          "Find us in Sanpada",
          "Call, message on WhatsApp, or get directions to Scissors Noise – The Family Salon near Sanpada Railway Station."
        )}
        <div class="contact-grid">
          <div class="contact-details-card">
            <div class="contact-item-list">
              <div class="contact-row">
                <div class="contact-row-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h2>Scissors Noise – The Family Salon</h2>
                  <p data-config="fullAddress">${address}</p>
                </div>
              </div>
              <div class="contact-row">
                <div class="contact-row-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h3>Phone &amp; WhatsApp</h3>
                  <p><a href="tel:${phoneTel}" data-config="phoneTel"><strong data-config="phoneDisplay">${phone}</strong></a></p>
                  <p><a href="${wa}" data-whatsapp-direct target="_blank" rel="noopener noreferrer">Message on WhatsApp (${phone})</a></p>
                </div>
              </div>
              <div class="contact-row">
                <div class="contact-row-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h3>Hours &amp; Typical Visit</h3>
                  <p><strong data-config="hoursStatus">Open · Closes at 9:00 PM</strong> · Typical visit duration: 1–4 hours</p>
                </div>
              </div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.5rem;">
              <a class="btn btn-primary" href="${directionsUrl}" data-config="directionsUrl" target="_blank" rel="noopener noreferrer">Get Directions</a>
              <a class="btn btn-whatsapp" href="${wa}" data-whatsapp-direct target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <a class="btn btn-secondary" href="tel:${phoneTel}" data-config="phoneTel">Call Salon</a>
            </div>
          </div>
          <div class="map-card">
            <div class="map-iframe-wrapper">
              <iframe title="Map showing Scissors Noise – The Family Salon in Sector 4, Sanpada, Navi Mumbai" src="${embedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            </div>
            <div class="map-card-footer">
              <span>Near Sanpada Railway Station, Sector 4, Sanpada, Navi Mumbai 400705</span>
              <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="font-weight: 700; color: var(--rose-gold-dark); text-decoration: underline;" data-config="directionsUrl">Open in Google Maps →</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function appointmentContent() {
    const services = config.services || [];
    const groups = services
      .filter((s) => s.id !== "botox-treatment")
      .map(
        (s) =>
          `<optgroup label="${s.category}">${s.items
            .map(
              (it) =>
                `<option value="${s.category} — ${it.name}">${s.category} — ${it.name}${
                  it.requiresConfirmation ? " (Confirm details with salon)" : ""
                }</option>`
            )
            .join("")}</optgroup>`
      )
      .join("");

    return `<section class="section-block section-white">
      <div class="section-container">
        ${pageHeading(
          "Request an Appointment",
          "Plan your visit",
          "Send your preferred service, date, and time to Scissors Noise through WhatsApp. Your appointment is not confirmed until the salon replies."
        )}
        <div class="booking-layout">
          <div class="booking-info-card">
            <h3>Appointment Request</h3>
            <p>Your details will be prepared in a prefilled WhatsApp message to <strong>${phone}</strong>. Send the message on WhatsApp and wait for the salon to confirm availability.</p>
            <div class="booking-notice-box" role="note">
              <strong>Hours &amp; Visit Duration:</strong><br />
              Open; closes at 9:00 PM. Typical visit duration: 1–4 hours.
            </div>
            <div class="booking-direct-links">
              <a class="btn btn-whatsapp" href="${wa}" data-whatsapp-direct target="_blank" rel="noopener noreferrer">Chat Directly on WhatsApp (${phone})</a>
              <a class="btn btn-secondary" href="tel:${phoneTel}" data-config="phoneTel" style="color: var(--bg-ivory); border-color: rgba(250, 246, 240, 0.35);">Tap to Call: ${phone}</a>
            </div>
          </div>
          <div class="booking-form-card">
            <form id="appointment-form" novalidate aria-describedby="booking-form-disclaimer">
              <div class="form-grid form-grid-2col">
                <div class="form-field">
                  <label class="form-label" for="booking-name">Your Name <span class="required-star" aria-hidden="true">*</span></label>
                  <input class="form-input" id="booking-name" name="name" type="text" placeholder="e.g., Priya Sharma" autocomplete="name" required aria-required="true" aria-describedby="error-booking-name" />
                  <span id="error-booking-name" class="field-error" role="alert"></span>
                </div>
                <div class="form-field">
                  <label class="form-label" for="booking-phone">Phone / WhatsApp Number <span class="required-star" aria-hidden="true">*</span></label>
                  <input class="form-input" id="booking-phone" name="phone" type="tel" placeholder="e.g., +91 98765 43210" autocomplete="tel" required aria-required="true" aria-describedby="error-booking-phone" />
                  <span id="error-booking-phone" class="field-error" role="alert"></span>
                </div>
              </div>
              <div class="form-field" style="margin-top: 1.25rem;">
                <label class="form-label" for="booking-service">Service or Category <span class="required-star" aria-hidden="true">*</span></label>
                <select class="form-select" id="booking-service" name="service" required aria-required="true" aria-describedby="error-booking-service">
                  <option value="">Select a service or category…</option>
                  <optgroup label="Service Categories">
                    <option value="Hair Services">Hair Services (General)</option>
                    <option value="Skin and beauty">Skin and beauty (General)</option>
                    <option value="Brows and lashes">Brows and lashes (General)</option>
                    <option value="Nails">Nails (General)</option>
                    <option value="Waxing and grooming">Waxing and grooming (General)</option>
                    <option value="Bridal and occasions">Bridal and occasions (General)</option>
                    <option value="Multiple / Family Services">Multiple / Family Services</option>
                  </optgroup>
                  ${groups}
                  <optgroup label="Flagged for Confirmation">
                    <option value="Botox Treatment (Inquiry)">Botox Treatment (Inquiry — confirm with salon)</option>
                  </optgroup>
                </select>
                <span id="error-booking-service" class="field-error" role="alert"></span>
              </div>
              <div class="form-grid form-grid-2col" style="margin-top: 1.25rem;">
                <div class="form-field">
                  <label class="form-label" for="booking-date">Preferred Date <span class="required-star" aria-hidden="true">*</span></label>
                  <input class="form-input" id="booking-date" name="date" type="date" required aria-required="true" aria-describedby="error-booking-date" />
                  <span id="error-booking-date" class="field-error" role="alert"></span>
                </div>
                <div class="form-field">
                  <label class="form-label" for="booking-time">Preferred Time (Closes 9:00 PM) <span class="required-star" aria-hidden="true">*</span></label>
                  <select class="form-select" id="booking-time" name="time" required aria-required="true" aria-describedby="error-booking-time">
                    <option value="">Choose preferred time…</option>
                    <option value="Morning (Before 12:00 PM)">Morning (Before 12:00 PM)</option>
                    <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
                    <option value="2:00 PM – 4:00 PM">2:00 PM – 4:00 PM</option>
                    <option value="4:00 PM – 6:00 PM">4:00 PM – 6:00 PM</option>
                    <option value="6:00 PM – 8:00 PM">6:00 PM – 8:00 PM</option>
                    <option value="8:00 PM – 9:00 PM (Before Closing)">8:00 PM – 9:00 PM (Before Closing)</option>
                  </select>
                  <span id="error-booking-time" class="field-error" role="alert"></span>
                </div>
              </div>
              <div class="form-field" style="margin-top: 1.25rem;">
                <label class="form-label" for="booking-message">Optional Message or Additional Notes</label>
                <textarea class="form-textarea" id="booking-message" name="message" placeholder="Share if you are booking for multiple family members, bridal prep, or have any specific preferences…"></textarea>
              </div>
              <p id="booking-form-disclaimer" class="form-disclaimer">
                <strong>Please Note:</strong> Sending this request opens WhatsApp with your details prefilled. <strong>The salon will confirm your appointment</strong> based on slot availability.
              </p>
              <div style="margin-top: 1.35rem;">
                <button class="btn btn-whatsapp btn-lg" type="submit" style="width: 100%;">
                  <span>Send Appointment Request on WhatsApp</span>
                </button>
              </div>
              <div id="booking-form-feedback" class="form-feedback" role="status" aria-live="polite"></div>
            </form>
          </div>
        </div>
      </div>
    </section>`;
  }

  const pages = {
    services: serviceContent,
    gallery: galleryContent,
    reviews: reviewContent,
    about: aboutContent,
    contact: contactContent,
    appointment: appointmentContent,
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!page || !pages[page]) return;
    document.title = `${titleMap[page]} | Scissors Noise – The Family Salon`;
    const header = document.getElementById("app-header");
    const footer = document.getElementById("app-footer");
    const main = document.getElementById("main-content");
    if (header && !header.innerHTML.trim()) header.innerHTML = shellHeader();
    if (footer && !footer.innerHTML.trim()) footer.innerHTML = shellFooter();
    if (main && !main.innerHTML.trim()) {
      main.innerHTML = `<div class="editorial-canvas">${pages[page]()}</div>`;
    }
    const description = document.querySelector('meta[name="description"]');
    if (description && !description.getAttribute("data-static-desc")) {
      description.content = `${titleMap[page]} at Scissors Noise – The Family Salon in Sanpada, Navi Mumbai.`;
    }
  });
})();
