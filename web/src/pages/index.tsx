import React from "react";
import GeneratePasswordView from "@app/components/form-views/generate-password-view";
import AnchorLink from "@app/components/ui/links/anchor-link";
import { Lock } from "@app/components/icons/lock";
import { Github } from "@app/components/icons/github";
import { CheckCircle } from "@app/components/icons/checkcircle";

const PILLARS = [
  {
    title: "No server, ever",
    body: "Every password is computed in your browser. Nothing is sent over the network — load the page once and you can disconnect.",
  },
  {
    title: "Nothing to back up",
    body: "There is no vault, no sync, no database. The only secret is your Master Key, and only you remember it.",
  },
  {
    title: "Deterministic by design",
    body: "Same Master Key + same site + same identity always produces the same password. Lose your device, recover instantly.",
  },
  {
    title: "Audit the math, not us",
    body: "HMAC-SHA256, Base58, ~94 bits of entropy. The algorithm is a few lines of code — readable in one sitting.",
  },
  {
    title: "Zero tracking",
    body: "No analytics, no fingerprinting, no telemetry, no cookies you didn't ask for. Open the network tab and check.",
  },
  {
    title: "Apache 2.0",
    body: "Free for any use. Fork it, ship it, embed it. Verified releases live on GitHub and the Chrome Web Store.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pick a Master Key",
    body: "One strong, memorable phrase. This is the only thing you ever need to remember.",
  },
  {
    n: "02",
    title: "Identify the account",
    body: "Type the site (e.g. github.com), the username or email, and the year — the inputs that make each password unique.",
  },
  {
    n: "03",
    title: "Get a deterministic password",
    body: "OfflinePass returns HMAC-SHA256(MasterKey, host|identity|year|n), Base58-encoded. Same inputs, same output, every time.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-buttonColor">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base lg:text-lg text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(92,117,246,0.15),_transparent_60%)]"
      />
      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col">
          <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full border border-textfield_stroke bg-white/70 backdrop-blur text-xs font-medium text-brand">
            <span className="h-2 w-2 rounded-full bg-success" />
            100% client-side · open source · Apache 2.0
          </div>
          <h1 className="mt-6 text-[2rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-brand leading-[1.1]">
            One Master Key.{" "}
            <span className="bg-gradient-to-r from-brand to-buttonColor bg-clip-text text-transparent">
              Every password, derived.
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            OfflinePass is a deterministic password manager with no server, no
            vault, and no sync. Your Master Key plus the site you&apos;re
            visiting deterministically produce the password — every time, on
            every device.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#generator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-medium hover:bg-buttonColor transition-colors shadow-sm"
            >
              <Lock className="h-5 w-5" />
              Generate a password
            </a>
            <AnchorLink
              target="_blank"
              href="https://github.com/sireto/offlinepass"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-textfield_stroke bg-white text-brand font-medium hover:bg-lightBackground transition-colors"
            >
              <Github className="h-5 w-5 fill-current" />
              View source
            </AnchorLink>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-700 max-w-md">
            {[
              "No accounts, no email",
              "No tracking, no analytics",
              "Works fully offline",
              "Reproducible across devices",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-buttonColor/30 via-blueGray/10 to-transparent blur-2xl"
          />
          <div className="relative rounded-3xl bg-white/80 backdrop-blur shadow-xl border border-textfield_stroke p-2">
            <div className="rounded-2xl bg-lightBackground p-4 font-mono text-xs lg:text-sm text-brand overflow-x-auto">
              <div className="flex items-center gap-1.5 pb-3 border-b border-textfield_stroke mb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                <span className="ml-3 text-slate-500 text-xs">
                  the entire algorithm
                </span>
              </div>
              <pre className="leading-relaxed whitespace-pre">
                <span className="text-buttonColor">msg</span>      ={" "}
                <span className="text-success">&quot;github.com|you@x.com|2026|0&quot;</span>
                {"\n"}
                <span className="text-buttonColor">mac</span>      ={" "}
                <span className="text-brand font-semibold">hmac-sha256</span>
                (masterKey, msg){"\n"}
                <span className="text-buttonColor">password</span> ={" "}
                <span className="text-brand font-semibold">base58</span>(mac).
                <span className="text-brand font-semibold">slice</span>(0, 16)
                {"\n"}
                <span className="text-slate-500">// → 0$87booSaeaKYnhgEq</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Generator() {
  return (
    <section
      id="generator"
      className="scroll-mt-24 max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-20"
    >
      <SectionHeading
        eyebrow="Try it now"
        title="Generate a password"
        description="Your Master Key never leaves the browser. Open the network tab — there are no requests to make."
      />
      <div className="mt-10 flex justify-center">
        <GeneratePasswordView />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-lightBackground border-y border-textfield_stroke">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Three inputs, one deterministic output"
          description="No magic, no marketing. Here is the entire system."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl bg-white border border-textfield_stroke p-6 hover:border-buttonColor/50 transition-colors"
            >
              <div className="text-sm font-mono text-buttonColor">
                {step.n}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-brand">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
      <SectionHeading
        eyebrow="Why OfflinePass"
        title="The promises we can actually keep"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-textfield_stroke p-6 bg-white hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="h-10 w-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-brand">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="px-4 lg:px-8 pb-20">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-brand to-buttonColor p-10 lg:p-14 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold">
              Built in the open. Verified by you.
            </h2>
            <p className="mt-3 text-white/80 max-w-xl">
              Read the algorithm, run the build, audit the dependencies. If
              something looks off, file an issue — or send a pull request.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <AnchorLink
              target="_blank"
              href="https://github.com/sireto/offlinepass"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-brand font-medium hover:bg-lightBackground transition-colors"
            >
              <Github className="h-5 w-5 fill-current" />
              GitHub
            </AnchorLink>
            <AnchorLink
              target="_blank"
              href="https://chrome.google.com/webstore/detail/offline-pass/dohnghdcmkckopegdlbjagkpdcadapmd"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 font-medium transition-colors"
            >
              Chrome Extension
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-textfield_stroke">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-brand" />
          <span className="font-medium text-brand">OfflinePass</span>
          <span className="text-slate-400">· Apache 2.0</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <AnchorLink
            target="_blank"
            href="https://github.com/sireto/offlinepass"
            className="hover:text-brand"
          >
            GitHub
          </AnchorLink>
          <AnchorLink
            target="_blank"
            href="https://github.com/sireto/offlinepass/blob/main/SECURITY.md"
            className="hover:text-brand"
          >
            Security
          </AnchorLink>
          <AnchorLink
            target="_blank"
            href="https://github.com/sireto/offlinepass/blob/main/CONTRIBUTING.md"
            className="hover:text-brand"
          >
            Contributing
          </AnchorLink>
          <AnchorLink
            target="_blank"
            href="https://github.com/sireto/offlinepass/blob/main/LICENSE"
            className="hover:text-brand"
          >
            License
          </AnchorLink>
          <AnchorLink
            target="_blank"
            href="https://chrome.google.com/webstore/detail/offline-pass/dohnghdcmkckopegdlbjagkpdcadapmd"
            className="hover:text-brand"
          >
            Chrome Extension
          </AnchorLink>
        </nav>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Generator />
      <HowItWorks />
      <Pillars />
      <CallToAction />
      <Footer />
    </>
  );
}
