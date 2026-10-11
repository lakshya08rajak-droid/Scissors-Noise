/**
 * ============================================================================
 * SCISSORS NOISE – THE FAMILY SALON | INTERACTIVE APPLICATION SCRIPT
 * ============================================================================
 * Handles:
 * 1. Configuration sync from window.SALON_CONFIG (hours, images, social links)
 * 2. Sticky header & accessible mobile navigation drawer (keyboard + touch)
 * 3. Service category filtering & "Book Service" pre-selection into form
 * 4. Accessible gallery lightbox with keyboard navigation (Esc, Left/Right, Tab)
 * 5. Appointment form validation & safe WhatsApp message construction (919987567224)
 * ============================================================================
 */

(function () {
  "use strict";

  const config = window.SALON_CONFIG || {};

  /* ------------------------------------------------------------------------
   * 1. SYNC EDITABLE CONFIG FIELDS TO DOM
   * ------------------------------------------------------------------------ */
  function syncConfigToDom() {
    if (!config.business) return;

    // Wordmark & Tagline
    document.querySelectorAll("[data-config='shortName']").forEach((el) => {
      el.textContent = config.business.shortName;
    });
    document.querySelectorAll("[data-config='tagline']").forEach((el) => {
      el.textContent = config.business.tagline;
    });
    document.querySelectorAll("[data-config='fullName']").forEach((el) => {
      el.textContent = config.business.name;
    });

    // Hours
    if (config.hours) {
      document.querySelectorAll("[data-config='hoursStatus']").forEach((el) => {
        el.textContent = config.hours.statusLabel;
      });
      document.querySelectorAll("[data-config='hoursSummary']").forEach((el) => {
        el.textContent = config.hours.summaryText;
      });
    }

    // Contact & WhatsApp links
    if (config.contact) {
      const waNum = config.contact.whatsappNumber || "919987567224";
      const defaultMsg =
        config.contact.defaultWhatsappMessage ||
        "Hi Scissors Noise, I’d like to ask about an appointment.";
      const defaultWaUrl =
        "https://wa.me/" + waNum + "?text=" + encodeURIComponent(defaultMsg);

      document.querySelectorAll("[data-whatsapp-direct]").forEach((el) => {
        el.setAttribute("href", defaultWaUrl);
      });

      document.querySelectorAll("[data-config='phoneDisplay']").forEach((el) => {
        el.textContent = config.contact.phoneDisplay;
      });

      document.querySelectorAll("[data-config='phoneTel']").forEach((el) => {
        el.setAttribute("href", "tel:" + config.contact.phoneTel);
      });

      if (config.contact.address) {
        document.querySelectorAll("[data-config='fullAddress']").forEach((el) => {
          el.textContent = config.contact.address.full;
        });
      }

      if (config.contact.maps) {
        document.querySelectorAll("[data-config='directionsUrl']").forEach((el) => {
          el.setAttribute("href", config.contact.maps.directionsUrl);
        });
        document.querySelectorAll("[data-config='googleReviewsUrl']").forEach((el) => {
          el.setAttribute("href", config.contact.maps.googleReviewsUrlPlaceholder);
        });
      }
    }

    // Replaceable Hero & About Images
    if (config.images) {
      const heroImg = document.getElementById("hero-photo-img");
      if (heroImg && config.images.hero) {
        heroImg.src = config.images.hero.src;
        heroImg.alt = config.images.hero.alt;
        const heroBadge = document.getElementById("hero-placeholder-badge");
        if (heroBadge) {
          heroBadge.style.display = config.images.hero.isPlaceholder ? "flex" : "none";
        }
      }

      const aboutImg = document.getElementById("about-photo-img");
      if (aboutImg && config.images.about) {
        aboutImg.src = config.images.about.src;
        aboutImg.alt = config.images.about.alt;
        const aboutBadge = document.getElementById("about-placeholder-badge");
        if (aboutBadge) {
          aboutBadge.style.display = config.images.about.isPlaceholder ? "flex" : "none";
        }
      }
    }
  }

  /* ------------------------------------------------------------------------
   * 2. HEADER & ACCESSIBLE MOBILE NAVIGATION DRAWER
   * ------------------------------------------------------------------------ */
  function initNavigation() {
    const header = document.getElementById("site-header");
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const menuDrawer = document.getElementById("mobile-menu-drawer");
    const menuIconOpen = document.getElementById("menu-icon-open");
    const menuIconClose = document.getElementById("menu-icon-close");

    function handleScroll() {
      if (!header) return;
      if (window.scrollY > 16) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    if (!menuToggle || !menuDrawer) return;

    function setMenuOpen(isOpen) {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      menuDrawer.classList.toggle("is-open", isOpen);
      menuDrawer.setAttribute("aria-hidden", String(!isOpen));
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.style.display = isOpen ? "none" : "block";
        menuIconClose.style.display = isOpen ? "block" : "none";
      }
    }

    menuToggle.addEventListener("click", function () {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isExpanded);
    });

    // Close drawer when clicking any link inside it
    menuDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    // Close drawer when clicking outside header
    document.addEventListener("click", function (e) {
      if (
        menuToggle.getAttribute("aria-expanded") === "true" &&
        header &&
        !header.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    });

    // Close drawer automatically if viewport expands to desktop nav
    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth >= 1024 && menuToggle.getAttribute("aria-expanded") === "true") {
          setMenuOpen(false);
        }
      },
      { passive: true }
    );

    // Close drawer on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 3. SERVICES FILTER TABS & "BOOK SERVICE" PRE-SELECTION
   * ------------------------------------------------------------------------ */
  function initServicesSection() {
    const filterButtons = document.querySelectorAll("[data-service-filter]");
    const categoryCards = document.querySelectorAll("[data-service-category-card]");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetCategory = btn.getAttribute("data-service-filter");

        filterButtons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });

        categoryCards.forEach((card) => {
          const cardCat = card.getAttribute("data-service-category-card");
          if (targetCategory === "all" || cardCat === targetCategory) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Connect all [data-book-service] buttons to the Appointment Booking form
    document.querySelectorAll("[data-book-service]").forEach((trigger) => {
      trigger.addEventListener("click", function (e) {
        const desiredService = trigger.getAttribute("data-book-service");
        if (!desiredService) return;
        e.preventDefault();
        window.location.href = "appointment.html?service=" + encodeURIComponent(desiredService);
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 4. ACCESSIBLE GALLERY LIGHTBOX MODAL
   * ------------------------------------------------------------------------ */
  function initGalleryLightbox() {
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const lightboxCategory = document.getElementById("lightbox-category");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const grid = document.getElementById("gallery-grid");
    const filters = document.querySelectorAll("[data-gallery-filter]");
    if (!lightbox || !grid || !Array.isArray(config.gallery)) return;

    let currentIndex = 0;
    let lastFocusedElement = null;
    let visibleItems = [];
    let zoomLevel = 1;

    function cardMarkup(item, index) {
      const imgWidth = item.width || 223;
      const imgHeight = item.height || 279;
      return `<article class="gallery-card">
        <button type="button" class="gallery-trigger" data-lightbox-index="${index}" aria-label="Open larger view: ${item.title}">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" width="${imgWidth}" height="${imgHeight}" />
          <span class="gallery-zoom-pill">View photo</span>
        </button>
        <div class="gallery-card-meta"><div class="gallery-category-label">${item.category}</div><h3 class="gallery-card-title">${item.title}</h3></div>
      </article>`;
    }

    function renderCards(category) {
      const matches = config.gallery.filter((item) => !category || category === "All" || item.category === category);
      const previewCount = Number(grid.dataset.galleryPreview || 0);
      const featured = previewCount ? matches.filter((item) => item.featured) : matches;
      visibleItems = previewCount ? (featured.length ? featured : matches).slice(0, previewCount) : matches;
      grid.innerHTML = visibleItems.map(cardMarkup).join("");
      grid.querySelectorAll("[data-lightbox-index]").forEach((button) => {
        button.addEventListener("click", () => openLightbox(Number(button.dataset.lightboxIndex), button));
        const image = button.querySelector("img");
        image?.addEventListener("error", () => {
          image.alt = "This salon photo could not be loaded.";
          button.setAttribute("aria-label", "This salon photo could not be loaded");
          button.classList.add("media-error");
        }, { once: true });
      });
    }

    renderCards("All");
    filters.forEach((button) => button.addEventListener("click", () => {
      filters.forEach((filter) => {
        const selected = filter === button;
        filter.setAttribute("aria-pressed", String(selected));
        filter.classList.toggle("is-active", selected);
      });
      renderCards(button.dataset.galleryFilter);
    }));

    function renderSlide(index) {
      const total = visibleItems.length;
      if (!total) return;
      currentIndex = (index + total) % total;
      const item = visibleItems[currentIndex];
      if (!item) return;

      if (lightboxImg) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightboxImg.width = item.width || 223;
        lightboxImg.height = item.height || 279;
        lightboxImg.onerror = () => {
          lightboxImg.alt = "This salon photo could not be loaded.";
          if (lightboxCaption) lightboxCaption.textContent = "This photo could not be loaded. Close the viewer or choose another image.";
        };
        zoomLevel = 1;
        lightboxImg.style.transform = "scale(1)";
      }
      if (lightboxCategory) lightboxCategory.textContent = item.category;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
      if (lightboxCounter) {
        lightboxCounter.textContent =
          "Image " + (currentIndex + 1) + " of " + total;
      }
    }

    function openLightbox(index, triggerEl) {
      lastFocusedElement = triggerEl || document.activeElement;
      renderSlide(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        renderSlide(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        renderSlide(currentIndex + 1);
      });
    }

    document.getElementById("lightbox-zoom-in")?.addEventListener("click", () => {
      zoomLevel = Math.min(zoomLevel + 0.25, 3);
      if (lightboxImg) lightboxImg.style.transform = `scale(${zoomLevel})`;
    });
    document.getElementById("lightbox-zoom-out")?.addEventListener("click", () => {
      zoomLevel = Math.max(zoomLevel - 0.25, 1);
      if (lightboxImg) lightboxImg.style.transform = `scale(${zoomLevel})`;
    });
    document.getElementById("lightbox-zoom-reset")?.addEventListener("click", () => {
      zoomLevel = 1;
      if (lightboxImg) lightboxImg.style.transform = "scale(1)";
    });
    document.getElementById("lightbox-fullscreen")?.addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement) await lightbox?.requestFullscreen?.();
        else await document.exitFullscreen?.();
      } catch (error) {
        // Full-screen support can be unavailable or blocked by the browser.
      }
    });

    let touchStartX = null;
    lightbox?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    lightbox?.addEventListener("touchend", (event) => {
      if (touchStartX === null || zoomLevel > 1) {
        touchStartX = null;
        return;
      }
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) renderSlide(currentIndex + (delta < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });

    // Close on backdrop click
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation (Escape, Left, Right, Focus Trap)
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        renderSlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        renderSlide(currentIndex + 1);
      } else if (e.key === "Tab") {
        const focusable = lightbox.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 5. APPOINTMENT BOOKING FORM VALIDATION & WHATSAPP CONSTRUCT
   * ------------------------------------------------------------------------ */
  function initBookingForm() {
    const form = document.getElementById("appointment-form");
    if (!form) return;

    const nameField = document.getElementById("booking-name");
    const phoneField = document.getElementById("booking-phone");
    const serviceField = document.getElementById("booking-service");
    const dateField = document.getElementById("booking-date");
    const timeField = document.getElementById("booking-time");
    const messageField = document.getElementById("booking-message");
    const feedbackBox = document.getElementById("booking-form-feedback");

    // Set minimum date to today
    if (dateField) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      dateField.setAttribute("min", yyyy + "-" + mm + "-" + dd);
    }
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (serviceField && requestedService) {
      const aliasMap = {
        "Hair": "Hair Services (General)",
        "Hair Services": "Hair",
        "Nano plastian": "Nano plastian (Flagged — confirm with salon)",
        "Botox Treatment": "Botox Treatment (Flagged — confirm with salon)",
      };
      const candidates = [requestedService, aliasMap[requestedService]].filter(Boolean);
      const option = Array.from(serviceField.options).find((item) =>
        candidates.some((cand) => item.value.toLowerCase() === cand.toLowerCase())
      );
      if (option) {
        serviceField.value = option.value;
      }
    }

    function setFieldError(inputEl, errorId, message) {
      const errEl = document.getElementById(errorId);
      if (!inputEl || !errEl) return;
      if (message) {
        inputEl.setAttribute("aria-invalid", "true");
        errEl.textContent = message;
        errEl.classList.add("is-visible");
      } else {
        inputEl.setAttribute("aria-invalid", "false");
        errEl.textContent = "";
        errEl.classList.remove("is-visible");
      }
    }

    function validatePhone(value) {
      const digitsOnly = value.replace(/\D/g, "");
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }

    function validateForm() {
      let isValid = true;
      let firstInvalidField = null;

      const nameVal = nameField ? nameField.value.trim() : "";
      if (!nameVal) {
        setFieldError(nameField, "error-booking-name", "Please enter your full name.");
        isValid = false;
        firstInvalidField = firstInvalidField || nameField;
      } else {
        setFieldError(nameField, "error-booking-name", "");
      }

      const phoneVal = phoneField ? phoneField.value.trim() : "";
      if (!phoneVal) {
        setFieldError(phoneField, "error-booking-phone", "Please enter your phone or WhatsApp number.");
        isValid = false;
        firstInvalidField = firstInvalidField || phoneField;
      } else if (!validatePhone(phoneVal)) {
        setFieldError(
          phoneField,
          "error-booking-phone",
          "Please enter a valid 10-digit mobile number (e.g., +91 98765 43210)."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || phoneField;
      } else {
        setFieldError(phoneField, "error-booking-phone", "");
      }

      const serviceVal = serviceField ? serviceField.value.trim() : "";
      if (!serviceVal) {
        setFieldError(
          serviceField,
          "error-booking-service",
          "Please select a service or category."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || serviceField;
      } else {
        setFieldError(serviceField, "error-booking-service", "");
      }

      const dateVal = dateField ? dateField.value.trim() : "";
      if (!dateVal) {
        setFieldError(
          dateField,
          "error-booking-date",
          "Please choose your preferred visit date."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || dateField;
      } else {
        setFieldError(dateField, "error-booking-date", "");
      }

      const timeVal = timeField ? timeField.value.trim() : "";
      if (!timeVal) {
        setFieldError(
          timeField,
          "error-booking-time",
          "Please select a preferred time slot (salon closes at 9:00 PM)."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || timeField;
      } else {
        setFieldError(timeField, "error-booking-time", "");
      }

      return { isValid, firstInvalidField };
    }

    // Clear individual field error when user edits field
    [
      [nameField, "error-booking-name"],
      [phoneField, "error-booking-phone"],
      [serviceField, "error-booking-service"],
      [dateField, "error-booking-date"],
      [timeField, "error-booking-time"],
    ].forEach(([el, errId]) => {
      if (!el) return;
      el.addEventListener("input", function () {
        if (el.getAttribute("aria-invalid") === "true") {
          setFieldError(el, errId, "");
        }
      });
      el.addEventListener("change", function () {
        if (el.getAttribute("aria-invalid") === "true") {
          setFieldError(el, errId, "");
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const { isValid, firstInvalidField } = validateForm();

      if (!isValid) {
        if (feedbackBox) {
          feedbackBox.className = "form-feedback is-error";
          feedbackBox.innerHTML =
            "<strong>Please check the highlighted fields above.</strong> Complete all required details so we can prepare your WhatsApp appointment request.";
        }
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      const nameVal = nameField.value.trim();
      const phoneVal = phoneField.value.trim();
      const serviceVal = serviceField.value.trim();
      const dateVal = dateField.value.trim();
      const timeVal = timeField.value.trim();
      const messageVal = messageField ? messageField.value.trim() : "";

      const lines = [
        "Hi Scissors Noise, I’d like to request an appointment:",
        "",
        "• Name: " + nameVal,
        "• Phone: " + phoneVal,
        "• Service / Category: " + serviceVal,
        "• Preferred Date: " + dateVal,
        "• Preferred Time: " + timeVal,
      ];
      if (messageVal) {
        lines.push("• Message: " + messageVal);
      }
      lines.push(
        "",
        "Please let me know if this slot is available and confirm my appointment."
      );

      const whatsappText = lines.join("\n");
      const waNumber =
        (config.contact && config.contact.whatsappNumber) || "919987567224";
      const whatsappUrl =
        "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(whatsappText);

      if (feedbackBox) {
        feedbackBox.className = "form-feedback is-success";
        feedbackBox.innerHTML = "";

        const heading = document.createElement("p");
        heading.innerHTML =
          "<strong>Your WhatsApp appointment request is ready!</strong> Please note: <em>your appointment is not yet confirmed</em>—Scissors Noise will review your preferred time and confirm your booking on WhatsApp or by phone.";
        feedbackBox.appendChild(heading);

        const preview = document.createElement("pre");
        preview.className = "whatsapp-preview-box";
        preview.textContent = whatsappText;
        feedbackBox.appendChild(preview);

        const actionsWrap = document.createElement("div");
        actionsWrap.style.marginTop = "0.9rem";
        actionsWrap.style.display = "flex";
        actionsWrap.style.flexWrap = "wrap";
        actionsWrap.style.gap = "0.75rem";

        const openLink = document.createElement("a");
        openLink.href = whatsappUrl;
        openLink.target = "_blank";
        openLink.rel = "noopener noreferrer";
        openLink.className = "btn btn-whatsapp btn-sm";
        openLink.textContent = "Open WhatsApp to Send Request";
        actionsWrap.appendChild(openLink);

        feedbackBox.appendChild(actionsWrap);
      }

      // Open WhatsApp chat in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  /* ------------------------------------------------------------------------
   * INITIALIZE ON DOM READY
   * ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    syncConfigToDom();
    initNavigation();
    initServicesSection();
    initGalleryLightbox();
    initBookingForm();
  });
})();
