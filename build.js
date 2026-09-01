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

// External links open in a new tab; internal (/...) links don't.
renderer.link = (href, title, text) => {
  const external = /^https?:\/\//i.test(href);
  const attrs =
    ` href="${href}"` +
    (title ? ` title="${title}"` : '') +
    (external ? ' target="_blank" rel="noopener noreferrer"' : '');
  return `<a${attrs}>${text}</a>`;
};

marked.setOptions({ renderer });

// Drop the instructional comment at the top of the markdown file.
const md = fs.readFileSync('content/home.md', 'utf8').replace(/^\s*<!--[\s\S]*?-->\s*/, '');
const template = fs.readFileSync('templates/home.html', 'utf8');
const content = marked.parse(md);

const banner =
  '<!-- GENERATED FILE — do not edit. Edit content/home.md instead; node build.js regenerates this. -->\n';

const html = template.replace('<!--{{CONTENT}}-->', '\n' + content.trimEnd() + '\n');
fs.writeFileSync('index.html', html.replace('<!DOCTYPE html>\n', '<!DOCTYPE html>\n' + banner));
console.log('built index.html from content/home.md');
