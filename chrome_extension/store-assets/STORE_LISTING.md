# Chrome Web Store listing copy

Copy/paste targets, ordered by the field name in the Chrome Web Store
publisher dashboard.

---

## Item name (max 45 chars)

```
OfflinePass — Deterministic Password Manager
```
*(43 chars)*

## Short description (max 132 chars)

```
One Master Key. Every password, derived. 100% client-side, open source — no server, no vault, no sync. Audit the math yourself.
```
*(127 chars)*

## Category

`Productivity`

## Language

`English (United States)`

---

## Detailed description (max 16,000 chars)

```
OfflinePass is a deterministic password manager that turns one Master Key
into a unique, secure password for every site — entirely in your browser.
No server. No vault. No sync. Lose your device and you can recover every
password on a fresh install just by remembering one phrase.

──────────────────────────────────────────
THE WHOLE ALGORITHM, ON ONE SCREEN
──────────────────────────────────────────

  msg      = "github.com" + "|" + "you@example.com" + "|2026|0"
  mac      = hmac-sha256(masterKey, msg)
  password = base58(mac).slice(0, 16)
  // → 0$87booSaeaKYnhgEq

That's it. Three inputs (host, identity, year), one HMAC-SHA256, base58
encoded and truncated to 16 characters. Same Master Key + same site +
same identity always produces the same password — on any device, on
any version, forever.

──────────────────────────────────────────
WHY OFFLINEPASS
──────────────────────────────────────────

• No server, ever
  Every password is computed locally. Open the network tab and watch —
  there are zero requests after the popup loads.

• Nothing to back up
  No vault, no sync, no database. The only secret is your Master Key,
  and only you remember it.

• Deterministic
  Forget syncing across devices. Type the same Master Key on a fresh
  install and you instantly recover every password.

• Audit the math, not us
  HMAC-SHA256 + Base58. ~94 bits of entropy in the truncated output.
  The whole thing is a few lines of TypeScript you can read in one
  sitting. Source on GitHub: github.com/sireto/offlinepass

• Zero tracking
  No analytics, no fingerprinting, no telemetry, no cookies you didn't
  ask for. Apache 2.0 license, free for any use.

──────────────────────────────────────────
HOW TO USE IT
──────────────────────────────────────────

1. Click the OfflinePass icon (or press Ctrl/Cmd+Shift+F).
2. Type your Master Key.
3. The current site is filled in automatically; type your username.
4. The 16-character password appears in the result card. Click copy.

That's the whole flow. Same site, same identity, same Master Key →
the same password every time.

──────────────────────────────────────────
OPTIONAL: SAVE YOUR MASTER KEY WITH A PIN
──────────────────────────────────────────

If you don't want to retype your Master Key on every visit, you can
encrypt it locally with a PIN:

• Key derivation: PBKDF2-HMAC-SHA256, 250,000 iterations, 16-byte
  random per-MSK salt.
• Cipher: AES-GCM with a 12-byte random IV. The auth tag is what tells
  us a wrong PIN was entered — there is no separate hash to crib
  against.
• Storage: localStorage on this device only. Nothing is synced or sent
  over the network.

Enter the wrong PIN and the GCM auth tag fails — the ciphertext is
useless without it. PINs are short, so a long PIN (or no PIN at all)
is stronger; we explain the trade-off in SECURITY.md.

──────────────────────────────────────────
PERMISSIONS
──────────────────────────────────────────

This extension requests one permission:

• activeTab — used only to read the URL of the tab where you opened
  the popup, so OfflinePass can pre-fill the host field. The URL never
  leaves your browser.

──────────────────────────────────────────
PRIVACY
──────────────────────────────────────────

OfflinePass collects nothing. There is no analytics endpoint, no
fingerprinting, and no remote configuration. The extension makes zero
network requests after install. The full source is published under
Apache 2.0 — verify it yourself.

──────────────────────────────────────────
LINKS
──────────────────────────────────────────

• Source code:    https://github.com/sireto/offlinepass
• Web app:        https://offlinepass.com
• Security policy: https://github.com/sireto/offlinepass/blob/main/SECURITY.md
• License:        Apache 2.0
```

---

## Single-purpose statement (Chrome Web Store policy)

```
OfflinePass derives website passwords from a single user-supplied
Master Key using HMAC-SHA256, entirely in the user's browser. The
extension's only purpose is to generate and reveal those derived
passwords. No accounts, no syncing, no remote storage, no analytics.
```

## Permission justifications

**activeTab**

```
The popup pre-fills the "Host" field with the hostname of the active
tab so the user does not have to retype the site they are signing in
to. The URL is read once when the popup opens (chrome.tabs.query with
{active:true, lastFocusedWindow:true}), parsed locally with new URL(),
and never leaves the user's browser. No remote host or third-party
script ever sees it.
```

## Distribution

`Public` (or Unlisted if testing).
Region: `All regions`.
Pricing: `Free`.

---

## Asset checklist (in this folder)

| File | Purpose | Spec | Status |
|---|---|---|---|
| `icon-128.png` | Store icon | 128×128 PNG (24-bit, no alpha) | ✓ |
| `icon-128.jpg` | Backup of icon as JPEG (no alpha) | 128×128 | ✓ |
| `screenshot-1-hero.jpg` | Screenshot 1 — Hero / popup empty state | 1280×800 JPEG (no alpha) | ✓ |
| `screenshot-2-generated.jpg` | Screenshot 2 — Result card with generated password | 1280×800 JPEG (no alpha) | ✓ |
| `screenshot-3-algorithm.jpg` | Screenshot 3 — How it works (algorithm) | 1280×800 JPEG (no alpha) | ✓ |
| `screenshot-4-pin.jpg` | Screenshot 4 — PIN-encrypted Master Key | 1280×800 JPEG (no alpha) | ✓ |
| `screenshot-5-pillars.jpg` | Screenshot 5 — Why OfflinePass (trust pillars) | 1280×800 JPEG (no alpha) | ✓ |
| `promo-small-440x280.png` | Small promo tile | 440×280 PNG (24-bit, no alpha) | ✓ |
| `promo-marquee-1400x560.png` | Marquee promo tile | 1400×560 PNG (24-bit, no alpha) | ✓ |
