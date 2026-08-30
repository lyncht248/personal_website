# tomlynch.me

Personal website of Tom Lynch. Plain static HTML/CSS/JS — no build step, no framework.

## Structure

- `index.html` — home page (about)
- `coaching/index.html` — Benzecry-Lynch Coaching page (served at `/coaching/`)
- `styles.css` — all styling, including light/dark themes (CSS variables on `html[data-theme]`)
- `site.js` — theme toggle + footer year
- `404.html` — not-found page
- `assets/` — photos, sample programme PDF, favicon, OG image

## Editing

Just edit the HTML. To add a page, copy `coaching/index.html` as a starting point (it carries the sidebar), drop it in a new folder, and add a link to the sidebar `<nav>` on each page.

The light/dark toggle defaults to the visitor's system preference and remembers their choice in `localStorage`.

## Deploying

Everything is static, so any static host works as-is:

- **Vercel** (where tomlynch.me currently points): import this repo, framework preset "Other", no build command, output directory `.` — then attach the `tomlynch.me` domain to this project instead of the old Lovable one.
- **GitHub Pages**: enable Pages on this branch, then point the `tomlynch.me` DNS at GitHub Pages.
