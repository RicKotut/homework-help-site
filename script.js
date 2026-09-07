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

// ---------- Quote request form ----------
// EDIT THESE TWO LINES with your real contact details:
const OWNER_EMAIL = 'you@example.com';           // where quote requests are emailed
const OWNER_WHATSAPP_NUMBER = '15551234567';     // country code + number, no + no spaces no dashes

const quoteForm = document.getElementById('quote-form');
const quoteResponse = document.getElementById('quote-response');
const contactLabel = document.getElementById('q-contact-label');
const contactInput = document.getElementById('q-contact');
const contactRadios = document.querySelectorAll('input[name="contact_method"]');

// Swap the contact field's label/placeholder when the user picks email vs WhatsApp
function updateContactField() {
  const method = document.querySelector('input[name="contact_method"]:checked').value;
  if (method === 'whatsapp') {
    contactLabel.textContent = 'Your WhatsApp number';
    contactInput.placeholder = 'e.g. +1 555 123 4567';
    contactInput.type = 'tel';
  } else {
    contactLabel.textContent = 'Your email address';
    contactInput.placeholder = 'you@school.edu';
    contactInput.type = 'email';
  }
}

contactRadios.forEach((radio) => radio.addEventListener('change', updateContactField));
if (contactRadios.length) updateContactField();

if (quoteForm && quoteResponse) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = quoteForm.name.value.trim();
    const subject = quoteForm.subject.value;
    const helpType = quoteForm.help_type.value;
    const urgency = quoteForm.urgency.value;
    const details = quoteForm.details.value.trim();
    const method = quoteForm.contact_method.value;
    const contactValue = quoteForm.contact_value.value.trim();

    if (!name || !subject || !helpType || !urgency || !details || !contactValue) {
      quoteResponse.textContent = 'Please fill in every field so we can send an accurate quote.';
      return;
    }

    const messageBody =
      `New quote request\n\n` +
      `Name: ${name}\n` +
      `Subject: ${subject}\n` +
      `Help needed: ${helpType}\n` +
      `Timeline: ${urgency}\n` +
      `Details: ${details}\n` +
      `Reply to (${method}): ${contactValue}`;

    if (method === 'whatsapp') {
      // Opens WhatsApp with the message pre-filled, ready for the visitor to hit send.
      const waText = encodeURIComponent(messageBody);
      window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${waText}`, '_blank');
      quoteResponse.textContent = 'Opening WhatsApp with your request filled in — just hit send.';
    } else {
      // Opens the visitor's email app with the message pre-filled.
      const subjectLine = encodeURIComponent(`Quote request: ${subject} — ${helpType}`);
      const emailBody = encodeURIComponent(messageBody);
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${subjectLine}&body=${emailBody}`;
      quoteResponse.textContent = 'Opening your email app with your request filled in — just hit send.';
    }

    quoteForm.reset();
    updateContactField();
  });
}
