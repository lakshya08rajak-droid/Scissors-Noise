(function () {
  "use strict";
  const config = window.SALON_CONFIG || {};
  const page = document.body.dataset.page;
  const routes = [
    ["Home", "index.html", "home"], ["Services", "services.html", "services"],
    ["About Us", "about.html", "about"], ["Gallery", "gallery.html", "gallery"],
    ["Reviews", "reviews.html", "reviews"], ["Contact", "contact.html", "contact"]
  ];
  const phone = config.contact?.phoneDisplay || "+91 99875 67224";
  const phoneTel = config.contact?.phoneTel || "+919987567224";
  const wa = `https://wa.me/${config.contact?.whatsappNumber || "919987567224"}?text=${encodeURIComponent(config.contact?.defaultWhatsappMessage || "Hi Scissors Noise, I’d like to ask about an appointment.")}`;
  const address = config.contact?.address?.full || "Sanpada, Navi Mumbai";
  const titleMap = {services:"Our Services",about:"About Scissors Noise",gallery:"Salon Gallery",reviews:"Customer Reviews",appointment:"Book an Appointment",contact:"Visit & Contact"};

  function shellHeader() {
    const links = routes.map(([label, href, key]) => `<a href="${href}" class="nav-link${page === key ? " is-current" : ""}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`).join("");
    const mobileLinks = routes.map(([label, href, key]) => `<li><a href="${href}" class="mobile-nav-link"${page === key ? ' aria-current="page"' : ""}><span>${label}</span><span aria-hidden="true">→</span></a></li>`).join("");
    return `<header id="site-header" class="site-header"><div class="header-inner">
      <a href="index.html" class="brand-logo" aria-label="Scissors Noise home"><span class="brand-monogram" aria-hidden="true">SN</span><span class="brand-text"><span class="brand-wordmark">Scissors Noise</span><span class="brand-subtext">The Family Salon</span></span></a>
      <nav class="desktop-nav" aria-label="Primary Navigation">${links}</nav>
      <div class="header-actions"><a href="tel:${phoneTel}" class="btn btn-secondary btn-sm">${phone}</a><a href="appointment.html" class="btn btn-primary btn-sm">Book Appointment</a></div>
      <button type="button" id="mobile-menu-toggle" class="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu-drawer" aria-label="Open navigation menu"><span aria-hidden="true">☰</span></button>
    </div><nav id="mobile-menu-drawer" class="mobile-menu-drawer" aria-label="Mobile Navigation" aria-hidden="true"><ul class="mobile-nav-list">${mobileLinks}</ul><div class="mobile-drawer-actions"><a href="appointment.html" class="btn btn-primary">Book Appointment</a><a href="${wa}" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" data-whatsapp-direct>WhatsApp ${phone}</a></div></nav></header>`;
  }
  function shellFooter() {
    return `<footer class="site-footer"><div class="footer-container"><div class="footer-grid"><div><a href="index.html" class="brand-logo"><span class="brand-monogram">SN</span><span class="brand-text"><span class="brand-wordmark">Scissors Noise</span><span class="brand-subtext">The Family Salon</span></span></a><p class="footer-copy">A welcoming unisex family salon in Sanpada, Navi Mumbai.</p></div><div><h2 class="footer-heading">Explore</h2><ul class="footer-links">${routes.map(([n,h])=>`<li><a href="${h}">${n}</a></li>`).join("")}<li><a href="appointment.html">Book Appointment</a></li></ul></div><div><h2 class="footer-heading">Visit Scissors Noise</h2><ul class="footer-links"><li>${address}</li><li><a href="tel:${phoneTel}">${phone}</a></li><li><span>Open · Closes at 9:00 PM</span></li></ul></div></div><div class="footer-bottom"><span>© Scissors Noise – The Family Salon</span><span>Sanpada, Navi Mumbai</span></div></div></footer><a href="${wa}" class="floating-whatsapp" data-whatsapp-direct target="_blank" rel="noopener noreferrer" aria-label="Chat with Scissors Noise on WhatsApp">◉<span class="floating-whatsapp-label">WhatsApp Us</span></a>`;
  }
  function pageHeading(kicker, heading, intro) {
    return `<div class="section-header"><span class="section-kicker">${kicker}</span><h1 class="section-title">${heading}</h1><p class="section-subtitle">${intro}</p></div>`;
  }
  function serviceContent() {
    const cards = (config.services || []).map(service => `<article class="service-category-card"><div class="service-card-top"><div class="service-card-header"><h2 class="service-category-title">${service.category}</h2><span class="service-count-badge">${service.items.length} services</span></div><p class="service-category-desc">${service.tagline || service.description}</p><ul class="service-pills-list">${service.items.map(item => `<li class="service-pill-item${item.requiresConfirmation ? " is-flagged-service" : ""}">${item.name}${item.requiresConfirmation ? " · confirm details" : ""}</li>`).join("")}</ul></div><div class="service-card-footer"><a class="btn btn-secondary btn-sm" href="appointment.html?service=${encodeURIComponent(service.category)}">Ask about this category</a></div></article>`).join("");
    return `<section class="section-block section-white">${pageHeading("Salon Services", "Care for every occasion", "Explore the services Scissors Noise offers. Ask the salon about details and availability when you request an appointment.")}<div class="section-container"><div class="services-grid">${cards}</div><p class="form-disclaimer" style="margin-top:2rem">“Botox Treatment” and “Nano plastian” are listed as supplied and need confirmation from the salon before publication.</p></div></section>`;
  }
  function galleryContent() {
    const cats = ["All", ...new Set((config.gallery || []).map(item => item.category))];
    const filters = cats.map((cat, i) => `<button type="button" class="gallery-filter${i === 0 ? " is-active" : ""}" data-gallery-filter="${cat}" aria-pressed="${i === 0}">${cat}</button>`).join("");
    return `<section class="section-block section-white"><div class="section-container">${pageHeading("Scissors Noise Portfolio", "A closer look at our salon", "Browse real salon interiors, hairstyles, colour work, and nail art. Select any image to view it larger.")}<div class="gallery-filters" role="group" aria-label="Filter gallery by category">${filters}</div><div class="gallery-grid" id="gallery-grid" aria-live="polite"></div></div></section>`;
  }
  function reviewContent() {
    const reviews = (config.reviews || []).map(review => `<blockquote class="review-card"><div><p class="review-quote">“${review.quote}”</p></div><footer class="review-footer"><span>${review.sourceLabel}</span></footer></blockquote>`).join("");
    return `<section class="section-block section-ivory"><div class="section-container">${pageHeading("Google Review Summary", "Kind words from customers", "The excerpts below were supplied for this website. Reviewer names were not provided.")}<div class="reviews-summary-bar"><div><span class="section-kicker">Customer rating</span><div class="reviews-score-big">4.9 <span>/ 5</span></div><p>550 Google reviews</p></div><a class="btn btn-secondary" href="${config.contact?.maps?.googleReviewsUrlPlaceholder || "#"}" data-config="googleReviewsUrl" target="_blank" rel="noopener noreferrer">View Google listing</a></div><div class="reviews-grid">${reviews}</div><p style="margin-top:1.5rem"><a class="btn btn-primary" href="appointment.html">Book an Appointment</a></p></div></section>`;
  }
  function aboutContent() {
    return `<section class="section-block section-white"><div class="section-container">${pageHeading("About the Salon", "A welcoming place in Sanpada", "Scissors Noise – The Family Salon is a unisex salon near Sanpada Railway Station, serving individuals and families with hair, beauty, skin, nail, grooming, and bridal services.")}<div class="about-grid"><div class="about-image-wrapper"><img src="images/salon/Image 21.jpeg" alt="Styling chairs and mirrors inside the salon" loading="lazy"></div><div><h2 class="section-title">Made for everyday care and special occasions</h2><p>Find Scissors Noise at Shop No. 1 &amp; 2, Vinay Vedanta, Plot No. A23, near Sanpada Railway Station, Sector 4, Sanpada, Navi Mumbai.</p><p style="margin-top:1rem">The owner, Mrs. Vaishali, is described in a customer review as soft-spoken and courteous.</p><a href="services.html" class="btn btn-secondary" style="margin-top:1.2rem">Explore Services</a></div></div></div></section>`;
  }
  function contactContent() {
    return `<section class="section-block section-cream"><div class="section-container">${pageHeading("Visit & Contact", "Find us in Sanpada", "Call, message, or get directions to Scissors Noise – The Family Salon.")}<div class="contact-grid"><div class="contact-details-card"><h2>Scissors Noise – The Family Salon</h2><p style="margin:1rem 0">${address}</p><p><a href="tel:${phoneTel}">${phone}</a></p><p style="margin:.5rem 0">Open · Closes at 9:00 PM</p><div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.25rem"><a class="btn btn-primary" href="${config.contact?.maps?.directionsUrl || "#"}" target="_blank" rel="noopener noreferrer">Get Directions</a><a class="btn btn-whatsapp" href="${wa}" data-whatsapp-direct target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></div></div><div class="map-card"><iframe title="Map showing the salon's Sanpada location" src="${config.contact?.maps?.embedUrl || ""}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div></div></section>`;
  }
  function appointmentContent() {
    const groups = (config.services || []).map(s => `<optgroup label="${s.category}"><option value="${s.category}">${s.category} (General)</option>${s.items.map(it => `<option value="${s.category} — ${it.name}">${it.name}${it.requiresConfirmation ? " (confirm details)" : ""}</option>`).join("")}</optgroup>`).join("");
    return `<section class="section-block section-white"><div class="section-container">${pageHeading("Request an Appointment", "Plan your visit", "Send your preferred service, date, and time to the salon through WhatsApp. Your appointment is not confirmed until the salon replies.")}<div class="booking-layout"><div class="booking-info-card"><h2>Appointment request</h2><p>Your details will be placed in a WhatsApp message to ${phone}. You will need to send the message and wait for the salon to confirm availability.</p><p style="margin-top:1rem">Hours: Open; closes at 9:00 PM. Typical visit: 1–4 hours.</p><a class="btn btn-whatsapp" href="${wa}" data-whatsapp-direct target="_blank" rel="noopener noreferrer" style="margin-top:1rem">Chat directly on WhatsApp</a></div><div class="booking-form-card"><form id="appointment-form" novalidate><div class="form-grid form-grid-2col"><div class="form-field"><label class="form-label" for="booking-name">Your name *</label><input class="form-input" id="booking-name" name="name" autocomplete="name" required aria-describedby="error-booking-name"><span id="error-booking-name" class="field-error" role="alert"></span></div><div class="form-field"><label class="form-label" for="booking-phone">Phone / WhatsApp *</label><input class="form-input" id="booking-phone" name="phone" type="tel" autocomplete="tel" required aria-describedby="error-booking-phone"><span id="error-booking-phone" class="field-error" role="alert"></span></div></div><div class="form-field" style="margin-top:1.25rem"><label class="form-label" for="booking-service">Service *</label><select class="form-select" id="booking-service" name="service" required aria-describedby="error-booking-service"><option value="">Choose a service</option>${groups}<option value="Multiple / Family Services">Multiple / Family Services</option><option value="Botox Treatment (Inquiry)">Botox Treatment (inquiry — confirm details with salon)</option></select><span id="error-booking-service" class="field-error" role="alert"></span></div><div class="form-grid form-grid-2col" style="margin-top:1.25rem"><div class="form-field"><label class="form-label" for="booking-date">Preferred date *</label><input class="form-input" id="booking-date" name="date" type="date" required aria-describedby="error-booking-date"><span id="error-booking-date" class="field-error" role="alert"></span></div><div class="form-field"><label class="form-label" for="booking-time">Preferred time (closes 9 PM) *</label><select class="form-select" id="booking-time" name="time" required aria-describedby="error-booking-time"><option value="">Choose a preferred time</option><option>Before 12:00 PM</option><option>12:00 PM–2:00 PM</option><option>2:00 PM–4:00 PM</option><option>4:00 PM–6:00 PM</option><option>6:00 PM–8:00 PM</option><option>8:00 PM–9:00 PM</option></select><span id="error-booking-time" class="field-error" role="alert"></span></div></div><div class="form-field" style="margin-top:1.25rem"><label class="form-label" for="booking-message">Optional message</label><textarea class="form-textarea" id="booking-message" name="message"></textarea></div><p class="form-disclaimer">This creates a WhatsApp request. The salon will confirm your appointment based on availability.</p><button class="btn btn-whatsapp btn-lg" type="submit" style="width:100%;margin-top:1rem">Prepare WhatsApp Request</button><div id="booking-form-feedback" class="form-feedback" role="status" aria-live="polite"></div></form></div></div></div></section>`;
  }
  const pages = { services: serviceContent, gallery: galleryContent, reviews: reviewContent, about: aboutContent, contact: contactContent, appointment: appointmentContent };
  document.addEventListener("DOMContentLoaded", () => {
    if (!page || !pages[page]) return;
    document.title = `${titleMap[page]} | Scissors Noise – The Family Salon`;
    const header = document.getElementById("app-header");
    const footer = document.getElementById("app-footer");
    const main = document.getElementById("main-content");
    if (header) header.innerHTML = shellHeader();
    if (footer) footer.innerHTML = shellFooter();
    if (main) main.innerHTML = `<div class="editorial-canvas">${pages[page]()}</div>`;
    if (page === "gallery") {
      const lightbox = document.getElementById("gallery-lightbox-template");
      if (lightbox) lightbox.hidden = false;
    }
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${titleMap[page]} at Scissors Noise – The Family Salon in Sanpada, Navi Mumbai.`;
  });
})();
