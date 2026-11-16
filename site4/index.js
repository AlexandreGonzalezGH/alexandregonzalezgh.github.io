// Met en évidence, dans la barre de navigation, la section affichée à l'écran.
// Le site reste entièrement utilisable sans ce script.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a')).filter(function (a) { return a.getAttribute('href').charAt(0) === '#'; });
  if (!links.length) return;
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if (!('IntersectionObserver' in window) || targets.some(function (t) { return !t; })) return;

  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    var current = null;
    targets.forEach(function (t) { if (visible[t.id]) current = t.id; });
    links.forEach(function (a) {
      if (current && a.getAttribute('href') === '#' + current) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }, { rootMargin: '-30% 0px -55% 0px' });

  targets.forEach(function (t) { observer.observe(t); });
})();
