# Security Policy

## Reporting a Vulnerability

If you believe you have found a security issue in OfflinePass, please **do not** open a public GitHub issue. Instead, email the maintainers privately with:

- A description of the issue and its impact
- Steps to reproduce
- Affected component (web, chrome_extension, or app)
- Any suggested mitigation

We will acknowledge receipt within 5 business days and aim to provide an initial assessment within 14 days.

## Threat Model & Known Limitations

OfflinePass derives every password from a Master Security Key (MSK) using `HMAC-SHA256(MSK, "host|identity|date|retries")`, base58-encoded and truncated to 16 characters. The security of every generated password depends entirely on the secrecy and strength of the MSK.

Users and reviewers should be aware of the following:

### MSK persistence (web & extension)

The web and chrome_extension implementations persist the MSK in the browser's `localStorage` via `redux-persist`. Before storage it is encrypted with AES using a device fingerprint (via `@fingerprintjs/fingerprintjs`) as the key.

**This is a convenience feature, not a strong defense.** A device fingerprint is low-entropy and can be re-derived by any code running in the same browser/OS. An attacker with access to the localStorage contents and the ability to run scripts on a sufficiently similar environment may be able to recover the MSK. We are tracking removal of this persistence (or replacement with a user-supplied PIN-derived key) as an open issue.

If your threat model includes adversaries with access to your browser storage, prefer the Flutter app (which uses OS-level encrypted storage) and clear the MSK after each session on the web/extension.

### What we do *not* protect against

- Malware or browser extensions running in your session
- Physical access to an unlocked device
- Weak Master Security Keys (the algorithm cannot make a weak key strong)
- Phishing of the MSK itself

### Cryptographic primitives

- HMAC-SHA256 (`js-crypto-hmac` on web/extension; `package:crypto` on Flutter)
- Base58 encoding (`bs58` on web/extension; `fast_base58` on Flutter)
- Output truncated to the first 16 base58 characters (~94 bits)

The output truncation is a deliberate UX choice. If you require longer passwords, raise an issue — we can expose the truncation length as a configurable parameter.

## Cross-Platform Compatibility

The chrome extension's algorithm is the canonical reference. The web app and the Flutter app have been aligned to produce the same output for the same inputs. If you find a divergence, please report it as a security bug — cross-platform recovery is a load-bearing property of this project.
