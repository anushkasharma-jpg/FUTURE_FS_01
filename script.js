const typedPhrases = [
  'responsive websites',
  'interactive interfaces',
  'clean UI systems',
  'smooth user journeys'
];
const typedText = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');
let phraseIndex = 0;
let letterIndex = 0;
let typingForward = true;

function typePhrase() {
  const currentPhrase = typedPhrases[phraseIndex];
  if (typingForward) {
    typedText.textContent = currentPhrase.slice(0, letterIndex + 1);
    letterIndex += 1;
    if (letterIndex === currentPhrase.length) {
      typingForward = false;
      setTimeout(typePhrase, 1200);
      return;
    }
  } else {
    typedText.textContent = currentPhrase.slice(0, letterIndex - 1);
    letterIndex -= 1;
    if (letterIndex === 0) {
      typingForward = true;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
    }
  }
  setTimeout(typePhrase, typingForward ? 90 : 45);
}

typePhrase();

const navToggle = document.getElementById('nav-toggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
  navToggle.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
  });
});

const revealElements = document.querySelectorAll('.reveal');
const observerOptions = {
  threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => revealObserver.observe(el));

function updateActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${section.id}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((navLink) => navLink.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in every field.';
    return;
  }

  formMessage.textContent = 'Thanks! Your message is on its way.';
  contactForm.reset();
  setTimeout(() => {
    formMessage.textContent = '';
  }, 4000);
});