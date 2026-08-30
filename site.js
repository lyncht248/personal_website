// Theme toggle: flips [data-theme] on <html> and remembers the choice.
// (The initial theme is set by an inline script in <head> to avoid a flash.)
(function () {
  var btn = document.getElementById('theme-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
