# tomlynch.me

Personal website of Tom Lynch. Plain static HTML/CSS/JS — no build step, no framework.

## Structure

- `index.html` — home page (about)
- `coaching/index.html` — old Benzecry-Lynch Coaching page, kept as a keepsake at `/coaching/`. Deliberately not linked from the nav; the only way in is the hidden full stop after "2023 and 2024" on the home page (or the URL directly)
- `styles.css` — all styling, including light/dark themes (CSS variables on `html[data-theme]`)
- `site.js` — theme toggle + footer year
- `404.html` — not-found page
- `assets/` — photos, sample programme PDF, favicon, OG image

## Editing

Just edit the HTML. To add a page, copy `coaching/index.html` as a starting point (it carries the sidebar), drop it in a new folder, and add a link to the sidebar `<nav>` on each page.

The light/dark toggle defaults to the visitor's system preference and remembers their choice in `localStorage`.

## Deploying (moving off Lovable)

The old site was built in Lovable and served via Vercel; this repo is now the source of truth. Everything is static — no build step — so either free option works:

- **Vercel (recommended — DNS already points there):** [vercel.com/new](https://vercel.com/new) → import `lyncht248/personal_website` → framework preset "Other", leave build command and output directory empty → Deploy. Then in the project: Settings → Domains → add `tomlynch.me`. Vercel will walk through verifying/claiming the domain away from the old Lovable-managed project (usually a TXT record); since the domain's DNS already resolves to Vercel, no other DNS change should be needed.
- **GitHub Pages:** repo Settings → Pages → Deploy from branch → `main` / root. Then set `tomlynch.me` as the custom domain there and update the domain registrar's A records to GitHub Pages' IPs (`185.199.108.153` through `.111.153`) with a `www` CNAME to `lyncht248.github.io`.

Once the new deploy serves tomlynch.me, the Lovable project can be deleted.
