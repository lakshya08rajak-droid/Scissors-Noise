# Scissors Noise – The Family Salon (Sanpada, Navi Mumbai)

A complete, responsive, editorial website for **Scissors Noise – The Family Salon**, located at Shop No. 1 & 2, Vinay Vedanta, Plot No. A23, near Sanpada Railway Station, Sector 4, Sanpada, Navi Mumbai, Maharashtra 400705.

---

## How to Run Locally

Because this website is built with standards-based HTML5, modern CSS, and dependency-free JavaScript (`defer` scripts that work both over `file://` and HTTP servers), you can run it in any of the following ways:

1. **Open Directly in Any Browser (Zero Setup):**
   - Double-click `index.html` in Finder or run:
     ```bash
     open /Users/lakshya/.gemini/antigravity/scratch/scissors-noise-salon/index.html
     ```
2. **Using VS Code / Antigravity Live Server:**
   - Open `/Users/lakshya/.gemini/antigravity/scratch/scissors-noise-salon` as your active workspace and click **Go Live** on `index.html`.
3. **Using Node.js / Python Static Server (if installed):**
   - `npx serve . -l 3000` or `python3 -m http.server 8080`

---

## Where to Edit Salon Details & Photos

All editable business details, hours, service categories, confirmation flags, review excerpts, social placeholders, and photo paths are centralized in:

- **`src/salon-config.js`**

### Current Photo Set

The 23 distinct supplied JPEGs are stored in `images/salon/` with their original filenames. The hero uses `Image 4.jpeg`, the About page uses `Image 21.jpeg`, and all supplied photos are registered in the `gallery` list in `src/salon-config.js`. To add or remove gallery items, edit that list and keep each referenced image inside `images/`.

The Gallery page includes category filters and an accessible image viewer with zoom, fit/reset, full-screen, previous/next, keyboard, and swipe controls. No video files were included with this photo set.

### Items Flagged for Salon Confirmation Before Publishing

- **“Nano plastian”** (under *Hair*): Preserved with its exact supplied spelling and flagged for salon confirmation before publishing.
- **“Botox Treatment”** (dedicated category): Included by name only as supplied with zero medical claims and flagged for salon confirmation before publishing.

## Supplied Salon Photos

The 23 distinct JPEGs supplied for the site are preserved in `images/salon/` with their original filenames. The home hero and About page use salon work/interior photos, and the complete set is registered in `src/salon-config.js` for the Gallery page. The Gallery has category filters and an accessible lightbox with zoom, fit/reset, full-screen, previous/next, keyboard, and swipe controls. No video files were supplied in this update.

The site now has dedicated static routes: `index.html`, `services.html`, `about.html`, `gallery.html`, `reviews.html`, `appointment.html`, and `contact.html`. Appointment requests are prepared in WhatsApp and are not automatically confirmed.
