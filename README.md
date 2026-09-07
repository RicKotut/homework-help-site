# Study Hall — starter site

A plain HTML/CSS/JS starter for a homework-help site. No build step, no dependencies — just open `index.html` in a browser to preview it locally.

## Push to GitHub

```bash
cd homework-help-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Replace `YOUR-USERNAME/YOUR-REPO` with the repo you create on github.com.

## Deploy on Cloudflare Pages

1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare's GitHub app and pick this repo.
3. Build settings:
   - **Build command:** leave empty
   - **Build output directory:** `/` (root)
4. Click **Save and Deploy**. You'll get a live URL like `https://your-repo.pages.dev`.

Every future `git push` to `main` redeploys automatically.

## Files

- `index.html` — page structure and content
- `style.css` — all styling
- `script.js` — mobile menu toggle + the signup form's response message

## Before you go live: edit your contact details

Open `script.js` and change these two lines near the top to your real details:

```js
const OWNER_EMAIL = 'you@example.com';           // where quote requests are emailed
const OWNER_WHATSAPP_NUMBER = '15551234567';     // country code + number, no + no spaces
```

The quote form is static (no backend) — when a visitor submits it, it opens *their* email app or WhatsApp with the request pre-filled, and they hit send. That means:

- **Pro:** works instantly, no signup, no server, totally free.
- **Con:** it relies on the visitor having an email app configured (mailto links don't work well if they only use Gmail in a browser tab) or having WhatsApp installed.

## Next steps

- If mailto links feel unreliable, consider swapping the email path for a free form backend like Formspree or Web3Forms — same form, but it POSTs directly to your inbox instead of opening the visitor's mail app.
- Swap the testimonials and subject list for real content once you have it.
- Keep quote requests focused on tutoring/explanation (concepts, practice problems, exam *prep*) rather than completed assignments or exam answers — many places treat "pay someone to do my exam" services as illegal (contract cheating laws) and most hosts/payment processors ban them outright.
