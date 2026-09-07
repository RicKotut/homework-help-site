// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after tapping a link (mobile)
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Signup form — static site, so no real backend.
// Replace this with a real request to your form/email service when you have one.
const askForm = document.getElementById('ask-form');
const askResponse = document.getElementById('ask-response');

if (askForm && askResponse) {
  askForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = askForm.email.value.trim();
    if (!email) return;
    askResponse.textContent = `Thanks! We'll email ${email} with a link to get started.`;
    askForm.reset();
  });
}
