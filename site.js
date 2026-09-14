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

  // Project list controls: "Recent first" flips the order; a category button
  // greys out every row not in that category (click again to clear).
  var sortBtn = document.getElementById('proj-sort');
  var list = document.querySelector('.proj-list');
  if (sortBtn && list) {
    sortBtn.addEventListener('click', function () {
      Array.prototype.slice.call(list.children).reverse().forEach(function (li) {
        list.appendChild(li);
      });
      var nowRecent = sortBtn.dataset.state !== 'recent';
      sortBtn.dataset.state = nowRecent ? 'recent' : 'oldest';
      sortBtn.textContent = nowRecent ? 'Recent first' : 'Oldest first';
    });

    document.querySelectorAll('.proj-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wasActive = btn.classList.contains('active');
        document.querySelectorAll('.proj-filter').forEach(function (b) {
          b.classList.remove('active');
        });
        if (wasActive) {
          list.removeAttribute('data-filter');
        } else {
          btn.classList.add('active');
          list.setAttribute('data-filter', btn.dataset.cat);
        }
      });
    });
  }
})();
