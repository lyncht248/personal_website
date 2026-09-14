// Builds index.html from content/home.md + templates/home.html.
// Run locally with: npm install && node build.js
// Vercel runs this on every push, so editing content/home.md is all it takes.
const fs = require('fs');
const { marked } = require('marked');

const renderer = new marked.Renderer();

renderer.heading = (text, level) =>
  level === 1
    ? `<h1 class="page-title">${text}</h1>\n`
    : `<h${level}>${text}</h${level}>\n`;

// External links and PDFs open in a new tab; other internal (/...) links don't.
renderer.link = (href, title, text) => {
  const external = /^https?:\/\//i.test(href) || /\.pdf(#|$)/i.test(href);
  const attrs =
    ` href="${href}"` +
    (title ? ` title="${title}"` : '') +
    (external ? ' target="_blank" rel="noopener noreferrer"' : '');
  return `<a${attrs}>${text}</a>`;
};

// Category tags such as {hardware} or {hardware software} become space-separated
// data attribute values (for the filter buttons) instead of rendering as text.
renderer.listitem = (text) => {
  const m = text.match(/\s*\{((?:hardware|software|creative)(?:\s+(?:hardware|software|creative))*)\}\s*$/i);
  if (m) return `<li data-cat="${m[1].toLowerCase()}">${text.slice(0, m.index)}</li>\n`;
  return `<li>${text}</li>\n`;
};

marked.setOptions({ renderer });

// Drop the instructional comment at the top of the markdown file.
const md = fs.readFileSync('content/home.md', 'utf8').replace(/^\s*<!--[\s\S]*?-->\s*/, '');
const template = fs.readFileSync('templates/home.html', 'utf8');
let content = marked.parse(md);

// Inject the sort/filter buttons above the first list that carries category tags.
const firstTag = content.indexOf('data-cat=');
if (firstTag !== -1) {
  const ulIdx = content.lastIndexOf('<ul>', firstTag);
  const controls = `<div class="proj-controls">
<div id="proj-sort" class="proj-sort" role="group" aria-label="Project order" data-order="newest">
<button type="button" data-order="newest" aria-pressed="true" aria-controls="project-list">Newest first</button>
<button type="button" data-order="oldest" aria-pressed="false" aria-controls="project-list">Oldest first</button>
</div>
<div class="proj-filters">
<button type="button" class="proj-filter" data-cat="hardware">Hardware</button>
<button type="button" class="proj-filter" data-cat="software">Software</button>
<button type="button" class="proj-filter" data-cat="creative">Creative</button>
</div>
</div>
`;
  content = content.slice(0, ulIdx) + controls + '<ul class="proj-list" id="project-list">' + content.slice(ulIdx + 4);
}

const banner =
  '<!-- GENERATED FILE — do not edit. Edit content/home.md instead; node build.js regenerates this. -->\n';

const html = template.replace('<!--{{CONTENT}}-->', '\n' + content.trimEnd() + '\n');
fs.writeFileSync('index.html', html.replace('<!DOCTYPE html>\n', '<!DOCTYPE html>\n' + banner));
console.log('built index.html from content/home.md');
