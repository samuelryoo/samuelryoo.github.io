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

// Copy-to-clipboard for email
(function(){
  const btn = document.querySelector('.btn-copy');
  if (!btn) return;
  const targetSel = btn.getAttribute('data-copy');
  const el = document.querySelector(targetSel);
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(el.textContent.trim());
      btn.textContent = 'Copied!';
      setTimeout(()=> btn.textContent = 'Copy', 1200);
    }catch(e){
      btn.textContent = 'Copy failed';
      setTimeout(()=> btn.textContent = 'Copy', 1500);
    }
  });
})();

// (Optional) lightweight form handler—disabled by default
(function(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'This form isn’t wired yet. See instructions below.';
  });
})();

