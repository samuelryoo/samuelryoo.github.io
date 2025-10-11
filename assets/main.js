(function(){
  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav__toggle');
  const list = document.getElementById('nav-list');
  if (toggle && list) {
    toggle.addEventListener('click', () => {
      const open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Hide hero image if it fails (until you add assets/me.jpg)
  const img = document.querySelector('.hero__photo');
  if (img) img.addEventListener('error', () => { img.style.display = 'none'; });
})();
