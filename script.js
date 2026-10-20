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

// ---------- Floating "Chat on WhatsApp" button (appears on every page) ----------
// Uses OWNER_WHATSAPP_NUMBER above, so changing that one line updates the button everywhere.
(function addWhatsAppButton() {
  var message = encodeURIComponent("Hi, I’m interested in tutoring help from Study Hall Tutors.");
  var link = document.createElement('a');
  link.className = 'whatsapp-float';
  link.href = 'https://wa.me/' + OWNER_WHATSAPP_NUMBER + '?text=' + message;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', 'Chat with us on WhatsApp');
  link.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
    '<span>Chat on WhatsApp</span>';
  document.body.appendChild(link);
})();
