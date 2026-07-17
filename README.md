# Móni & Misi — esküvői oldal

React + TypeScript (Vite) esküvői weboldal a [Nara sablon](https://weddingproject.hu/sablonok/nara/) alapján.

## Indítás

```bash
npm install
npm run dev
```

## GitHub Pages

A `main` branchre push után a GitHub Actions workflow automatikusan deployol.

1. Repo → **Settings → Pages** → Source: **GitHub Actions**
2. **Settings → Secrets and variables → Actions** → secret: `VITE_GOOGLE_SCRIPT_URL` (ugyanaz, mint a `.env`-ben)
3. Élő oldal: https://blackwolf222.github.io/wedding-project/

## Google Drive feltöltés

A „Legfontosabb tudnivalók” szekcióban a vendégek képeket tölthetnek fel egy közös Drive mappába.

1. Hozz létre egy Drive mappát, másold ki az ID-t az URL-ből.
2. Nyisd meg a `google-apps-script/Code.gs` fájlt, illeszd be a [Google Apps Script](https://script.google.com) szerkesztőbe.
3. Állítsd be a `FOLDER_ID` értéket.
4. Telepítsd webalkalmazásként (hozzáférés: Bárki).
5. Másold a URL-t a `.env` fájlba:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

6. Indítsd újra a `npm run dev` parancsot.

## Képek optimalizálása

```bash
# Eredeti JPG-eket tedd a public/images mappába, majd:
node scripts/optimize-images.mjs
```

A script WebP-re konvertál és átméretez (hero ~1920px, galéria ~1000px).
