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
// EDIT THESE LINES with your real contact details:
const OWNER_EMAIL = 'a.jenniferbell@gmail.com';  // where quote requests are emailed
const OWNER_WHATSAPP_NUMBER = '254780708415';    // country code + number, no + no spaces no dashes
const WEB3FORMS_ACCESS_KEY = '0a92482f-0752-4242-aea6-30002ef63cb7'; // from web3forms.com — sends the email reliably from any device/browser

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
  const fieldChecks = [
    { el: () => quoteForm.name, label: 'Your name' },
    { el: () => quoteForm.subject, label: 'Subject (pick one from the dropdown)' },
    { el: () => quoteForm.help_type, label: 'What kind of help (pick one from the dropdown)' },
    { el: () => quoteForm.urgency, label: 'When you need this (pick one from the dropdown)' },
    { el: () => quoteForm.details, label: 'Details' },
    { el: () => quoteForm.contact_value, label: 'Your email or WhatsApp number' },
  ];

  function clearFieldErrors() {
    quoteForm.querySelectorAll('.field-error').forEach((el) => el.classList.remove('field-error'));
  }

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFieldErrors();

    let firstInvalid = null;
    for (const check of fieldChecks) {
      const el = check.el();
      if (!el.value || !el.value.trim()) {
        el.classList.add('field-error');
        if (!firstInvalid) firstInvalid = { el, label: check.label };
      }
    }

    if (firstInvalid) {
      quoteResponse.textContent = `Please fill in: ${firstInvalid.label}.`;
      firstInvalid.el.focus();
      firstInvalid.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const name = quoteForm.name.value.trim();
    const subject = quoteForm.subject.value;
    const helpType = quoteForm.help_type.value;
    const urgency = quoteForm.urgency.value;
    const details = quoteForm.details.value.trim();
    const method = quoteForm.contact_method.value;
    const contactValue = quoteForm.contact_value.value.trim();

    const messageBody =
      `New quote request\n\n` +
      `Name: ${name}\n` +
      `Subject: ${subject}\n` +
      `Help needed: ${helpType}\n` +
      `Timeline: ${urgency}\n` +
      `Details: ${details}\n` +
      `Reply to (${method}): ${contactValue}`;

    const submitBtn = quoteForm.querySelector('button[type="submit"]');

    if (method === 'whatsapp') {
      // Opens WhatsApp with the message pre-filled, ready for the visitor to hit send.
      // Works on both the WhatsApp app (mobile) and WhatsApp Web (desktop).
      const waText = encodeURIComponent(messageBody);
      window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${waText}`, '_blank');
      quoteResponse.textContent = 'Opening WhatsApp with your request filled in — just hit send.';
      quoteForm.reset();
      updateContactField();
      return;
    }

    // Email path: submit straight to the inbox via Web3Forms.
    // This works on every device/browser, unlike mailto: links, which only work
    // if the visitor has a default desktop email app configured.
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    quoteResponse.textContent = '';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Quote request: ${subject} — ${helpType}`,
        from_name: name,
        email: contactValue,
        message: messageBody,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          quoteResponse.textContent = "Thanks! Your request is in — we'll email you a quote shortly.";
          quoteForm.reset();
          updateContactField();
        } else {
          quoteResponse.textContent = `Something went wrong sending your request. You can also email us directly at ${OWNER_EMAIL}.`;
        }
      })
      .catch(() => {
        quoteResponse.textContent = `Something went wrong sending your request. You can also email us directly at ${OWNER_EMAIL}.`;
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send request';
      });
  });
}
