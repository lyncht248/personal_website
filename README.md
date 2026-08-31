# tomlynch.me

Personal website of Tom Lynch. Plain static HTML/CSS/JS — no build step, no framework.

## Structure

- `index.html` — home page (About + Projects / Other link list)
- `projects/<slug>/index.html` — stub pages for projects without an external link (rowing, eeg, mining, lidar, blender). Each has a "Write-up coming soon." placeholder and a commented-out example showing how to add paragraphs and images
- `coaching/index.html` — old Benzecry-Lynch Coaching page, kept as a keepsake at `/coaching/`. Deliberately not linked from the nav; the only way in is the hidden full stop after "2023 and 2024" on the home page (or the URL directly)
- `styles.css` — all styling, including light/dark themes (CSS variables on `html[data-theme]`)
- `site.js` — theme toggle + footer year
- `404.html` — not-found page
- `assets/` — photos, sample programme PDF, favicon, OG image

## Editing

Just edit the HTML. To add a page, copy `coaching/index.html` as a starting point (it carries the sidebar), drop it in a new folder, and add a link to the sidebar `<nav>` on each page.

The light/dark toggle defaults to the visitor's system preference and remembers their choice in `localStorage`.

## Deploying

Deployed by the Vercel project **personal-website** (in "lyncht248's projects"): every push to `main` auto-deploys to production, no build step, framework "Other". `tomlynch.me` serves the site; `www.tomlynch.me` 308-redirects to the apex.

History: the previous site was built in Lovable and deployed via the `benzecry-lynch-coaching` Vercel project (source: the `lyncht248/benzecry-lynch-coaching` repo). The domains were moved to this project in Aug 2026; the old project/repo remain as an archive of the original React site and can be deleted without affecting anything.
