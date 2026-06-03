import Link from "next/link";

const FEATURES = [
  { t: "Auth, done", d: "Email + password sign-up, login, sessions and protected routes — wired and working out of the box." },
  { t: "Stripe-ready billing", d: "Checkout + pricing page pre-built. Drop in your keys and you're charging customers." },
  { t: "Dashboard", d: "A protected app area with a clean layout you can build your product inside." },
  { t: "Runs instantly", d: "No external services to configure to start. Install, run dev, and it's live." },
  { t: "Typed & modern", d: "Next.js (App Router) + TypeScript + Tailwind. Clean, documented, easy to extend." },
  { t: "Deploy anywhere", d: "Ship to Vercel, Cloudflare, or your own box. Deploy guide included." },
];

const TIERS = [
  { name: "Starter", price: "$0", note: "The free lite version", points: ["Landing page", "Auth UI", "Dashboard shell"], cta: "View on GitHub", href: "https://github.com/devloadout", highlight: false },
  { name: "Pro Kit", price: "$49", note: "The full source kit", points: ["Everything in Starter", "Working auth + sessions", "Stripe billing wired", "Deploy guide + commercial license", "Free lifetime updates"], cta: "Get the Pro Kit", href: "https://alphaletgo.gumroad.com/l/niqbam", highlight: true },
];

const FAQ = [
  { q: "Do I need a database or accounts to run it?", a: "No. It runs instantly with a local store so you can see everything working. The guide shows how to swap in Postgres/Supabase for production." },
  { q: "Is Stripe required?", a: "Only when you want to charge. The billing flow is pre-wired — add your Stripe keys and it works." },
  { q: "Can I use it for client work?", a: "Yes. The Pro Kit includes a commercial license — use it in unlimited personal and client projects." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 font-bold">
          <span className="rounded-md bg-blue-600 px-2 py-1 font-mono text-sm">{"</>"}</span>
          SaaS Starter Kit
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/login" className="text-neutral-300 hover:text-white">Log in</Link>
          <Link href="/signup" className="rounded-lg bg-white px-4 py-2 font-medium text-neutral-900 hover:bg-neutral-200">Get started</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-20 text-center">
        <div className="mb-4 inline-block rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-400">Next.js + TypeScript + Tailwind</div>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">Ship your SaaS in days, not weeks.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
          A clean starter kit with auth, billing, and a dashboard already wired up. Stop rebuilding the boring 80% and start on your actual product.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/signup" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">Try the demo →</Link>
          <a href="https://alphaletgo.gumroad.com/l/niqbam" className="rounded-lg border border-neutral-700 px-6 py-3 font-semibold hover:border-neutral-500">Get the Pro Kit</a>
        </div>
        <p className="mt-4 text-sm text-neutral-500">Runs instantly — no signup, no config to try it.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">Everything a SaaS needs, already built</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <h3 className="mb-2 font-semibold text-blue-400">{f.t}</h3>
              <p className="text-sm text-neutral-400">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">Simple pricing</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {TIERS.map((t) => (
            <div key={t.name} className={"rounded-2xl border p-8 " + (t.highlight ? "border-blue-500 bg-blue-950/20" : "border-neutral-800 bg-neutral-900/50")}>
              <div className="text-sm text-neutral-400">{t.name}</div>
              <div className="my-2 text-4xl font-extrabold">{t.price}</div>
              <div className="mb-6 text-sm text-neutral-500">{t.note}</div>
              <ul className="mb-8 space-y-2 text-sm text-neutral-300">
                {t.points.map((p) => <li key={p}>✓ {p}</li>)}
              </ul>
              <a href={t.href} className={"block rounded-lg px-4 py-3 text-center font-semibold " + (t.highlight ? "bg-blue-600 hover:bg-blue-500" : "border border-neutral-700 hover:border-neutral-500")}>{t.cta}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">FAQ</h2>
        <div className="space-y-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 text-sm text-neutral-400">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-900 py-10 text-center text-sm text-neutral-500">
        Built by <a className="underline hover:text-neutral-300" href="https://github.com/devloadout">DevLoadout</a> · SaaS Starter Kit
      </footer>
    </div>
  );
}
