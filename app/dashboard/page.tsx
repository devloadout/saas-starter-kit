import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import UpgradeButton from "@/components/UpgradeButton";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center gap-2 font-bold">
          <span className="rounded-md bg-blue-600 px-2 py-1 font-mono text-sm">{"</>"}</span> Dashboard
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-neutral-400">{session.email}</span>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="mt-2 text-neutral-400">You&apos;re signed in as <span className="text-neutral-200">{session.email}</span>. This is your protected app area — build your product here.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {["Projects", "Usage", "Team"].map((c) => (
            <div key={c} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <div className="text-sm text-neutral-400">{c}</div>
              <div className="mt-2 text-3xl font-bold">0</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-900 bg-blue-950/20 p-6">
          <h2 className="text-lg font-semibold">Upgrade to Pro</h2>
          <p className="mt-1 text-sm text-neutral-400">Billing is pre-wired with Stripe. Add your Stripe keys (see README) and this button starts a real checkout.</p>
          <div className="mt-4"><UpgradeButton /></div>
        </div>
      </main>
    </div>
  );
}
