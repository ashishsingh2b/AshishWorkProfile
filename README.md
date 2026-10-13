# Ashish Singh — Professional Developer Portfolio

> **Python Full Stack Developer | Django, FastAPI & AI Systems**  
> Location: Surat, Gujarat, India &bull; Email: [ashishsingh2b@gmail.com](mailto:ashishsingh2b@gmail.com) &bull; Phone: +91 8487840633  
> LinkedIn: [linkedin.com/in/ashsihsing](https://www.linkedin.com/in/ashsihsing/) &bull; GitHub: [github.com/ashishsingh2b](https://github.com/ashishsingh2b)

---

## 1. Project Overview

A modern, high-performance, fully responsive, and completely **static frontend portfolio** designed for **Ashish Singh**. The portfolio showcases real-world commercial deliverables, enterprise MLOps architectures, healthcare ERP systems, and AI-integrated platforms.

### Key Highlights
- **100% Static & Frontend-Only:** Zero custom backend servers, zero database requirements, and zero runtime API dependencies. Suitable for direct CDN static hosting.
- **Strict Project Hierarchy:** **TimePe Services** (India's #1 AI-powered Accounting ERP) is prominently featured as the first project across all applicable views, accompanied by verified production screenshots.
- **Comprehensive Project Showcase:** Highlights all 5 projects from Ashish's experience (TimePe Services, RiverGen AI, DentalNote AI, Earthworm, and Lootamo).
- **Accurate Resume Facts:** All employment history (Globalia Soft LLP, Positive Infotech), education (Pacific School of Engineering), certifications (Tops Technologies), and technical competencies are strictly preserved without exaggeration.
- **Modern UI & UX:** Clean light theme by default, accessible typography, responsive cards, category filters, interactive code previews, fullscreen image lightbox, and an optional dark mode toggle.
- **Client-Side Form & Direct Mail:** Contact form with input validation and direct mailto link / clipboard copy fallback.
- **SEO & Social Optimization:** Complete Open Graph metadata, Twitter cards, semantic HTML5, favicon set, `robots.txt`, and `sitemap.xml`.

---

## 2. Technology Stack

- **Framework:** React.js 19
- **Build Tool:** Vite 8
- **Language:** JavaScript & JSX (No TypeScript)
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React & Custom Brand SVGs
- **Deployment Target:** Static Hosting (Vercel, Netlify, GitHub Pages, Cloudflare Pages, AWS S3)

---

## 3. Directory Structure

```text
public/
├── assets/
│   └── projects/
│       ├── timepe-hero.png          # Verified TimePe ERP dashboard screenshot
│       ├── timepe-multicompany.png  # Multi-company accounting screenshot
│       ├── timepe-billing.png       # AI smart billing screenshot
│       ├── timepe-gst.png           # GST compliance workflow screenshot
│       ├── timepe-jobwork.png       # Mill & jobwork management screenshot
│       ├── timepe-logo.png          # TimePe brand emblem
│       ├── rivergen-logo.png        # Authentic RiverGen brand mark
│       ├── rivergen-preview.png     # Architectural Model Studio preview
│       ├── dentalnote-preview.png   # Clinical workspace EHR preview
│       ├── earthworm-preview.png    # Security scanner & compliance preview
│       └── lootamo-preview.png      # E-commerce digital storefront preview
├── android-chrome-192x192.png       # PWA icon (192px)
├── android-chrome-512x512.png       # PWA icon (512px)
├── apple-touch-icon.png             # Apple touch icon (180px)
├── favicon.ico                      # Standard ICO favicon
├── favicon.svg                      # Scalable SVG AS monogram
├── favicon-16x16.png                # Browser tab icon (16px)
├── favicon-32x32.png                # Browser tab icon (32px)
├── og-image.png                     # Open Graph 1200x630 social share card
├── resume.pdf                       # Ashish Singh's resume PDF
├── robots.txt                       # Search engine crawler directives
├── sitemap.xml                      # XML sitemap
└── _redirects                       # Netlify SPA redirect rules

src/
├── components/
│   ├── Button.jsx                   # Reusable button with variants & sizes
│   ├── ContactForm.jsx              # Static contact form with regex validation
│   ├── Footer.jsx                   # Footer with dynamic year & back-to-top
│   ├── Icons.jsx                    # Custom GitHub & LinkedIn SVGs
│   ├── Navbar.jsx                   # Sticky navbar, mobile menu & theme toggle
│   ├── ProjectCard.jsx              # Featured & standard project cards
│   ├── ProjectGallery.jsx           # Screenshot carousel & fullscreen lightbox
│   ├── ProjectModal.jsx             # Accessible project detail dialog
│   ├── ScrollToTop.jsx              # Floating smooth scroll button
│   └── SectionHeading.jsx           # Consistent typography headings
├── data/
│   ├── achievements.js              # 5 verified accomplishments
│   ├── certifications.js            # Tops Technologies & AS Computer Classes
│   ├── education.js                 # BE Computer Science & school degrees
│   ├── experience.js                # Globalia Soft LLP & Positive Infotech
│   ├── personal.js                  # Contact details, bio, and stats
│   ├── projects.js                  # 5 projects with TimePe always first
│   └── skills.js                    # Categorized technical competencies
├── sections/
│   ├── About.jsx                    # Background, experience intro, stats
│   ├── Achievements.jsx             # Production milestones showcase
│   ├── Certifications.jsx           # Technical credentials
│   ├── Contact.jsx                  # Direct channels, form, resume CTA
│   ├── Experience.jsx               # Education & work history timeline
│   ├── Hero.jsx                     # Introduction, CTA buttons & code visual
│   ├── Projects.jsx                 # Filterable portfolio grid
│   └── Skills.jsx                   # Categorized skills & capabilities
├── App.jsx                          # Main application layout & theme manager
├── index.css                        # Tailwind directives & design tokens
└── main.jsx                         # React DOM mount point
```

---

## 4. Getting Started & Local Development

### Prerequisites
- **Node.js** (v18.0.0 or later recommended; tested on v24.20.0)
- **npm** (v9.0.0 or later; tested on v11.19.0)

### Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### Run Local Development Server
Start Vite's fast hot-module-replacement (HMR) development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in the terminal).

---

## 5. Production Build & Static Verification

To create the optimized static production bundle:
```bash
npm run build
```
This command compiles all React components, minifies CSS and JavaScript, and outputs pure static files to the `dist/` directory.

To test the generated production build locally:
```bash
npm run preview
```
Open `http://localhost:4173/` in your browser.

---

## 6. Static Hosting & Deployment Instructions

### A. Deploy to Vercel
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Accept the default settings (Framework: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
4. Alternatively, push to GitHub and import the repository into your Vercel Dashboard.

### B. Deploy to Netlify
1. The included `public/_redirects` file automatically ensures proper client routing.
2. Run `netlify deploy --prod --dir=dist` or link the GitHub repository in the Netlify web dashboard.
3. Build command: `npm run build`, Publish directory: `dist`.

### C. Deploy to GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'` if deploying to a project page, or leave default for user pages.
2. Build the project: `npm run build`
3. Use `gh-pages` or GitHub Actions to publish the `dist/` folder to the `gh-pages` branch.

---

## 7. How to Update Content & Assets

### Updating Personal Information
Edit `src/data/personal.js` to modify your bio, phone number, email, or online profiles. All components automatically synchronize with this file.

### Adding or Updating Projects
Edit `src/data/projects.js`:
- Each project object contains `title`, `tagline`, `shortDescription`, `fullDescription`, `technologies`, `highlights`, `contributions`, `liveUrl`, and `screenshots`.
- **Note:** Keep `timepe-services` with `isFeatured: true` and placed at index 0 to preserve the required project ordering.

### Replacing Project Screenshots
1. Save your screenshot image (PNG, WebP, or JPG) into `public/assets/projects/`.
2. In `src/data/projects.js`, update the project's `heroImage` path and add items to the `screenshots` array with a descriptive `title` and `caption`.

### Updating the Resume PDF
Replace `public/resume.pdf` with the updated file. The "Download Resume" buttons on the Hero, Navbar, Footer, and Contact sections all link to `/resume.pdf`.

### Configuring the Contact Form (Formspree or EmailJS)
The contact form is **fully functional** and ready to send messages directly to **`ashishsingh2b@gmail.com`**.
It includes client-side field validation, dynamic loading state (`Loader2`), success confirmation alert, and error recovery with email app (`mailto:`) and clipboard copy fallbacks.

- **Option A: Formspree (Default & Recommended)**
  1. Register for free at [Formspree](https://formspree.io/).
  2. Create a new form with target email `ashishsingh2b@gmail.com`.
  3. Set `VITE_FORMSPREE_ID=your_form_id` in `.env` (or set `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id`).

- **Option B: EmailJS**
  1. Register at [EmailJS](https://www.emailjs.com/) and connect your Gmail account (`ashishsingh2b@gmail.com`).
  2. Create an Email Template with fields: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`.
  3. Add the following to `.env`:
     ```env
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

---

## 8. Missing Information & Recommended Owner Assets

The following items are private or require authorization from the owner. Placeholders and architectural previews have been provided so the site operates smoothly without broken links:

1. **RiverGen Model Studio (Internal Screens):**  
   - `https://app.rivergen.ai/` requires enterprise organization login credentials.  
   - *Action:* The owner can supply internal screenshots of the Model Studio ROC curve, confusion matrix, and drift monitoring dashboards to replace `public/assets/projects/rivergen-preview.png`.
2. **DentalNote AI Clinical EHR Screens:**  
   - Clinical system containing HIPAA-protected patient health data.  
   - *Action:* The owner can supply sanitized or demo-tenant screenshots of the speech-to-text dictation screen to replace `public/assets/projects/dentalnote-preview.png`.
3. **Earthworm Cybersecurity Console Screens:**  
   - Internal enterprise platform with sensitive IP and organizational security monitoring data.  
   - *Action:* The owner can supply sanitized interface screenshots of the vulnerability report to replace `public/assets/projects/earthworm-preview.png`.
4. **Lootamo E-Commerce Storefront Screens:**  
   - Private commercial storefront.  
   - *Action:* The owner can supply live checkout or administrative screenshots to replace `public/assets/projects/lootamo-preview.png`.
5. **Certificates & Verification URLs:**  
   - Tops Technologies and AS Computer Classes certificate IDs or scans can be linked in `src/data/certifications.js` once digital credentials are provided.

---

## 9. Verification & Quality Checklist

- [x] 100% static React.js + Tailwind CSS architecture with Vite.
- [x] Verified zero runtime backend/database dependencies.
- [x] TimePe Services is first and featured with genuine production screenshots downloaded directly from `timepeservice.com`.
- [x] All 5 project showcases implemented with detail modals, technology badges, and verified contributions.
- [x] Project category filtering works entirely in client-side React without network latency.
- [x] Resume PDF correctly located at `public/resume.pdf` and verified for direct download.
- [x] Favicons generated and linked: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`.
- [x] Contact details preserved verbatim from resume: email, phone, location, LinkedIn, GitHub.
- [x] Responsive layout verified across mobile, tablet, laptop, and desktop viewports.
- [x] Production build passes cleanly with zero errors (`dist/` directory generated).
# AshishWorkProfile
