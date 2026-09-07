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

## Next steps

- The signup form is static (no backend) — it just shows a confirmation message. Wire it up to a real service (e.g. a form endpoint or email API) when you're ready to collect real signups.
- Swap the testimonials and subject list for real content once you have it.
