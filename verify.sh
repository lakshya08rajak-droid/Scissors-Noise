#!/bin/sh
set -e

echo "=== Verifying Scissors Noise – The Family Salon Website ==="

# 1. Check core files exist
for f in index.html services.html about.html gallery.html reviews.html appointment.html contact.html src/salon-config.js src/site-pages.js src/app.js src/styles.css package.json README.md; do
  if [ ! -s "$f" ]; then
    echo "ERROR: Missing or empty file: $f"
    exit 1
  fi
done
echo "[OK] Core project files exist and are non-empty."

# 2. Check all 11 SVG placeholders exist
for img in \
  images/placeholders/hero-salon-interior.svg \
  images/placeholders/about-salon-space.svg \
  images/placeholders/team-owner-vaishali.svg \
  images/placeholders/team-member-placeholder-1.svg \
  images/placeholders/team-member-placeholder-2.svg \
  images/placeholders/gallery-salon-interior.svg \
  images/placeholders/gallery-hairstyling-cuts.svg \
  images/placeholders/gallery-hair-color-balayage.svg \
  images/placeholders/gallery-nail-art-manicure.svg \
  images/placeholders/gallery-bridal-occasion.svg \
  images/placeholders/gallery-skin-beauty-care.svg; do
  if [ ! -s "$img" ]; then
    echo "ERROR: Missing placeholder image: $img"
    exit 1
  fi
done
echo "[OK] All 11 custom SVG placeholder images exist."

# 2b. Supplied salon photographs are present and registered.
for img in "Image 1.jpeg" "Image 2.jpeg" "Image 5.jpeg" "Image 4.jpeg" "Image 6.jpeg" "Image 7.jpeg" "Image 12.jpeg" "Image 23.jpeg" "Image 29.jpeg" "Image 28.jpeg" "Image 27.jpeg" "Image 25.jpeg" "Image 24.jpeg" "Image 22.jpeg" "Image 21.jpeg" "Image 19.jpeg" "Image 17.jpeg" "Image 18.jpeg" "Image 16.jpeg" "Image 15.jpeg" "Image 14.jpeg" "Image 13.jpeg" "Image 9.jpeg"; do
  if [ ! -s "images/salon/$img" ]; then
    echo "ERROR: Missing supplied salon photo: $img"
    exit 1
  fi
done
grep -q 'id: "salon-photo-23"' src/salon-config.js
echo "[OK] All 23 supplied salon photographs are present and registered."

# 2c. Dedicated routes and gallery controls exist.
grep -q 'data-page="gallery"' gallery.html
grep -q 'data-page="reviews"' reviews.html
grep -q 'data-page="appointment"' appointment.html
grep -q 'data-gallery-filter' src/site-pages.js
echo "[OK] Dedicated Services, About, Gallery, Reviews, Appointment, and Contact pages exist."

# 3. Check section IDs in index.html
for sec in home services about why-visit team gallery reviews booking contact site-header gallery-lightbox; do
  if ! grep -q "id=\"$sec\"" index.html; then
    echo "ERROR: Missing section id=\"$sec\" in index.html"
    exit 1
  fi
done
echo "[OK] All required section IDs and interactive landmarks present."

# 4. Check exact review excerpts
grep -q "Best service and familer staff we visit second time with full of happiness 😊" index.html
grep -q "I absolutely love the outcome and have received so many compliments already!" index.html
grep -q "The owner Mrs. Vaishali is very soft spoken and courteous towards the customers." index.html
echo "[OK] All 3 supplied Google review excerpts preserved word-for-word."

# 5. Check flagged services and business details
grep -q "Nano plastian" index.html
grep -q "Botox Treatment" index.html
grep -q "919987567224" index.html
grep -q "+91 99875 67224" index.html
grep -q "Vinay Vedanta, Plot No. A23" index.html
grep -q "550" index.html
grep -q "4.9" index.html
echo "[OK] Flagged services, WhatsApp number (919987567224), address, and rating verified."

# 6. Check no lorem ipsum or dental leakage
if grep -qi "lorem ipsum\|dentist\|dental\|orthodont" index.html src/salon-config.js src/app.js; then
  echo "ERROR: Found prohibited lorem ipsum or dental text!"
  exit 1
fi
echo "[OK] Zero lorem ipsum or dental terminology found."

# 7. Check responsive media queries and reduced motion in CSS
grep -q "@media (min-width: 640px)" src/styles.css
grep -q "@media (min-width: 768px)" src/styles.css
grep -q "@media (min-width: 1024px)" src/styles.css
grep -q "@media (prefers-reduced-motion: reduce)" src/styles.css
echo "[OK] Responsive mobile/tablet/desktop breakpoints and reduced-motion rules verified."

echo "=== ALL CHECKS PASSED ==="
