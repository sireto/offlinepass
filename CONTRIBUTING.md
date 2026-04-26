# Contributing to OfflinePass

Thanks for your interest in contributing. This repository contains three implementations of the same deterministic password manager:

- `web/` — Next.js web app (deployed to GitHub Pages)
- `chrome_extension/` — Chrome MV3 extension built with Next.js
- `app/` — Flutter mobile/desktop app

All three implementations **must produce identical passwords** for the same MSK, host, identity, date, and retry count. The chrome extension is the canonical reference; web and Flutter are aligned to it.

## Reporting Issues

- **Security issues:** see [SECURITY.md](./SECURITY.md). Do not open public issues for vulnerabilities.
- **Bugs:** include the platform (web/extension/app), version, and reproduction steps. If passwords differ across platforms for the same inputs, that is a high-priority bug.
- **Feature requests:** describe the use case before the implementation.

## Development

### Web

```
cd web
yarn install
yarn dev      # http://localhost:3000
yarn test     # one-shot
yarn lint
yarn build
```

### Chrome extension

```
cd chrome_extension
yarn install
yarn build
# Load chrome_extension/out as an unpacked extension in chrome://extensions
```

### Flutter app

```
cd app
flutter pub get
flutter run
```

## Pull Requests

- Branch from `main` and keep PRs focused.
- For changes to password generation, include or update tests that pin the output for known inputs in **every** platform you touch. Cross-platform parity is non-negotiable.
- Run `yarn lint` and `yarn test` (web/extension) or `flutter analyze` (app) before submitting.
- Do not introduce network calls, telemetry, analytics, or third-party scripts in any platform without explicit discussion. The "no server, fully offline" property is the project's core promise.
- Do not log MSKs, generated passwords, or any other secret material — not via `console.log`, not via `print()`, not in error messages.

## Code Style

- TypeScript: follow the existing ESLint/Prettier setup.
- Dart: follow `flutter_lints` (configured in `app/analysis_options.yaml`).

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License (see [LICENSE](./LICENSE)).
