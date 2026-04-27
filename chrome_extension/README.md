# OfflinePass — Chrome Extension

Deterministic, client-side password manager. One Master Key — every password derived.

## Develop locally

```bash
yarn install
yarn dev
```

The popup is rendered as a regular Next.js page; you can iterate at <http://localhost:3000>. Real Chrome APIs (`chrome.tabs.query`) are only available when the build is loaded as an unpacked extension (see below).

## Load the unpacked extension

1. `yarn export` — produces a static build in `out/` with `_next` renamed to `next` and all references rewritten (Chrome rejects top-level paths starting with `_`).
2. Open `chrome://extensions`, toggle **Developer mode**.
3. Click **Load unpacked** and pick the `out/` directory.
4. Open the popup with `Ctrl+Shift+F` (`MacCtrl+Shift+F` on macOS) or via the toolbar icon.

## Package for the Chrome Web Store

A single command:

```bash
yarn package
```

This:

1. Cleans `out/` and any previous `offlinepass-extension.zip`.
2. Runs `yarn export` (build + static export + `_next` → `next` rename).
3. Strips the bundled Next.js demo SVGs (`next.svg`, `vercel.svg`, `thirteen.svg`) so they don't ship with the extension.
4. Zips the contents of `out/` (with `manifest.json` at the archive root, as Chrome expects) into `offlinepass-extension.zip`.

The resulting `offlinepass-extension.zip` is the file you upload to the Chrome Web Store **Item → Package** field. Check it locally before uploading:

```bash
unzip -l offlinepass-extension.zip | head
# the first listing should be index.html and manifest.json
```

You can also load the unzipped contents as an unpacked extension to smoke-test before uploading — same `Load unpacked` flow as above, just point at `out/`.

## Store assets

Marketing assets and the listing copy live in [`store-assets/`](./store-assets/). Files map to Chrome Web Store dashboard fields as documented in [`store-assets/STORE_LISTING.md`](./store-assets/STORE_LISTING.md):

- `icon-128.png` — 128×128 store icon (24-bit RGB, no alpha)
- `screenshot-1-hero.jpg` … `screenshot-5-pillars.jpg` — five 1280×800 JPEGs
- `promo-small-440x280.png` — small promo tile
- `promo-marquee-1400x560.png` — marquee promo tile
- `STORE_LISTING.md` — copy/paste targets for the dashboard

## Permissions

The extension requests one permission:

- **`activeTab`** — used only to read the URL of the tab where the popup is opened, so the host field can be pre-filled. The URL never leaves your browser.

## Security model

See [`SECURITY.md`](../SECURITY.md) at the repo root.
