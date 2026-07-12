# Audêncio Victor — Academic Portfolio

Personal academic website of **Audêncio Victor** (BSc, PGDip, MPH, MBA, PhD) — Postdoctoral Researcher in Health Data Science at the London School of Hygiene & Tropical Medicine (LSHTM).

🔗 **Live site:** [audency.github.io](https://audency.github.io)

---

## About

Epidemiologist and health data scientist working at the intersection of **public health, epidemiology, and machine learning**, with a focus on maternal and child health, cardiovascular and infectious-disease epidemiology, and health inequalities across Brazil and sub-Saharan Africa.

The site brings together my research profile in one place:

- **About & research interests**
- **Education** — PhD, MPH, and MBA training
- **Experience** — postdoctoral and applied public-health work
- **Publications** — 35 peer-reviewed articles (with DOI links) plus manuscripts under review
- **Editorial & peer-review** activity and recognition
- **Skills & contact**

## Tech stack

A lightweight, dependency-free static site — fast to load and easy to maintain:

- **HTML5** — semantic single-page layout (`index.html`)
- **CSS3** — custom styling, no framework (`assets/css/style.css`)
- **Vanilla JavaScript** — tabs, smooth scrolling, and fade-in animations (`assets/js/main.js`)
- **GitHub Pages** — hosting and continuous deployment

## Project structure

```
.
├── index.html            # Main single-page site
├── assets/
│   ├── css/style.css     # Styles
│   ├── js/main.js        # Interactions
│   ├── images/           # Profile photos
│   └── Audencio_Victor_CV.pdf
└── README.md
```

## Running locally

No build step is required. Clone the repository and open the site:

```bash
git clone https://github.com/Audency/Audency.github.io.git
cd Audency.github.io
# open index.html directly, or serve locally:
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Updating publications

Each publication lives as a `.pub-item` block inside the `#publications` section of `index.html`.
To add a paper, copy an existing block, update the year, title, and journal, and — when available —
wrap the title in a DOI link:

```html
<div class="pub-item">
  <span class="pub-year">2026</span>
  <div class="pub-title">
    <a href="https://doi.org/DOI_HERE" target="_blank" rel="noopener">Article title</a>
    <a class="pub-doi" href="https://doi.org/DOI_HERE" target="_blank" rel="noopener">DOI ↗</a>
  </div>
  <div class="pub-journal">Journal name</div>
</div>
```

Remember to update the counters in the publication tabs and the stat cards.

## Contact

- 📧 audenciovictor@usp.br
- 🔗 [audency.github.io](https://audency.github.io)
- 🐙 [github.com/Audency](https://github.com/Audency)

---

© Audêncio Victor. All rights reserved.
