# WebP Converter

A fully client-side WebP conversion tool. Drag in PNG/JPEG/GIF images, adjust
quality, convert with `<canvas>`, and download individually or as a ZIP —
nothing ever leaves the browser.

Built with **Vite + React + React Router + Tailwind CSS v4 + lucide-react + JSZip**.

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build   # production build to dist/
npm run preview # preview the production build locally
```

## Project structure

```
src/
  App.jsx            Router setup: "/" (converter), "/tokushoho", "/terms", "/privacy"
  i18n/              6-language dictionary (en/ja/zh/hi/es/fr) + I18nContext (language switch)
  hooks/useProStatus.js       Pro activation state (localStorage + Stripe return URL)
  context/ProStatusContext.jsx  Shares Pro status + the Go Pro modal across every route
  utils/convertToWebp.js      Canvas-based PNG/JPEG/GIF → WebP conversion
  utils/downloadZip.js        Bundles converted files into a ZIP via JSZip
  components/        Layout (Header/Footer shell), DropZone, QualitySlider,
                      FileList/FileItem, ProModal (Stripe CTA + promo code),
                      LimitModal (free-tier cap), LegalPageLayout (shared legal-page chrome)
  pages/             ConverterPage (the tool itself), Tokushoho, Terms, Privacy
  config.js          Freemium constants + Stripe Payment Link + promo codes
```

`vercel.json` rewrites every path to `index.html` so deep links like `/terms`
resolve correctly on Vercel's static hosting (client-side routing).

## Freemium logic

- **Free plan**: up to 5 images per batch (`FREE_MAX_FILES`), quality locked
  at 80% (`FREE_QUALITY`). Adding a 6th image opens an upgrade modal.
- **Pro plan**: unlocked by either
  1. Returning from the Stripe Payment Link with `?success=true` or
     `?license_key=...` in the URL — the app stores `is_pro_user: true` in
     `localStorage` and strips those params from the URL, or
  2. Entering a valid code in the modal's hidden "Already purchased?" field
     (see `VALID_PROMO_CODES` in [`src/config.js`](src/config.js)).

Activation persists per-browser via `localStorage` (key: `is_pro_user`) — no
backend involved.

## Before shipping

1. Set `STRIPE_PAYMENT_LINK` in [`src/config.js`](src/config.js) to your real
   Stripe Payment Link, and configure its confirmation page to redirect back
   to this app with `?success=true` (Stripe Payment Links support a
   post-payment redirect URL in their dashboard settings).
2. Replace/extend `VALID_PROMO_CODES` in the same file, or swap it for a real
   license-validation call if you need server-side checks.
3. Adjust `FREE_MAX_FILES` / `FREE_QUALITY` if your pricing changes.

## Adding a language

Add a top-level key to `dictionary` in
[`src/i18n/dictionary.js`](src/i18n/dictionary.js) mirroring the `en`/`ja`
shape, then add it to the exported `LANGUAGES` list. Every string in the app
is read through `t('some.key')` from `I18nContext`, so no component changes
are needed.
