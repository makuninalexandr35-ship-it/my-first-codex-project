const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const orderForm = document.querySelector('.order-form');
const formStatus = document.querySelector('.form-status');

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!orderForm.checkValidity()) {
    formStatus.textContent = 'Пожалуйста, заполните обязательные поля.';
    orderForm.reportValidity();
    return;
  }

  const customerName = new FormData(orderForm).get('name').trim();
  formStatus.textContent = `${customerName}, спасибо! Мы скоро свяжемся с вами.`;
  orderForm.reset();
});

const dateInput = document.querySelector('input[type="date"]');
dateInput.min = new Date().toISOString().split('T')[0];
document.querySelector('#year').textContent = new Date().getFullYear();
