const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Відкрити меню');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Відкрити меню' : 'Закрити меню');
  mobileMenu.classList.toggle('open', !open);
  mobileMenu.setAttribute('aria-hidden', String(open));
  document.body.classList.toggle('menu-open', !open);
});

mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

document.querySelectorAll('.service-item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.service-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.service-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#service-select').value = link.dataset.service;
  });
});

document.querySelectorAll('.problem-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.problem-accordion');
    const willOpen = !card.classList.contains('open');
    card.classList.toggle('open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const form = document.querySelector('#request-form');
const errorMessage = form.querySelector('.form-error');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const email = String(data.get('email') || '').trim();
  const consent = data.get('consent');

  if (!name) {
    errorMessage.textContent = 'Будь ласка, вкажіть ваше ім’я.';
    form.elements.name.focus();
    return;
  }
  if (!phone && !email) {
    errorMessage.textContent = 'Вкажіть телефон або email для зв’язку.';
    form.elements.phone.focus();
    return;
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage.textContent = 'Перевірте правильність email.';
    form.elements.email.focus();
    return;
  }
  if (!consent) {
    errorMessage.textContent = 'Потрібна згода на обробку персональних даних.';
    form.elements.consent.focus();
    return;
  }

  errorMessage.textContent = 'Форма заповнена правильно. Після підключення сервісу заявка буде надіслана команді.';
  errorMessage.style.color = '#c7d7c3';
});

document.querySelector('#year').textContent = new Date().getFullYear();
