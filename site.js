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

  // The source order is newest first. Each sort button selects an explicit order;
  // category buttons grey out other rows (click again to clear).
  var sortControl = document.getElementById('proj-sort');
  var list = document.querySelector('.proj-list');
  if (sortControl && list) {
    var newestRows = Array.prototype.slice.call(list.children);
    var sortButtons = sortControl.querySelectorAll('button');
    sortButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var order = button.dataset.order;
        if (sortControl.dataset.order === order) return;
        var rows = order === 'newest' ? newestRows : newestRows.slice().reverse();
        rows.forEach(function (li) { list.appendChild(li); });
        sortControl.dataset.order = order;
        sortButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.dataset.order === order));
        });
      });
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
