# Oisee – Eyewear Website

Static site (plain HTML, CSS, JavaScript). No build step, no Node, no React/Vite.

## Structure
```
oisee-site/
├── index.html
├── .nojekyll
├── css/style.css
├── js/
│   ├── script-1.js   (menu, page logic)
│   ├── script-2.js   (3D hero, uses Three.js)
│   ├── script-3.js
│   └── script-4.js
└── assets/
    ├── fonts/   fira-sans-400/500/600/700.woff
    └── images/  hero.jpg, frame-1..4.jpg, banner-1..3.jpg
```
Three.js r128 is loaded from cdnjs (needs internet; works on GitHub Pages).

## Deploy on GitHub Pages
1. Create a new repo on github.com (e.g. `oisee-site`).
2. Upload the CONTENTS of this folder (index.html at the repo root, plus css/, js/, assets/, .nojekyll).
3. Repo > Settings > Pages > Source: "Deploy from a branch" > Branch: `main`, folder `/ (root)` > Save.
4. After ~1 minute the site is live at https://<your-username>.github.io/oisee-site/

## Things to edit
- WhatsApp button: in index.html, replace `910000000000` in the `wa.me` link with your real number
  (country code + number, no + or spaces).
