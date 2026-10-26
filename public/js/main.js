/* ============================================================
   TEMA CLARO / ESCURO
   ============================================================ */
const body      = document.body;
const btnTheme  = document.getElementById('btnTheme');
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  body.classList.remove('dark', 'light');
  body.classList.add(theme);
  localStorage.setItem(THEME_KEY, theme);
}

const saved = localStorage.getItem(THEME_KEY);
if (saved) {
  applyTheme(saved);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

btnTheme.addEventListener('click', () => {
  applyTheme(body.classList.contains('dark') ? 'light' : 'dark');
});

/* ============================================================
   MENU HAMBÚRGUER
   ============================================================ */
const btnHamburger = document.getElementById('btnHamburger');
const nav          = document.getElementById('nav');

btnHamburger.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  btnHamburger.classList.toggle('open', open);
  btnHamburger.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    btnHamburger.classList.remove('open');
    btnHamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   HEADER SCROLLED
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ============================================================
   NAV LINK ATIVO (IntersectionObserver por seção)
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[data-section]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === entry.target.id);
      });
    }
  });
}, { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim()} 0px -60% 0px` });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   ANIMAÇÃO AO ROLAR (IntersectionObserver)
   ============================================================ */
const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

/* ============================================================
   BARRAS DE HABILIDADES (animar uma vez ao aparecer)
   ============================================================ */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-card__fill');
      if (fill) fill.style.width = fill.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

/* ============================================================
   FILTRO DE PROJETOS
   ============================================================ */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'todos' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ============================================================
   FORMULÁRIO DE CONTATO
   ============================================================ */
const form         = document.getElementById('contactForm');
const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const msgInput     = document.getElementById('message');
const nameError    = document.getElementById('nameError');
const emailError   = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess  = document.getElementById('formSuccess');

function validate() {
  let valid = true;

  if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Por favor, informe seu nome (mínimo 2 caracteres).';
    nameInput.classList.add('invalid');
    valid = false;
  } else {
    nameError.textContent = '';
    nameInput.classList.remove('invalid');
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(emailInput.value.trim())) {
    emailError.textContent = 'Por favor, informe um e-mail válido.';
    emailInput.classList.add('invalid');
    valid = false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
  }

  if (msgInput.value.trim().length < 10) {
    messageError.textContent = 'Mensagem muito curta (mínimo 10 caracteres).';
    msgInput.classList.add('invalid');
    valid = false;
  } else {
    messageError.textContent = '';
    msgInput.classList.remove('invalid');
  }

  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate()) return;

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Mensagem';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

[nameInput, emailInput, msgInput].forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('invalid');
  });
});

/* ============================================================
   FOOTER: ANO ATUAL
   ============================================================ */
document.getElementById('footerYear').textContent = new Date().getFullYear();
